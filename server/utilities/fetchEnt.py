from server.storage.downloadModel import download_ent
from server.utilities.readerJson import read_json


def fetchEnt(model_id):
    if not model_id:
        return
    path = download_ent(model_id)
    print("Path: ", path)
    ent = read_json(path)
    return ent


entities = fetchEnt("0fc71b65-48e9-4f05-a2ab-e5a74ae68b2f")
print("ENTITIES: ", entities)
print(type(entities))
