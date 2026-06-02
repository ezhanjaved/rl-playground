import numpy as np

from server.engine.eval import evaluator
from server.engine.observationBuilder import buildObs
from server.objectClass.sceneClass import make_runtime_state
from server.utilities.compile import compiler
from server.utilities.extractor import extact_graph_per_agent, extract_agent_list
from server.utilities.fetchEnt import fetchEnt, fetchGraph
from server.utilities.nearestTarget import getNearestTargetInfo
from server.utilities.nearPick import nearbyPickable
from server.utilities.obstaclePath import obstacleAvoid
from server.utilities.refined import actionMasking, actionTranslator


def integrationTestingInterface():
    test_results = {}
    testsPassed = 0
    totalTests = 8
    testsArray = []

    test1 = integrationTestingNearestTarget()
    testsArray.append(test1)
    test_results["near-target"] = test1

    test2 = integrationTestingNearByPickable()
    testsArray.append(test2)
    test_results["near-pickable"] = test2

    test3 = integrationTestingObstacleAvoid()
    testsArray.append(test3)
    test_results["obstacle-avoid"] = test3

    test4 = integrationTestingActionTranslation()
    test_results["action-translation"] = test4
    testsArray.append(test4)

    test5 = integrationTestingObservationBuilder()
    test_results["obs-builder"] = test5
    testsArray.append(test5)

    test6 = integrationTestingEvaluator()
    test_results["evaluator"] = test6
    testsArray.append(test6)

    test7 = integrationEntityFetch()
    test_results["fetch-ent"] = test7
    testsArray.append(test7)

    test8 = integrationGraphFetch()
    test_results["fetch-graph"] = test8
    testsArray.append(test8)

    for i in range(totalTests):
        result = testsArray[i]
        if result:
            testsPassed += 1

    return test_results, totalTests, testsPassed


def integrationTestingNearestTarget():
    # pos Agent: [1.2121, 2.21211, 0]"
    test_passed = False
    entities = {
        "ent_1": {"position": [1.0000, 0, 2.1211], "tag": "target"},
        "ent_2": {"position": [3.0121, 0, -2.1212], "tag": "target"},
    }
    posA = [1.2121, 2.2121, 0]
    found, best, target = getNearestTargetInfo(posA, entities, "target")
    # best = 2.214 & target is 2.0
    print(found, best, target)
    if found and best > target:
        test_passed = True
    return test_passed


def integrationTestingNearByPickable():
    # pos Agent: [1.2121, 2.21211, 0]"
    test_passed = False
    entities = {
        "ent_1": {
            "position": [1.0000, 0, 2.1211],
            "isPickable": True,
            "isCollectable": False,
        },
        "ent_2": {
            "position": [3.0121, 0, -2.1212],
            "isPickable": True,
            "isCollectable": False,
        },
    }
    posA = [1.2121, 2.2121, 0]
    status = nearbyPickable(entities, posA, 1.5, ["Moveable", "Holder"])
    # best = 2.214 & target is 1.5 - status should be false
    if not status:
        test_passed = True
    return test_passed


def integrationTestingObstacleAvoid():
    # pos Agent: [1.2121, 2.21211, 0]"
    test_passed = False
    rotA = [0, 0, 1.121]
    posA = [1.2121, 2.2121, 0]
    objA = [-1.2121, 0, 3.2121]
    status = obstacleAvoid(posA, rotA, objA)
    if status:
        test_passed = True
    return test_passed


def integrationTestingActionTranslation():
    # cap: ["Moveable", "Finder"]
    # actions should be: ["move_up, "move_left", "move_right", "idle", "interact"]
    # lenth should be 5
    # action given "move_right"
    # returned value should be 2
    test_passed = False
    cap = ["Moveable", "Finder"]
    actions, _ = actionMasking(cap)
    actionNumber = actionTranslator(2, actions)
    if actionNumber == "move_right":
        test_passed = True
    return test_passed


def integrationTestingObservationBuilder():
    test_passed = False
    model_id = "1b7cb984-1412-456f-97f1-75de773b01e7"
    scenarioObj = compiler(model_id)
    agent_list = extract_agent_list(scenarioObj)  # extracts the agents_ids
    graphs_per_agent = extact_graph_per_agent(
        scenarioObj, agent_list
    )  # extract the graphs for agents by their id
    runTimeState = make_runtime_state(
        scenarioObj, agent_list, graphs_per_agent, model_id
    )  # form a runtime obj that will mutate while training
    entities = runTimeState.entities
    agentIds = runTimeState.agents_ids
    obs_vector = []
    expected_obs = np.array([1.7807442e-01, -1.0000000e00, 2.2816785e-15, 0.0000000e00])
    for agent_id in agentIds:
        ent = entities[agent_id]
        obs_vector = buildObs(agent_id, ent, entities)
        if np.allclose(obs_vector, expected_obs, atol=1e-5):
            test_passed = True
    return test_passed


def integrationTestingEvaluator():
    test_passed = False
    model_id = "1b7cb984-1412-456f-97f1-75de773b01e7"
    scenarioObj = compiler(model_id)
    agent_list = extract_agent_list(scenarioObj)  # extracts the agents_ids
    graphs_per_agent = extact_graph_per_agent(
        scenarioObj, agent_list
    )  # extract the graphs for agents by their id
    runTimeState = make_runtime_state(
        scenarioObj, agent_list, graphs_per_agent, model_id
    )  # form a runtime obj that will mutate while training
    entities = runTimeState.entities
    agentIds = runTimeState.agents_ids
    obs_vector = []
    reward = None
    exp_reward = -0.02
    for agent_id in agentIds:
        ent = entities[agent_id]
        obs_vector = buildObs(agent_id, ent, entities)
        graph = runTimeState.graph_per_agent[agent_id]
        config = runTimeState.assignment_by_agent[agent_id]
        pre = obs_vector
        post = {agent_id: obs_vector}
        reward, terminated, truncated, _ = evaluator(
            agent_id, pre, post, graph, config, runTimeState
        )
    if exp_reward == reward:
        test_passed = True
    return test_passed


def integrationEntityFetch():
    test_passed = False
    model_id = "1b7cb984-1412-456f-97f1-75de773b01e7"
    ent = fetchEnt(model_id)
    if ent:
        test_passed = True
    return test_passed


def integrationGraphFetch():
    test_passed = False
    model_id = "1b7cb984-1412-456f-97f1-75de773b01e7"
    graph = fetchGraph(model_id)
    if graph:
        test_passed = True
    return test_passed
