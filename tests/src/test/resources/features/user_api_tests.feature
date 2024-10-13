Feature: User creation functionality

  Scenario: Successfully create a new user while authenticated
    Given I am an authenticated user
    And I have new user data
    When I send a POST request to "/api/v1/users/user" with the user data
    Then the user is created in the system