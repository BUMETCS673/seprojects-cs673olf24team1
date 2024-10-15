Feature: Sign Up Functionality

  Scenario: User can sign up with valid credentials
    Given I launch the login page
    When I click on the Sign Up link
    And I enter username "testuser12311"
    And I enter email "testuser11@example.com"
    And I enter password "TestPassword1231!"
    And I confirm the password "TestPassword1231!"
    And I enter first name "John"
    And I enter last name "Doe"
    And I enter BU ID "U12345678"
    And I select program type "MS degree"
    And I select program name "MS of Software Development"
    And I select path of interest "Web Development"
    And I click on the Sign Up button

