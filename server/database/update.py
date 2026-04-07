from database.supabaseClient import supabase


def update_status(id, status):
    response = (
        supabase.table("models")
        .update({"status": status})
        .eq("training_id", id)
        .execute()
    )

    if response.data:
        return response.data
    else:
        print("Error:", response.error)
        return None


def update_model(id, data):
    response = supabase.table("models").update(data).eq("training_id", id).execute()
    print(response)
