from server.database.supabaseClient import supabase


def update_status(id, status, table_name, id_name):
    response = (
        supabase.table(table_name).update({"status": status}).eq(id_name, id).execute()
    )

    if response.data:
        return response.data
    else:
        print("Error:", response)
        return None


def update_model(id, data, table, id_name):
    response = supabase.table(table).update(data).eq(id_name, id).execute()
