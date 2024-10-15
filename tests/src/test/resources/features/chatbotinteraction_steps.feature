Feature: Verify Chatbot Interaction and Navigation Features

  Scenario: Perform all chatbot interactions in one session
    Given I log in to the chatbot with username "testuser123" and password "TestPassword123!"
    Then the message box should be highlighted
    When I click on the Save to History
    Then the Save to History should be highlighted
    Then the New Chat should be highlighted
