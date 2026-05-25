from server.utilities.capabilitiesMatch import capabilityMatcher
from server.utilities.distance3D import distance3D
from server.utilities.positionSwap import positionSwap, rotationSwap
from server.utilities.refined import actionMasking
from server.utilities.rotationCal import getForwardVectorFromYaw


def unitTestingInterface():
    test_results = {}
    testsPassed = 0
    totalTests = 6
    testsArray = []

    test1 = unitTestingCapabilityMatcher()
    test_results["capability-matcher"] = test1
    testsArray.append(test1)

    test2 = unitTestingdistance3d()
    test_results["distance-3d"] = test2
    testsArray.append(test2)

    test3 = unitTestingPositionSwap()
    test_results["position-swap"] = test3
    testsArray.append(test3)

    test4 = unitTestingRotationSwap()
    test_results["rot-swap"] = test4
    testsArray.append(test4)

    test5 = unitTestingGetForwardDirection()
    test_results["get-forward-direction"] = test5
    testsArray.append(test5)

    test6 = unitTestingActionMasking()
    test_results["action-masking"] = test6
    testsArray.append(test6)

    for i in range(totalTests):
        result = testsArray[i]
        if result:
            testsPassed += 1

    return test_results, totalTests, testsPassed


def unitTestingCapabilityMatcher():
    # action "idle" should return "Moveable"
    # action "interact" should return Finder
    cap = capabilityMatcher("idle")
    test_passed = False
    if cap == "Moveable":
        test_passed = True
    return test_passed


def unitTestingdistance3d():
    # pos A: [1.2121, 2.21211, 0]"
    # pos B: [-1.212, 3.12122, 0]
    # distance should be 2.588965392217517
    test_passed = False
    posA = [1.2121, 2.21211, 0]
    posB = [-1.212, 3.12122, 0]
    distance = distance3D(posA, posB)
    if distance == 2.588965392217517:
        test_passed = True
    return test_passed


def unitTestingPositionSwap():
    # pos A: [1.2121, 0, 2.21211]"
    # swapped pos should be [-1.2121, 2.21211, 0]
    test_passed = False
    posA = [1.2121, 0, 2.21211]
    pos = positionSwap(posA)
    if pos == [-1.2121, 2.21211, 0]:
        test_passed = True
    return test_passed


def unitTestingRotationSwap():
    # pos A: [0,0,0,1]"
    # swapped rot should be [0,-0,0,1]
    test_passed = False
    rotA = [0, 0, 0, 1]
    rot = rotationSwap(rotA)
    if rot == [0, -0, 0, 1]:
        test_passed = True
    return test_passed


def unitTestingGetForwardDirection():
    # rz: 3.142 rad"
    # Rx: 1 and Ry: 0
    test_passed = False
    rz = 3.142  # 180 degree
    Rx, Ry = getForwardVectorFromYaw(rz)
    print("Rx: ", Rx)
    print("Ry: ", Ry)
    if Rx == 0 and Ry == 1:
        test_passed = True
    return test_passed


def unitTestingActionMasking():
    # cap: ["Moveable", "Finder"]
    # actions should be: ["move_up, "move_left", "move_right", "idle", "interact"]
    # lenth should be 5
    test_passed = False
    cap = ["Moveable", "Finder"]
    expectedActions = ["move_up", "move_left", "move_right", "idle", "interact"]
    actions, numOfActions = actionMasking(cap)
    if actions == expectedActions and numOfActions == 5:
        test_passed = True
    return test_passed
