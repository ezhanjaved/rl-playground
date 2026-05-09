import json
import os
import traceback
from typing import AsyncIterator, List, Optional

import httpx
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from server.database.select import fetchModels
from server.path_config import DATA_DIR
from server.storage.downloadModel import download_from_s3
from server.utilities.loader import json_loader

analysis = APIRouter()

CHUTES_API_URL = "https://llm.chutes.ai/v1/chat/completions"
DEEPSEEK_MODEL = "deepseek-ai/DeepSeek-V3.1-TEE"
# deepseek-ai/DeepSeek-V3-0324-TEE
ANALYSIS_SYSTEM_PROMPT = """You are an expert reinforcement learning engineer analyzing a trained RL model.
You have deep knowledge of PPO (Proximal Policy Optimization) and reward shaping.

You will be given:
- Training statistics (average reward, episode length, timesteps, entropy)
- The reward graph / function definition (conditions, rewards, terminal states)
- The agent configuration (entities, observations, actions, capabilities)
- PPO hyperparameters

Your job is to:
1. Diagnose training health based on the stats
2. Identify potential issues in the reward graph (local optima, reward hacking, sparse rewards)
3. Suggest concrete improvements grounded in RL theory
4. Answer follow-up questions with precision

Be concise, technical, and actionable. Avoid generic advice."""

INSIGHTS_SYSTEM_PROMPT = """You are an expert reinforcement learning engineer.
Analyze the provided training data and return a JSON object with this exact structure:

{
  "insights": [
    { "type": "good" | "warn" | "bad", "text": "..." },
    ...
  ],
  "graphSummary": "One paragraph summary of the reward function and its implications."
}

Return ONLY valid JSON, no markdown, no preamble. Provide 3-5 insights."""


def _get_api_key() -> str:
    api_key = os.environ.get("CHUTES_API_KEY")
    if not api_key:
        raise ValueError("Missing CHUTES_API_KEY environment variable")
    return api_key


def _build_context(model_record: dict, graphs: dict, assignments: dict) -> str:
    stats = {
        "avg_reward": model_record.get("avg_reward"),
        "avg_ep_length": model_record.get("avg_ep_length"),
        "total_timesteps": model_record.get("total_timestep"),
        "entropy": model_record.get("entropy"),
        "algorithm": model_record.get("algorithm", "PPO"),
        "name": model_record.get("name"),
        "status": model_record.get("status"),
    }

    return f"""=== MODEL: {stats["name"]} | ALGORITHM: {stats["algorithm"]} | STATUS: {stats["status"]} ===

TRAINING STATISTICS:
- Avg Episode Reward: {stats["avg_reward"]}
- Avg Episode Length: {stats["avg_ep_length"]}
- Total Timesteps: {stats["total_timesteps"]}
- Policy Entropy: {stats["entropy"]}

REWARD GRAPH (JSON):
{graphs}

AGENT CONFIGURATION / ASSIGNMENTS (JSON):
{assignments}
"""


def _load_training_files(training_id: str) -> tuple[dict, dict]:
    download_from_s3(training_id)
    folder = DATA_DIR / f"model_training_{training_id}"
    graphs = json_loader(folder / "graphs.json")
    assignments = json_loader(folder / "assignments.json")
    return graphs, assignments


async def _call_deepseek(
    system: str, user: str, stream: bool = False
) -> str | httpx.Response:
    api_key = _get_api_key()
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Accept": "text/event-stream" if stream else "application/json",
    }
    payload = {
        "model": DEEPSEEK_MODEL,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "stream": stream,
        "max_tokens": 1000,
        "temperature": 0.2,
    }

    if not stream:
        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(CHUTES_API_URL, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]

    client = httpx.AsyncClient(timeout=120)
    response = await client.send(
        client.build_request("POST", CHUTES_API_URL, headers=headers, json=payload),
        stream=True,
    )
    response.raise_for_status()
    return response, client


