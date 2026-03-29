Feature: Create Client

  Scenario: Create a client with simple firstname
    Given I am a user with the ability to create clients
    When I create a client with the following data
      | Field     | Value                                |
      | id        | 550e8400-e29b-41d4-a716-446655440000 |
      | firstname | jean                                 |
      | lastname  | dupont                               |
      | street    | 123 Rue de la Paix                   |
      | city      | Paris                                |
      | zipcode   | 75001                                |
    Then the client should be created with formatted data
      | Field              | Value               |
      | name.firstname     | Jean                |
      | name.lastname      | DUPONT              |
      | address.street     | 123 Rue de la Paix  |
      | address.city       | Paris               |
      | address.zipcode    | 75001               |

  Scenario: List all clients
    Given the following clients exist
      | id                                   | firstname | lastname | street             | city   | zipcode |
      | 550e8400-e29b-41d4-a716-446655440001 | jean      | dupont   | 123 Rue de la Paix | Paris  | 75001   |
      | 550e8400-e29b-41d4-a716-446655440002 | marie     | martin   | 456 Avenue Foch    | Lyon   | 69001   |
    When I list all clients
    Then I should see the following clients
      | id                                   | name.firstname | name.lastname | address.street     | address.city | address.zipcode |
      | 550e8400-e29b-41d4-a716-446655440001 | Jean           | DUPONT        | 123 Rue de la Paix | Paris        | 75001           |
      | 550e8400-e29b-41d4-a716-446655440002 | Marie          | MARTIN        | 456 Avenue Foch    | Lyon         | 69001           |

  Scenario: List clients with pagination
    Given the following clients exist
      | id                                   | firstname | lastname | street      | city      | zipcode |
      | 550e8400-e29b-41d4-a716-446655440001 | jean      | dupont   | 1 Rue A     | Paris     | 75001   |
      | 550e8400-e29b-41d4-a716-446655440002 | marie     | martin   | 2 Rue B     | Lyon      | 69001   |
      | 550e8400-e29b-41d4-a716-446655440003 | pierre    | bernard  | 3 Rue C     | Marseille | 13001   |
    When I list clients with page 1 and page size 2
    Then I should see 2 clients on page 1 of 2 total pages
    And the total items count should be 3
