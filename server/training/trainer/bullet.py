import os
from pathlib import Path

current_path = os.getcwd()
base = Path(current_path)
full_base = base / "data"
print(full_base)
