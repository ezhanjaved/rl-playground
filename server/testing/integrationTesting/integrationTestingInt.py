from server.utilities.nearestTarget import getNearestTargetInfo
from server.utilities.nearPick import nearbyPickable
from server.utilities.obstaclePath import obstacleAvoid
from server.utilities.refined import actionMasking, actionTranslator


def integrationTestingInterface():
    test_results = {}
    testsPassed = 0
    totalTests = 4
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
