Feature: Chatbot API interaction

  Scenario: Valid chatbot request
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request
    Then I receive a valid HTTP response code 200

  Scenario: Invalid chatbot request with empty message
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request with an empty message
    Then I receive an invalid HTTP response code 422

  Scenario: Valid chatbot request asking for class schedule
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request with the message "Can you create a class schedule for CS web development?"
    Then I receive a valid HTTP response code 200

  Scenario: Valid chatbot request asking for project ideas
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request with the message "Can you suggest project ideas for Web development?"
    Then I receive a valid HTTP response code 200

  Scenario: Valid chatbot request asking for career advice
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request with the message "What career paths are available for web development?"
    Then I receive a valid HTTP response code 200

  Scenario: Valid chatbot request asking for prerequisites
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request with the message "What are the prerequisites for advanced web development courses?"
    Then I receive a valid HTTP response code 200

  Scenario: Valid chatbot request asking for course recommendations
    Given I set POST chatbot API endpoint
    When I send a POST HTTP request with the message "Which courses should I take for a specialization in web development?"
    Then I receive a valid HTTP response code 200
