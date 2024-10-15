Feature: Unauthorized Access

  Scenario: Access protected endpoint without authentication
    Given I am an unauthenticated user
    And I have a valid user id "9"
    When I send a GET request to "/api/v1/sessions/user/9"
    Then I receive an authentication failure with status code 401

  Scenario: Attempt to save a conversation without authentication
    Given I am an unauthenticated user
    And I have a conversation to save
    When I send a POST request to "/api/v1/sessions/user/9/conversation" with the conversation data
    Then I receive an authentication failure with status code 401