import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

url = os.getenv("SUPABASE_URL")
secret_key = os.getenv("SUPABASE_PUBLISHABLE_DEFAULT_KEY")
print("SUPABASE URL: ", url)
supabase: Client = create_client(
    str(url),
    str(secret_key),
)
