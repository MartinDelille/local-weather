Feature: Local Weather
  As a user
  I must be able to see the current weather forecast
  In my location
  Today
  And in the next three days

  Scenario: Check application title
    Given I am going to the website "/"
    When I look at the title
    Then the title is "Local Weather"
