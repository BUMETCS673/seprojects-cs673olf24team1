Feature: Chat History and Caching Consolidation
  As a user of the BUAN chatbot,
  I want to access my previous chat history,
  So that I can review my past interactions quickly.

  Scenario: Retrieve previous chat history
    Given I have an existing session with the BUAN chatbot
    When I request the chat history from my previous session
    Then the chatbot should display my previous interactions in chronological order
    And the chat history should load quickly from the cache.

  Scenario: Delete and retrieve non-existent chat history
    Given I have deleted my chat history
    When I attempt to access my previous chat history
    Then the chatbot should return a "no result found" message.
