Feature: Create Client

  Scenario: Create a client with simple firstname
    Given I am a user with the ability to create clients
    When I create a client with the following data
      | Field     | Value               |
      | firstname | jean                |
      | lastname  | dupont              |
      | street    | 123 Rue de la Paix  |
      | city      | Paris               |
      | zipcode   | 75001               |
    Then the client should be created with formatted data
      | Field              | Value               |
      | name.firstname     | Jean                |
      | name.lastname      | DUPONT              |
      | address.street     | 123 Rue de la Paix  |
      | address.city       | Paris               |
      | address.zipcode    | 75001               |

  Scenario: Create a client with compound firstname
    Given I am a user with the ability to create clients
    When I create a client with the following data
      | Field     | Value                  |
      | firstname | jean-pierre            |
      | lastname  | martin                 |
      | street    | 456 Avenue Victor Hugo |
      | city      | Lyon                   |
      | zipcode   | 69001                  |
    Then the client should be created with formatted data
      | Field              | Value                  |
      | name.firstname     | Jean-Pierre            |
      | name.lastname      | MARTIN                 |
      | address.street     | 456 Avenue Victor Hugo |
      | address.city       | Lyon                   |
      | address.zipcode    | 69001                  |
