Feature: Verify Login Page

  Scenario: User can log in with valid credentials
    Given I am on the login page
    When I enter username "bcevik@bu.edu" and password "admin"
    Then I should see the homepage

  Scenario: User cannot log in with invalid credentials
    Given I am on the login page
    When I enter username "wrong@bu.edu" and password "wrongpass"
    Then I should see an error message "Invalid credentials"

  Scenario: User can log out successfully
    Given I am logged in with username "bcevik@bu.edu" and password "admin"
    When I click the logout button
    Then I should be on the login page