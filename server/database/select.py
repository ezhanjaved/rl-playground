from server.database.supabaseClient import supabase


def fetchModels(uid, table, id):
    response = supabase.table(table).select("*").eq(id, uid).execute()
    if response.data:
        return response.data
    else:
        print("Error:", response.error)
        return None


models = fetchModels("125810d4-6d11-4d7d-9804-e472a261d345", "models", "user_id")
print("MODELS: ", models)
print(type(models))
