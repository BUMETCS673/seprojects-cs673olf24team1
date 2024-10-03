Feature: Verify Login Page
  Scenario: User can log in with valid credentials
    Given I am on the login page
    When I enter username "bcevik@bu.edu" and password "admin"
    Then I should see the homepage
