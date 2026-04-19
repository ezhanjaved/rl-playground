import time

from httpx import RemoteProtocolError

from server.database.supabaseClient import supabase


def _execute_with_retry(query, retries=3, delay=1.0):
    for attempt in range(retries):
        try:
            response = query.execute()
            return response
        except RemoteProtocolError as e:
            if attempt < retries - 1:
                print(
                    f"Supabase connection error (attempt {attempt + 1}/{retries}), retrying in {delay * (attempt + 1)}s: {e}"
                )
                time.sleep(delay * (attempt + 1))
            else:
                print(f"Supabase connection failed after {retries} attempts: {e}")
                return None


def update_status(id, status, table_name, id_name):
    query = supabase.table(table_name).update({"status": status}).eq(id_name, id)
    response = _execute_with_retry(query)

    if response and response.data:
        return response.data
    else:
        print("Error:", response)
        return None


def update_model(id, data, table, id_name):
    query = supabase.table(table).update(data).eq(id_name, id)
    _execute_with_retry(query)
