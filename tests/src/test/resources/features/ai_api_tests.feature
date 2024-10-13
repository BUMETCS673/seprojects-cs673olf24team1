Feature: Chatbot API AI interaction

  Scenario: Retrieve course description for a valid course number
  Given I set POST to chatbot AI API endpoint
  When I send a POST HTTP request with a valid course number "CS520"
  Then I receive a valid HTTP response code 200 from ai

  Scenario: Retrieve multiple course descriptions in one interaction
  Given I set POST to chatbot AI API endpoint
  When I send a POST HTTP request with multiple course numbers "CS101" and "CS102"
  Then I receive a valid HTTP response code 200 from ai
  And the system should display the descriptions for both courses

  Scenario: Generate a schedule based on completed courses
  Given I set POST to chatbot AI API endpoint
  When I send a POST HTTP request with my completed courses
  Then I receive a valid HTTP response code 200 from ai

      #currently not functional
  Scenario: Modify the class schedule
  Given I set POST to chatbot AI API endpoint
  When I request schedule modifications
  Then I receive a valid HTTP response code 422 from ai

       #currently not functional
  Scenario: Request unavailable course
  Given I set POST to chatbot AI API endpoint
  When I request an unavailable course "Unavailable101"
  Then I receive a valid HTTP response code 422 from ai

       #currently not functional
  Scenario: Export the class schedule to calendar format
  Given I set POST to chatbot AI API endpoint
  When I export the schedule
  Then I receive a valid HTTP response code 422 from ai