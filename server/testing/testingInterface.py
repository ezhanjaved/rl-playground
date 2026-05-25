from server.testing.integrationTesting.integrationTestingInt import (
    integrationTestingInterface,
)
from server.testing.unitTesting.unitTestingInt import unitTestingInterface


def testingInterface():
    unit_tests, unit_total_tests, unit_test_passed = unitTestingInterface()
    integration_tests, integration_total_tests, integration_test_passed = (
        integrationTestingInterface()
    )

    unit_tests_percentage = (unit_test_passed / unit_total_tests) * 100
    integration_tests_percentage = (
        integration_test_passed / integration_total_tests
    ) * 100
    total_test = unit_total_tests + integration_total_tests
    total_test_passed = unit_test_passed + integration_test_passed
    total_test_percentage = (total_test_passed / total_test) * 100
    print("Unit Testing Result")
    print()
    print("Unit Tests: ", unit_tests)
    print("Unit Tests Conducted: ", unit_total_tests)
    print("Total Unit Test Passed: ", unit_test_passed)
    print("Unit Test Passing Percentage: ", unit_tests_percentage)
    print()
    print()
    print("Integration Testing Result")
    print()
    print("Integration Tests: ", integration_tests)
    print("Integration Tests Conducted: ", integration_total_tests)
    print("Total Integration Test Passed: ", integration_test_passed)
    print("Integration Test Passing Percentage: ", integration_tests_percentage)
    print()
    print()
    print("Testing Results")
    print("Total Test Conducted: ", total_test)
    print("Total Test Passed: ", total_test_passed)
    print("Total Test Passing Percentage: ", total_test_percentage)


testingInterface()
