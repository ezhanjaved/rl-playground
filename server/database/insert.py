from server.database.supabaseClient import supabase


def create_model(data, table):
    response = supabase.table(table).insert(data).execute()
    return response.data


def create_template(data):
    response = supabase.table("templates").insert(data).execute()
    return response.data
