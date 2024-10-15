Feature: Verify Login Page Functionality

  # Test case 1: Valid Login
  Scenario: User can log in with valid credentials
    Given I am on the login page
    When I enter username "testuser123" and password "TestPassword123!"
    Then I should see the homepage


    # Test case 2: User can log out after login
  Scenario: User can log out
    Given I am logged in with username "testuser123" and password "TestPassword123!"
    When I click on the logout button
    Then I should be redirected to the login page



