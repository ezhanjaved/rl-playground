from database.supabaseClient import supabase


def create_model(data):
    response = supabase.table("models").insert(data).execute()
    return response.data
