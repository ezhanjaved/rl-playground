from server.database.supabaseClient import supabase


def fetchModels(uid, table, id):
    response = supabase.table(table).select("*").eq(id, uid).execute()
    if response.data:
        return response.data
    else:
        print("Error:", response)
        return None
