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
        rewardImp=config_dict["rewardImportance"],
        algorithm=config_dict["algorithm"],
        learningSpeed=config_dict["learningSpeed"],
        rewardMultiplier=config_dict["rewardMultiplier"],
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
        isGate=agent_obj.get("isGate", False),
        isDestroyable=agent_obj.get("isDestroyable", False),
        last_action=agent_obj.get("last_action", "idle"),
        action_space=agent_obj.get("action_space", []),
        observation_space=agent_obj.get("observation_space", []),
        state_space=build_state_space(agent_obj.get("state_space", {})),
        settings=agent_obj.get("settings", {}),
        current_behavior=agent_obj.get("current_behavior", None),
        behavior=agent_obj.get("behavior", []),
        behaviorObs=agent_obj.get("behaviorObs", []),
        isBall=agent_obj.get("isBall", False),
        isGoalPostBlue=agent_obj.get("isGoalPostBlue", False),
        isGoalPostRed=agent_obj.get("isGoalPostRed", False),
        isGoalPostYellow=agent_obj.get("isGoalPostYellow", False),
        isGoalPostGreen=agent_obj.get("isGoalPostGreen", False),
        goalId=agent_obj.get("goalId", ""),
        teamId=agent_obj.get("teamId", ""),
        oppTeamId=agent_obj.get("oppTeamId", ""),
        positionSpawned=agent_obj.get("positionSpawned", []),
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
        isGate=obj.get("isGate", False),
        isDestroyable=obj.get("isDestroyable", False),
        isBall=obj.get("isBall", False),
        isGoalPostBlue=obj.get("isGoalPostBlue", False),
        isGoalPostRed=obj.get("isGoalPostRed", False),
        isGoalPostYellow=obj.get("isGoalPostYellow", False),
        isGoalPostGreen=obj.get("isGoalPostGreen", False),
        goalId=obj.get("goalId", ""),
        teamId=obj.get("teamId", ""),
        oppTeamId=obj.get("oppTeamId", ""),
        positionSpawned=obj.get("positionSpawned", []),
        collider=obj.get("collider", {}),
        state=obj.get("state", {}),
    )


def build_state_space(ss_dict) -> StateSpace:
    state: StateSpace = {}

    if "last_action_index" in ss_dict:
        state["last_action_index"] = ss_dict["last_action_index"]

    # Finder
    if "targetReached" in ss_dict:
        state["targetReached"] = ss_dict["targetReached"]

    if "previous_distance_target" in ss_dict:
        state["previous_distance_target"] = ss_dict["previous_distance_target"]

    # Holder
    if "holding" in ss_dict:
        state["holding"] = ss_dict["holding"]

    if "lastPickSuccess" in ss_dict:
        state["lastPickSuccess"] = ss_dict["lastPickSuccess"]

    if "previous_distance_pickable" in ss_dict:
        state["previous_distance_pickable"] = ss_dict["previous_distance_pickable"]

    # Collect
    if "lastItemCollected" in ss_dict:
        state["lastItemCollected"] = ss_dict["lastItemCollected"]

    if "items_collected" in ss_dict:
        state["items_collected"] = ss_dict["items_collected"]

    if "keys_collected" in ss_dict:
        state["keys_collected"] = ss_dict["keys_collected"]

    if "total_items_collected" in ss_dict:
        state["total_items_collected"] = ss_dict["total_items_collected"]

    if "previous_distance_collect" in ss_dict:
        state["previous_distance_collect"] = ss_dict["previous_distance_collect"]

    # Deposit
    if "items_deposited" in ss_dict:
        state["items_deposited"] = ss_dict["items_deposited"]

    if "nearDeposit" in ss_dict:
        state["nearDeposit"] = ss_dict["nearDeposit"]

    if "lastDepositSuccess" in ss_dict:
        state["lastDepositSuccess"] = ss_dict["lastDepositSuccess"]

    if "previous_distance_deposit" in ss_dict:
        state["previous_distance_deposit"] = ss_dict["previous_distance_deposit"]

    # Destroy
    if "items_destroyed" in ss_dict:
        state["items_destroyed"] = ss_dict["items_destroyed"]

    if "nearDestroyable" in ss_dict:
        state["nearDestroyable"] = ss_dict["nearDestroyable"]

    if "lastDestroySuccess" in ss_dict:
        state["lastDestroySuccess"] = ss_dict["lastDestroySuccess"]

    if "previous_distance_destroyable" in ss_dict:
        state["previous_distance_destroyable"] = ss_dict[
            "previous_distance_destroyable"
        ]

    # Opener
    if "gates_open" in ss_dict:
        state["gates_open"] = ss_dict["gates_open"]

    if "nearGate" in ss_dict:
        state["nearGate"] = ss_dict["nearGate"]

    if "lastOpenSuccess" in ss_dict:
        state["lastOpenSuccess"] = ss_dict["lastOpenSuccess"]

    if "previous_distance_gate" in ss_dict:
        state["previous_distance_gate"] = ss_dict["previous_distance_gate"]

    # Footballer
    if "team_goals_scored" in ss_dict:
        state["team_goals_scored"] = ss_dict["team_goals_scored"]

    if "team_goals_conceded" in ss_dict:
        state["team_goals_conceded"] = ss_dict["team_goals_conceded"]

    if "my_goals_scored" in ss_dict:
        state["my_goals_scored"] = ss_dict["my_goals_scored"]

    if "my_own_goals_scored" in ss_dict:
        state["my_own_goals_scored"] = ss_dict["my_own_goals_scored"]

    if "last_goal_type" in ss_dict:
        state["last_goal_type"] = ss_dict["last_goal_type"]

    if "lastKickSuccess" in ss_dict:
        state["lastKickSuccess"] = ss_dict["lastKickSuccess"]

    if "previous_distance_ball" in ss_dict:
        state["previous_distance_ball"] = ss_dict["previous_distance_ball"]

    if "previous_distance_goal" in ss_dict:
        state["previous_distance_goal"] = ss_dict["previous_distance_goal"]

    return state
