export PIP_CACHE_DIR=/workspace/.pip-cache
export TMPDIR=/workspace/tmp
mkdir -p /workspace/tmp

python3 -m venv venv
source venv/bin/activate

pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install sb3_contrib stable-baselines3 gymnasium numpy pybullet fastapi requests supabase boto3 uvicorn python-jose python-dotenv python-multipart
