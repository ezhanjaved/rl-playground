from server.database.supabaseClient import supabase


def delete_entry(id, id_name, table, uid):
    response = (
        supabase.table(table).delete().eq(id_name, id).eq("user_id", uid).execute()
    )
    return response.data
