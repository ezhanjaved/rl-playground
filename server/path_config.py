from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent  # this resolves to /server
DATA_DIR = BASE_DIR / "data"
MODEL_DIR = BASE_DIR / "training" / "trainer" / "models"
TEMPLATE_PATH = BASE_DIR / "templates"
