from server.database.supabaseClient import supabase


def fetchModels(uid, table, id):
    response = supabase.table(table).select("*").eq(id, uid).execute()
    if response.data:
        return response.data
    else:
        print("Error:", response)
        return None


def fetchTemplate(uid, type):
    response = (
        supabase.table("templates")
        .select("*")
        .eq("user_id", uid)
        .eq("type", type)
        .execute()
    )
    if response.data:
        return response.data
    else:
        print("Error:", response)
        return None


def checkTemplateExists(uid, type, name):
    response = (
        supabase.table("templates")
        .select("*")
        .eq("user_id", uid)
        .eq("type", type)
        .eq("path", name)
        .execute()
    )
    if response.data:
        return True
    else:
        return False
