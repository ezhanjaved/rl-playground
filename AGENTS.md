# AGENTS.md

## Project Overview

RL3 is a browser-based no-code 3D reinforcement learning playground. Two top-level packages:

- **`client/`** — React 19 + Vite 7 frontend (JSX, not TypeScript). 3D editor, reward graph editor, browser Q-learning, inference visualization.
- **`server/`** — Python FastAPI backend with Celery workers for PPO training (Stable-Baselines3 + PyBullet). Database is Supabase.

Live: https://rl-playground-beta.vercel.app/

## Client Commands

All run from `client/`:

```bash
npm run dev      # Vite dev server on http://localhost:5173
npm run build    # Production build
npm run lint     # ESLint (JSX only, no TypeScript)
npm run preview  # Preview production build
```

**No test suite exists for the client.** There is no test script, no test framework installed, and no test files.

## Server Commands

Setup (from `server/`):

```bash
python3 -m venv venv
source venv/bin/activate
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn server.api:app --reload --port 8000
```

The Celery worker tasks live in `server/celery_app/` (training, inference, resume, stop).

**No test suite exists for the server** (a `.pytest_cache` dir exists but no test files or pytest config).

## Architecture Notes

- **Client is pure JSX** — no `.ts`/`.tsx` files, no `tsconfig.json`. ESLint is configured for `*.js` and `*.jsx` only.
- **Client uses Zustand** for state (stores in `src/stores/`). Key stores: `useSceneStore`, `useGraphStore`, `useTrainingStore`, `useRunTimeStore`.
- **Server routing**: FastAPI routes in `server/routes/` — `trainer`, `analysis`, `graph_ai`, `template`, `model`. Mounted in `server/api.py`.
- **Server object model**: `server/objectClass/` defines data classes for scenes, entities, graphs, assignments.
- **Training pipeline**: Client sends environment → server recreates it in PyBullet (`server/training/bulletWorld.py`) → Gymnasium wrapper (`server/training/wrappers/gymWrapper.py`) → PPO via SB3 (`server/training/trainer/singleAgent.py`).
- **Reward graph evaluation**: `server/engine/behaviorBuilder.py` evaluates the visual reward graph during training.
- **Observation/action spaces** are auto-constructed from entity capabilities in `server/engine/observationBuilder.py`.
- **Database**: Supabase client in `server/database/supabaseClient.py`. CRUD in `insert.py`, `select.py`, `update.py`, `delete.py`.
- **WebSocket**: `server/websocket/broadcast.py` streams inference state to the client.
- **Auth**: Supabase Auth on the client (`useAuthStore.js`).

## Environment & Config

- `client/.env` — Supabase URL/key, API base URL, WebSocket URL, container mode. **Note: committed `.env` contains real Supabase credentials.**
- `server/api.py` — CORS origins hardcoded: `localhost:5173`, `127.0.0.1:5173`, ngrok URL, and Vercel production URL.
- `server/path_config.py` — Defines `DATA_DIR`, `MODEL_DIR`, `TEMPLATE_PATH` relative to `server/`.
- `client/vercel.json` — SPA rewrite rule for client-side routing.

## Conventions

- Client state lives in Zustand stores, not context.
- ESLint `no-unused-vars` ignores variables starting with uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
- Server Python files use snake_case; client JS files use camelCase.
- `twoSum.js` at the repo root is a scratch file, not part of the project.

## Gotchas

- **No shared types between client and server.** The environment/entity/graph JSON schema is implicit — check `server/objectClass/` for the server's data model.
- **Physics mismatch**: Browser uses Rapier, server uses PyBullet. Behavior may differ between training and inference.
- **No multi-agent training yet** — multi-agent inference works, but training is single-agent PPO only.
- **CORS ngrok URL is ephemeral** — will break if the ngrok tunnel changes. Check `server/api.py` CORS list when debugging connection issues.
- **`setup.sh` installs CPU-only PyTorch** — fine for development, production training needs GPU.
