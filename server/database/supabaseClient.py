import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

url = os.getenv("SUPABASE_URL")
secret_key = os.getenv("SUPABASE_PUBLISHABLE_DEFAULT_KEY")

supabase: Client = create_client(url, secret_key)
