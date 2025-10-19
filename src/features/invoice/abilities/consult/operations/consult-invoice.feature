Feature: Invoice Consultation
  In order to consul my invoices, I want to be able to access them by their unique identifiers.

  Scenario: Cannot consult a non-existent invoice
    When I consult the invoice with ID "e6795644-4aea-4284-a3cf-50a0327539d6"
    Then Invoice should not be found

  Scenario: Consult an invoice by its ID
    When I consult the invoice with ID "b06f2a21-d137-4557-80e1-6e6d44669cf6"
    Then I should see the invoice details
      | Field                                | Value                                |
      | id                                   | b06f2a21-d137-4557-80e1-6e6d44669cf6 |
      | total                                | 250                                  |
    And I should see the invoice recipient
      | Field                                | Value                                |
      | recipient.name.firstName             | John                                 |
      | recipient.name.lastName              | Doe                                  |
      | recipient.address.street             | 123 Main St                          |
      | recipient.address.city               | Anytown                              |
      | recipient.address.postalCode         | 12345                                |
    And I should see the invoice first line
      | Field                                | Value                                |
      | lines[0].label                       | Item 1                               |
      | lines[0].quantity                    | 2                                    |
      | lines[0].unitPrice                   | 100                                  |
      | lines[0].total                       | 200                                  |
