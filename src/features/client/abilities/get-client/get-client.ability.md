# Feature: Get Client

## Scenario: Get an existing client by id

* Given the following clients exist
  | id                                   | firstname | lastname | street             | city  | zipcode |
  | 550e8400-e29b-41d4-a716-446655440000 | jean      | dupont   | 123 Rue de la Paix | Paris | 75001   |
* When I get the client with id "550e8400-e29b-41d4-a716-446655440000"
* Then I should see the client
  | Field              | Value               |
  | name.firstname     | Jean                |
  | name.lastname      | DUPONT              |
  | address.street     | 123 Rue de la Paix  |
  | address.city       | Paris               |
  | address.zipcode    | 75001               |

## Scenario: Get a non-existent client

* When I get the client with id "e6795644-4aea-4284-a3cf-50a0327539d6"
* Then the client should not be found