async def _stream_deepseek_chat(system: str, messages: list) -> AsyncIterator[str]:
    api_key = _get_api_key()
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
    }
    payload = {
        "model": DEEPSEEK_MODEL,
        "messages": [{"role": "system", "content": system}] + messages,
        "stream": True,
        "max_tokens": 1000,
        "temperature": 0.2,
    }

    async with httpx.AsyncClient(timeout=120) as client:
        async with client.stream(
            "POST", CHUTES_API_URL, headers=headers, json=payload
        ) as response:
            response.raise_for_status()
            buffer = ""
            async for chunk in response.aiter_text():
                buffer += chunk

                while "\n\n" in buffer:
                    event, buffer = buffer.split("\n\n", 1)

                    data_line = next(
                        (
                            line
                            for line in event.splitlines()
                            if line.startswith("data:")
                        ),
                        None,
                    )
                    if not data_line:
                        continue
                    data = data_line[len("data:") :].strip()
                    if data == "[DONE]":
                        return
                    try:
                        parsed = json.loads(data)
                        delta = parsed["choices"][0]["delta"].get("content", "")
                        if delta:
                            yield delta
                        if parsed["choices"][0].get("finish_reason"):
                            return
                    except (json.JSONDecodeError, KeyError):
                        continue


@analysis.get("/{training_id}")
async def get_analysis(training_id: str):
    try:
        records = fetchModels(training_id, "models", "training_id")
        if not records:
            return {"message": "Model not found", "status": 0}
        model_record = records[0]

        graphs, assignments = _load_training_files(training_id)

        context = _build_context(model_record, graphs, assignments)

        raw = await _call_deepseek(
            system=INSIGHTS_SYSTEM_PROMPT,
            user=f"Analyze this RL training run:\n\n{context}",
        )

        start = raw.find("{")
        end = raw.rfind("}")
        if start == -1 or end == -1 or end <= start:
            raise ValueError("LLM did not return valid JSON")
        llm_data = json.loads(raw[start : end + 1])

        entities = assignments.get("entities", {})
        agent_keys = list(entities.keys()) if isinstance(entities, dict) else []

        first_agent = entities.get(agent_keys[0], {}) if agent_keys else {}
        capabilities = first_agent.get("capabilities", [])
        observations = first_agent.get("observations", [])
        actions = first_agent.get("actions", [])

        return {
            "status": 1,
            "stats": {
                "avgReward": model_record.get("avg_reward"),
                "avgEpLength": model_record.get("avg_ep_length"),
                "totalTimesteps": model_record.get("total_timestep"),
                "entropy": model_record.get("entropy"),
            },
            "modelMeta": {
                "name": model_record.get("name"),
                "algorithm": model_record.get("algorithm", "PPO"),
                "status": model_record.get("status"),
            },
            "graphSummary": llm_data.get("graphSummary", ""),
            "insights": llm_data.get("insights", []),
            "config": {
                "capabilities": capabilities,
                "observations": observations,
                "actions": actions,
                "hyperparams": "γ=0.99 · λ=0.95 · lr=3e-4",
            },
            "rewardGraph": graphs,
            "context": context,
        }

    except Exception as e:
        traceback.print_exc()
        return {"message": str(e), "status": 0}


class ChatMessage(BaseModel):
    role: str  # "user" | "assistant"
    text: str


class ChatRequest(BaseModel):
    message: str
    conversationHistory: Optional[List[ChatMessage]] = []
    context: Optional[str] = ""


@analysis.post("/{training_id}/chat")
async def chat_with_analysis(training_id: str, data: ChatRequest):
    try:
        context = data.context

        if not context:
            records = fetchModels(training_id, "models", "training_id")
            if not records:
                return {"message": "Model not found", "status": 0}
            model_record = records[0]
            graphs, assignments = _load_training_files(training_id)
            context = _build_context(model_record, graphs, assignments)

        history = [
            {
                "role": msg.role if msg.role == "user" else "assistant",
                "content": msg.text,
            }
            for msg in data.conversationHistory
        ]
        history.append({"role": "user", "content": data.message})

        system_with_context = f"{ANALYSIS_SYSTEM_PROMPT}\n\n{context}"

        async def event_stream():
            async for text in _stream_deepseek_chat(system_with_context, history):
                yield text

        return StreamingResponse(event_stream(), media_type="text/plain")

    except Exception as e:
        traceback.print_exc()
        return {"message": str(e), "status": 0}
