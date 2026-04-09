from server.database.supabaseClient import supabase


def create_model(data, table):
    response = supabase.table(table).insert(data).execute()
    return response.data
