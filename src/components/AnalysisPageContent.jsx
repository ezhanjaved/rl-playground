import { useState, useRef, useEffect } from "react";
import "../styling/AnalysisPageContent.css";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/analysis`;

function InsightDot({ type }) {
  return (
    <span className={`analysis-insight-dot analysis-insight-dot--${type}`} />
  );
}

function StatCard({ label, value, delta, deltaType }) {
  return (
    <div className="analysis-stat-card">
      <div className="analysis-stat-label">{label}</div>
      <div className="analysis-stat-value">{value ?? "—"}</div>
      {delta && (
        <div
          className={`analysis-stat-delta analysis-stat-delta--${deltaType}`}
        >
          {delta}
        </div>
      )}
    </div>
  );
}

function GraphNode({ variant, children }) {
  return (
    <span className={`analysis-graph-node analysis-graph-node--${variant}`}>
      {children}
    </span>
  );
}

function TypingIndicator() {
  return (
    <div className="analysis-typing">
      <span className="analysis-typing-dot" />
      <span className="analysis-typing-dot" />
      <span className="analysis-typing-dot" />
    </div>
  );
}

function ErrorBanner({ message }) {
  return (
    <div className="analysis-error-banner">
      <span>⚠ {message}</span>
    </div>
  );
}

function nodeLabel(node) {
  const { label, entityOne, entityTwo, rewardValue } = node.data ?? {};
  if (rewardValue != null) return `${label} (${rewardValue})`;
  if (entityOne && entityTwo) return `${label}: ${entityOne} → ${entityTwo}`;
  return label ?? node.type ?? node.id;
}

function nodeVariant(type = "") {
  if (type.includes("OnEpisode") || type.includes("OnStep")) return "event";
  if (
    type.includes("Condition") ||
    type.includes("Distance") ||
    type.includes("Radius")
  )
    return "condition";
  if (type.includes("AddReward")) {
    return parseFloat(type) >= 0 ? "pos" : "neg";
  }
  if (type.includes("End")) return "terminal";
  return "condition";
}

function rewardVariant(node) {
  const v = parseFloat(node.data?.rewardValue ?? "0");
  return v >= 0 ? "pos" : "neg";
}

function getVariant(node) {
  if (node.type?.includes("AddReward")) return rewardVariant(node);
  return nodeVariant(node.type);
}

function GraphFlow({ nodes, edges }) {
  if (!nodes?.length)
    return <p className="analysis-config-value">Empty graph.</p>;

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // Build adjacency: sourceId → [{targetId, label}]
  const adj = {};
  for (const e of edges ?? []) {
    if (!adj[e.source]) adj[e.source] = [];
    adj[e.source].push({ target: e.target, handle: e.sourceHandle });
  }

  const targeted = new Set((edges ?? []).map((e) => e.target));
  const roots = nodes.filter((n) => !targeted.has(n.id));

  const rows = [];
  const visited = new Set();

  function walk(nodeId, depth = 0, prefix = "") {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    const node = nodeMap[nodeId];
    if (!node) return;

    rows.push({ node, depth, prefix });

    const children = adj[nodeId] ?? [];
    children.forEach((child, idx) => {
      const isLast = idx === children.length - 1;
      const branchLabel =
        child.handle === "true"
          ? "✓ true"
          : child.handle === "false"
            ? "✗ false"
            : null;
      walk(child.target, depth + 1, branchLabel);
    });
  }

  roots.forEach((r) => walk(r.id));
  nodes.forEach((n) => walk(n.id));

  return (
    <div className="analysis-reward-graph">
      {rows.map(({ node, depth, prefix }, i) => (
        <div
          key={i}
          className="analysis-graph-row"
          style={{ paddingLeft: depth * 16 }}
        >
          {depth > 0 && (
            <>
              <span className="analysis-graph-arrow analysis-graph-arrow--muted">
                {prefix ?? "→"}
              </span>
              <span className="analysis-graph-arrow">→</span>
            </>
          )}
          <GraphNode variant={getVariant(node)}>{nodeLabel(node)}</GraphNode>
        </div>
      ))}
    </div>
  );
}

function RewardGraph({ data }) {
  const validGraphs = Object.values(data ?? {}).filter(
    (g) => Array.isArray(g.nodes) && g.nodes.length > 0,
  );

  const [selectedId, setSelectedId] = useState(
    () => validGraphs[0]?.id ?? null,
  );

  if (!validGraphs.length) {
    return <p className="analysis-config-value">No reward graph data.</p>;
  }

  const selected =
    validGraphs.find((g) => g.id === selectedId) ?? validGraphs[0];

  return (
    <div>
      {validGraphs.length > 1 && (
        <div className="analysis-graph-tabs">
          {validGraphs.map((g) => (
            <button
              key={g.id}
              className={`analysis-graph-tab${selectedId === g.id ? " analysis-graph-tab--active" : ""}`}
              onClick={() => setSelectedId(g.id)}
            >
              {g.name ?? g.id.slice(0, 12) + "…"}
            </button>
          ))}
        </div>
      )}
      <GraphFlow nodes={selected.nodes} edges={selected.edges} />
    </div>
  );
}

function rewardDelta(v) {
  if (v == null) return { delta: null, deltaType: "neutral" };
  if (v > 0) return { delta: "↑ positive", deltaType: "good" };
  if (v > -50) return { delta: "↑ improving", deltaType: "warn" };
  return { delta: "↓ low", deltaType: "bad" };
}

function epLengthDelta(v, timesteps) {
  if (v == null) return { delta: null, deltaType: "neutral" };
  // heuristic: if ep length is > 80% of max (assume 1000), agent is timing out
  if (v > 800) return { delta: "↓ timing out", deltaType: "bad" };
  if (v > 400) return { delta: "~ moderate", deltaType: "warn" };
  return { delta: "↑ converging", deltaType: "good" };
}

export default function AnalysisPageContent({ trainingId }) {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!trainingId) {
      setError("No trainingId provided.");
      setLoading(false);
      return;
    }

    const fetchAnalysis = async () => {
      try {
        const res = await fetch(`${API_BASE}/${trainingId}`);
        const json = await res.json();
        if (json.status !== 1)
          throw new Error(json.message || "Failed to load analysis");
        setAnalysisData(json);
        setMessages([
          { role: "ai", text: json.graphSummary || "Analysis loaded." },
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [trainingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleSend = async (text) => {
    const msg = (text || input).trim();
    if (!msg || isStreaming) return;
    setInput("");

    const userMsg = { role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    const history = messages.map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      text: m.text,
    }));

    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${API_BASE}/${trainingId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          message: msg,
          conversationHistory: history,
          context: analysisData?.context ?? "",
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      setMessages((prev) => [...prev, { role: "ai", text: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        aiText += chunk;

        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "ai", text: aiText };
          return next;
        });
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: `Error: ${err.message}` },
        ]);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <div className="analysis-root analysis-loading">
        <div className="analysis-spinner" />
        <p>Loading analysis…</p>
      </div>
    );
  }

  if (error && !analysisData) {
    return (
      <div className="analysis-root analysis-loading">
        <ErrorBanner message={error} />
      </div>
    );
  }

  const d = analysisData;
  const { stats, modelMeta, insights, config, rewardGraph } = d;

  const rwDelta = rewardDelta(stats?.avgReward);
  const epDelta = epLengthDelta(stats?.avgEpLength);

  const suggestionChips = insights
    ?.filter((ins) => ins.type !== "good")
    .slice(0, 3)
    .map((ins) => ins.text.split(".")[0].slice(0, 48) + "…") ?? [
    "Why is reward negative?",
    "How to fix the spinning?",
    "Suggest graph changes",
  ];

  return (
    <div className="analysis-root">
      <div className="analysis-left">
        <div className="analysis-topbar">
          <div className="analysis-topbar-left">
            <span className="analysis-model-name">{modelMeta?.name}</span>
            <span className="analysis-badge analysis-badge--algo">
              {modelMeta?.algorithm}
            </span>
            <span className="analysis-badge analysis-badge--status">
              {modelMeta?.status}
            </span>
          </div>
          <div className="analysis-topbar-right">
            <button className="analysis-btn">View / Edit</button>
            <button className="analysis-btn">Export</button>
          </div>
        </div>

        <div className="analysis-scrollable">
          {/* Stats */}
          <section className="analysis-section">
            <div className="analysis-section-title">Training stats</div>
            <div className="analysis-stats-grid">
              <StatCard
                label="Avg episode reward"
                value={stats?.avgReward?.toFixed(2)}
                delta={rwDelta.delta}
                deltaType={rwDelta.deltaType}
              />
              <StatCard
                label="Avg episode length"
                value={stats?.avgEpLength}
                delta={epDelta.delta}
                deltaType={epDelta.deltaType}
              />
              <StatCard
                label="Total timesteps"
                value={stats?.totalTimesteps}
                delta="completed"
                deltaType="neutral"
              />
              <StatCard
                label="Policy entropy"
                value={stats?.entropy?.toFixed(2)}
                delta={stats?.entropy > 0.2 ? "↑ exploring" : "↓ collapsed"}
                deltaType={stats?.entropy > 0.2 ? "good" : "bad"}
              />
            </div>
          </section>

          {/* Reward function */}
          <section className="analysis-section">
            <div className="analysis-card">
              <div className="analysis-section-title">Reward function</div>
              <RewardGraph data={rewardGraph} />
            </div>
          </section>

          {/* AI insights */}
          <section className="analysis-section">
            <div className="analysis-card">
              <div className="analysis-section-title">AI analysis</div>
              <div className="analysis-insights">
                {insights?.length > 0 ? (
                  insights.map((ins, i) => (
                    <div key={i} className="analysis-insight-row">
                      <InsightDot type={ins.type} />
                      <p className="analysis-insight-text">{ins.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="analysis-config-value">
                    No insights generated.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Agent configuration */}
          <section className="analysis-section">
            <div className="analysis-card">
              <div className="analysis-section-title">Agent configuration</div>
              <div className="analysis-config-grid">
                {config?.capabilities?.length > 0 && (
                  <div>
                    <div className="analysis-config-label">Capabilities</div>
                    <div className="analysis-config-tags">
                      {config.capabilities.map((c) => (
                        <GraphNode key={c} variant="event">
                          {c}
                        </GraphNode>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <div className="analysis-config-label">Algorithm</div>
                  <div className="analysis-config-value">
                    {config?.hyperparams}
                  </div>
                </div>
                {config?.observations?.length > 0 && (
                  <div>
                    <div className="analysis-config-label">Observations</div>
                    <div className="analysis-config-value">
                      {config.observations.join(", ")}
                    </div>
                  </div>
                )}
                {config?.actions?.length > 0 && (
                  <div>
                    <div className="analysis-config-label">Actions</div>
                    <div className="analysis-config-value">
                      {config.actions.join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="analysis-chat">
        <div className="analysis-chat-header">
          <div className="analysis-chat-header-title">
            <span className="analysis-ai-dot" />
            Ask about this model
          </div>
          <div className="analysis-chat-header-sub">
            Analyzing {modelMeta?.name} · {modelMeta?.algorithm}
          </div>
        </div>

        <div className="analysis-chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className="analysis-msg">
              <div className="analysis-msg-role">
                {msg.role === "ai" ? "AI" : "You"}
              </div>
              <div
                className={`analysis-msg-bubble analysis-msg-bubble--${msg.role}`}
              >
                {msg.text.split("\n").map((line, j, arr) => (
                  <span key={j}>
                    {line}
                    {j < arr.length - 1 && <br />}
                  </span>
                ))}
                {/* Blinking cursor while this message is streaming */}
                {isStreaming &&
                  i === messages.length - 1 &&
                  msg.role === "ai" && (
                    <span className="analysis-stream-cursor" />
                  )}
              </div>
            </div>
          ))}
          {isStreaming && messages[messages.length - 1]?.role !== "ai" && (
            <div className="analysis-msg">
              <div className="analysis-msg-role">AI</div>
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="analysis-chat-footer">
          <div className="analysis-suggestions">
            {suggestionChips.map((s) => (
              <button
                key={s}
                className="analysis-suggestion-chip"
                onClick={() => handleSend(s)}
                disabled={isStreaming}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="analysis-input-row">
            <textarea
              ref={textareaRef}
              className="analysis-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Describe what you're seeing…"
              rows={1}
            />
            <button
              className="analysis-send-btn"
              onClick={() => handleSend()}
              disabled={isStreaming}
            >
              {isStreaming ? (
                <svg viewBox="0 0 14 14" width="14" height="14" fill="white">
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 14 14" width="14" height="14" fill="white">
                  <path d="M1 1l12 6L1 13V8.5l8-1.5-8-1.5z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
