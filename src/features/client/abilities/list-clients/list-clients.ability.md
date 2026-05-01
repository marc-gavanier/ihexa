# Feature: List Clients

## Scenario: List all clients

* Given the following clients exist
  | id                                   | firstname | lastname | street             | city   | zipcode |
  | 550e8400-e29b-41d4-a716-446655440001 | jean      | dupont   | 123 Rue de la Paix | Paris  | 75001   |
  | 550e8400-e29b-41d4-a716-446655440002 | marie     | martin   | 456 Avenue Foch    | Lyon   | 69001   |
* When I list all clients
* Then I should see the following clients
  | id                                   | name.firstname | name.lastname | address.street     | address.city | address.zipcode |
  | 550e8400-e29b-41d4-a716-446655440001 | Jean           | DUPONT        | 123 Rue de la Paix | Paris        | 75001           |
  | 550e8400-e29b-41d4-a716-446655440002 | Marie          | MARTIN        | 456 Avenue Foch    | Lyon         | 69001           |

## Scenario: List clients with pagination

* Given the following clients exist
  | id                                   | firstname | lastname | street      | city      | zipcode |
  | 550e8400-e29b-41d4-a716-446655440001 | jean      | dupont   | 1 Rue A     | Paris     | 75001   |
  | 550e8400-e29b-41d4-a716-446655440002 | marie     | martin   | 2 Rue B     | Lyon      | 69001   |
  | 550e8400-e29b-41d4-a716-446655440003 | pierre    | bernard  | 3 Rue C     | Marseille | 13001   |
* When I list clients with page 1 and page size 2
* Then I should see 2 clients on page 1 of 2 total pages
* And the total items count should be 3

## Scenario: Search clients with no results

* Given the following clients exist
  | id                                   | firstname | lastname | street             | city      | zipcode |
  | 550e8400-e29b-41d4-a716-446655440001 | jean      | dupont   | 12 Rue de la Paix  | Paris     | 75006   |
* When I search for clients with "xyz"
* Then I should find no clients

## Scenario Outline: Search clients by partial match on any field

* Given the following clients exist
  | id                                   | firstname | lastname | street             | city      | zipcode |
  | 550e8400-e29b-41d4-a716-446655440001 | jean      | dupont   | 12 Rue de la Paix  | Paris     | 75006   |
  | 550e8400-e29b-41d4-a716-446655440002 | jeanne    | martin   | 5 Avenue Foch      | Lyon      | 69001   |
  | 550e8400-e29b-41d4-a716-446655440003 | pierre    | durand   | 8 Rue du Commerce  | Paris     | 75015   |
* When I search for clients with "<query>"
* Then I should find clients with ids "<ids>"

  ### Examples:

  | query          | ids                                                                          |
  | jean           | 550e8400-e29b-41d4-a716-446655440001,550e8400-e29b-41d4-a716-446655440002    |
  | paris          | 550e8400-e29b-41d4-a716-446655440001,550e8400-e29b-41d4-a716-446655440003    |
  | dupont         | 550e8400-e29b-41d4-a716-446655440001                                         |
  | dup 75         | 550e8400-e29b-41d4-a716-446655440001,550e8400-e29b-41d4-a716-446655440003    |
  | rue            | 550e8400-e29b-41d4-a716-446655440001,550e8400-e29b-41d4-a716-446655440003    |
