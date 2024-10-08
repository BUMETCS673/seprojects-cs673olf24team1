Feature: Chatbot API interaction

  Scenario: Valid chatbot request
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request
    Then I receive a valid HTTP response code 200

  Scenario: Invalid chatbot request with empty message
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request with an empty message
    Then I receive an invalid HTTP response code 400

  Scenario: Chatbot request with unauthorized access
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request without credentials
    Then I receive an unauthorized HTTP response code 401