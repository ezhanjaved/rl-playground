from server.objectClass.assignmentClass import Assignment, AssignmentConfig
from server.objectClass.entitiesClass import Agent, Object, StateSpace
from server.objectClass.graphClass import Edge, Graph, Node
from server.objectClass.sceneClass import Scenario
from server.path_config import DATA_DIR
from server.utilities.loader import json_loader


def compiler(id):
    folder_path = DATA_DIR / f"model_training_{id}"

    key1 = "entities.json"
    key2 = "graphs.json"
    key3 = "assignments.json"

    entPath = folder_path / key1
    graphPath = folder_path / key2
    assPath = folder_path / key3

    entities = json_loader(entPath)
    graphs = json_loader(graphPath)
    assignments = json_loader(assPath)

    entObject = build_entities(entities)
    graphObj = build_graphs(graphs)
    assignmentObject = build_assignments(assignments)

    return Scenario(
        entities=entObject,
        graphs=graphObj,
        assignments=assignmentObject,
        training_id=id,
    )


def build_graphs(graph_dict):
    return {
        graph_id: Graph(
            id=graph_obj["id"],
            nodes=build_nodes(graph_obj["nodes"]),
            edges=build_edges(graph_obj["edges"]),
            name=graph_obj["name"],
        )
        for graph_id, graph_obj in graph_dict.items()
    }


def build_nodes(node_dict):
    return [
        Node(data=node["data"], type=node["type"], id=node["id"]) for node in node_dict
    ]


def build_edges(edge_dict):
    return [
        Edge(
            id=edge["id"],
            source=edge["source"],
            target=edge["target"],
            sourceHandle=edge["sourceHandle"],
            targetHandle=edge["targetHandle"],
        )
        for edge in edge_dict
    ]


def build_assignments(assignment_dict):
    return {
        assignment_id: Assignment(
            graph_id=assignment_obj["assignedGraphId"],
            config=build_assignmentConfig(assignment_obj["assignedConfig"]),
        )
        for assignment_id, assignment_obj in assignment_dict.items()
    }


def build_assignmentConfig(config_dict):
    return AssignmentConfig(
        episodeNumber=config_dict["episodeNumber"],
        maxStepsPerEpisode=config_dict["maxStepsPerEpisode"],
        rewardImp=config_dict["rewardImportance"],
        algorithm=config_dict["algorithm"],
        explorationStrategy=config_dict["explorationStrategy"],
        learningSpeed=config_dict["learningSpeed"],
        rewardMultiplier=config_dict["rewardMultiplier"],
        agentSpawnMode=config_dict["agentSpawnMode"],
        objectSpawnMode=config_dict["objectSpawnMode"],
        timesteps=config_dict["timesteps"],
        clipRange=config_dict["clipRange"],
        gaeLambda=config_dict["gaeLambda"],
        valLossCf=config_dict["valLossCf"],
        batch=config_dict["batch"],
        epoch=config_dict["epoch"],
        n_steps=config_dict["n_steps"],
        target_kl=config_dict["kl"],
        ent_coeff=config_dict["ent_coeff"],
    )


def build_entities(ent_dict):
    return {
        ent_id: (
            build_agents(ent_obj)
            if ent_obj["tag"] == "agent"
            else build_objects(ent_obj)
        )
        for ent_id, ent_obj in ent_dict.items()
    }


def build_agents(agent_obj):
    return Agent(
        id=agent_obj["id"],
        tag=agent_obj["tag"],
        name=agent_obj["name"],
        capabilities=agent_obj.get("capabilities", []),
        position=agent_obj.get("position", []),
        rotation=agent_obj.get("rotation", []),
        quatRotation=agent_obj.get("quatRotation", [0, 0, 0, 1]),
        isDecor=agent_obj.get("isDecor", False),
        isDeposit=agent_obj.get("isDeposit", False),
        isPickable=agent_obj.get("isPickable", False),
        isCollectable=agent_obj.get("isCollectable", False),
        isAssigned=agent_obj.get("isAssigned", False),
        isTarget=agent_obj.get("isTarget", False),
        last_action=agent_obj.get("last_action", "idle"),
        action_space=agent_obj.get("action_space", []),
        observation_space=agent_obj.get("observation_space", []),
        state_space=build_state_space(agent_obj.get("state_space", {})),
        settings=agent_obj.get("settings", {}),
        collider=agent_obj.get("collider", {}),
    )


def build_objects(obj):
    return Object(
        id=obj["id"],
        tag=obj["tag"],
        name=obj["name"],
        position=obj.get("position", []),
        rotation=obj.get("rotation", []),
        quatRotation=obj.get("quatRotation", [0, 0, 0, 1]),
        isDecor=obj.get("isDecor", False),
        isPickable=obj.get("isPickable", False),
        isCollectable=obj.get("isCollectable", False),
        isTarget=obj.get("isTarget", False),
        isDeposit=obj.get("isDeposit", False),
        collider=obj.get("collider", {}),
    )


def build_state_space(ss_dict) -> StateSpace:
    state: StateSpace = {}

    if "last_action_index" in ss_dict:
        state["last_action_index"] = ss_dict["last_action_index"]

    if "targetReached" in ss_dict:
        state["targetReached"] = ss_dict["targetReached"]

    if "previous_distance_target" in ss_dict:
        state["previous_distance_target"] = ss_dict["previous_distance_target"]

    if "holding" in ss_dict:
        state["holding"] = ss_dict["holding"]

    if "lastPickSuccess" in ss_dict:
        state["lastPickSuccess"] = ss_dict["lastPickSuccess"]

    if "previous_distance_pickable" in ss_dict:
        state["previous_distance_pickable"] = ss_dict["previous_distance_pickable"]

    if "lastItemCollected" in ss_dict:
        state["lastItemCollected"] = ss_dict["lastItemCollected"]

    if "items_collected" in ss_dict:
        state["items_collected"] = ss_dict["items_collected"]

    if "previous_distance_collect" in ss_dict:
        state["previous_distance_collect"] = ss_dict["previous_distance_collect"]

    if "items_deposited" in ss_dict:
        state["items_deposited"] = ss_dict["items_deposited"]

    if "nearDeposit" in ss_dict:
        state["nearDeposit"] = ss_dict["nearDeposit"]

    if "lastDepositSuccess" in ss_dict:
        state["lastDepositSuccess"] = ss_dict["lastDepositSuccess"]

    if "previous_distance_deposit" in ss_dict:
        state["previous_distance_deposit"] = ss_dict["previous_distance_deposit"]

    return state
