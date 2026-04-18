Feature: Consult Invoice

  Scenario: Consult an existing invoice
    Given I am a user with the ability to consult invoices
    When I consult an invoice with ID "550e8400-e29b-41d4-a716-446655440000"
    Then I should see the invoice
      | Field                     | Value                                |
      | id                        | 550e8400-e29b-41d4-a716-446655440000 |
    And I should see the recipient
      | Field                     | Value                                |
      | recipient.name.firstname  | Jean                                 |
      | recipient.name.lastname   | Dupont                               |
      | recipient.address.street  | 123 Rue de la Paix                   |
      | recipient.address.zipcode | 75001                                |
      | recipient.address.city    | Paris                                |
    And I should see the line 0
      | Field             | Value                                |
      | lines[0].label    | Prestation de conseil                |
      | lines[0].quantity | 2                                    |
      | lines[0].amount   | 15000                                |
    And I should see the line 1
      | Field             | Value                                |
      | lines[1].label    | Développement logiciel               |
      | lines[1].quantity | 1                                    |
      | lines[1].amount   | 50000                                |

  Scenario: Consult a non-existent invoice
    Given I am a user with the ability to consult invoices
    When I consult an invoice with ID "e6795644-4aea-4284-a3cf-50a0327539d6"
    Then the invoice should not be found

