Feature: Chatbot API interaction
  Scenario: Valid chatbot request
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request
    Then I receive a valid HTTP response code 200
