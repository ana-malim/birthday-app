Feature: Testing Birthday REST API
  Users should be able to submit GET, POST, PATCH and DELTE requests

Scenario: Add new birthday record
    When users upload data on a project
    Then the server should handle it and return a success status

Scenario: Get error on POST new birthday record without a required field
    Given the following data
    When user post data to database
    Then response status should be equal to 200
    And the response should be equal to ""

Scenario: Get error on POST new birthday record that already exists
    Given the following data
    When user post data to database
    Then response status should be equal to 200
    And the response should be equal to ""

Scenario: Edit birthday record
    When users upload data on a project
    Then the server should handle it and return a success status

Scenario: Get error on PATCH birthday record without a required field
    Given the following data
    When user post data to database
    Then response status should be equal to 200
    And the response should be equal to ""

Scenario: Get error on PATCH birthday record that already exists
    Given the following data
    When user post data to database
    Then response status should be equal to 200
    And the response should be equal to ""

Scenario: Delete birthday record
    When users upload data on a project
    Then the server should handle it and return a success status

Scenario: Get today's birthday records
    When users upload data on a project
    Then the server should handle it and return a success status

Scenario: Get all birthday records
    When users upload data on a project
    Then the server should handle it and return a success status