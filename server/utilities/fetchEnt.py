from server.storage.downloadModel import download_ent, download_graph
from server.utilities.readerJson import read_json


def fetchEnt(model_id):
    if not model_id:
        return
    path = download_ent(model_id)
    print("Ent Path: ", path)
    ent = read_json(path)
    return ent


def fetchGraph(model_id):
    if not model_id:
        return
    path = download_graph(model_id)
    print("Graph Path: ", path)
    graph = read_json(path)
    return graph
