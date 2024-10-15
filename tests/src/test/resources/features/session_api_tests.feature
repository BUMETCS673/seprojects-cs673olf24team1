Feature: Sessions API

  Scenario: Retrieve sessions for a user
    Given I am an authenticated user
    And I have a valid user id "2"
    When I send a GET request to "/api/v1/sessions/user/2"


  Scenario: Save a conversation for a user
    Given I am an authenticated user
    And I have a valid user id "2"
    And I have a conversation to save
    When I send a POST request to "/api/v1/sessions/user/2/conversation" with the conversation data
    Then the response is successful but the body is null