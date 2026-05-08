# Feature: Configure Payment Terms

## Rule: A seller can configure default payment terms

### Scenario: Save a complete payment terms configuration

* When I save the payment terms configuration with
  | Field                   | Value                       |
  | deadline starting point | from invoice date           |
  | deadline days           | 30                          |
  | end of month            | no                          |
  | penalty rate            | 15                          |
  | early payment discount  | no discount                 |
  | payment methods         | bank transfer               |
  | iban                    | FR7630006000011234567890189 |
* Then the payment terms configuration should be saved successfully

### Scenario: Save payment terms with early payment discount

* When I save the payment terms configuration with
  | Field                    | Value                       |
  | deadline starting point  | from invoice date           |
  | deadline days            | 30                          |
  | end of month             | no                          |
  | penalty rate             | 12                          |
  | early payment discount   | with discount               |
  | discount rate            | 2                           |
  | discount delay threshold | 10                          |
  | payment methods          | bank transfer               |
  | iban                     | FR7630006000011234567890189 |
* Then the payment terms configuration should be saved successfully

### Scenario: Save payment terms with end of month

* When I save the payment terms configuration with
  | Field                   | Value                       |
  | deadline starting point | from invoice date           |
  | deadline days           | 45                          |
  | end of month            | yes                         |
  | penalty rate            | 15                          |
  | early payment discount  | no discount                 |
  | payment methods         | bank transfer               |
  | iban                    | FR7630006000011234567890189 |
* Then the payment terms configuration should be saved successfully

### Scenario: Save payment terms with multiple payment methods

* When I save the payment terms configuration with
  | Field                   | Value                                            |
  | deadline starting point | from invoice date                                |
  | deadline days           | 30                                               |
  | end of month            | no                                               |
  | penalty rate            | 15                                               |
  | early payment discount  | no discount                                      |
  | payment methods         | bank transfer, check, direct debit, credit card  |
  | iban                    | FR7630006000011234567890189                      |
* Then the payment terms configuration should be saved successfully

## Rule: Upon receipt means immediate payment

### Scenario: Upon receipt normalizes days to 0

* When I save the payment terms configuration with
  | Field                   | Value                       |
  | deadline starting point | upon receipt                |
  | deadline days           | 15                          |
  | penalty rate            | 15                          |
  | early payment discount  | no discount                 |
  | payment methods         | bank transfer               |
  | iban                    | FR7630006000011234567890189 |
* Then the payment terms configuration should be saved successfully
* And the deadline days should be 0

### Scenario: Upon receipt with end of month is rejected

* When I save the payment terms configuration with
  | Field                   | Value                       |
  | deadline starting point | upon receipt                |
  | end of month            | yes                         |
  | penalty rate            | 15                          |
  | early payment discount  | no discount                 |
  | payment methods         | bank transfer               |
  | iban                    | FR7630006000011234567890189 |
* Then the payment terms configuration should not be saved

## Rule: The penalty rate is not validated against the legal floor at configuration time

### Scenario: Penalty rate below legal floor is stored as-is

* When I save the payment terms configuration with
  | Field                   | Value                       |
  | deadline starting point | from invoice date           |
  | deadline days           | 30                          |
  | end of month            | no                          |
  | penalty rate            | 1                           |
  | early payment discount  | no discount                 |
  | payment methods         | bank transfer               |
  | iban                    | FR7630006000011234567890189 |
* Then the payment terms configuration should be saved successfully
* And the penalty rate should be 1

## Rule: Early payment discount must be explicitly configured

### Scenario: Early payment discount not configured is rejected

* When I save the payment terms configuration without specifying early payment discount
* Then the payment terms configuration should not be saved

## Rule: Bank transfer requires an IBAN

### Scenario: Bank transfer without IBAN is rejected

* When I save the payment terms configuration with
  | Field                   | Value             |
  | deadline starting point | from invoice date |
  | deadline days           | 30                |
  | end of month            | no                |
  | penalty rate            | 15                |
  | early payment discount  | no discount       |
  | payment methods         | bank transfer     |
* Then the payment terms configuration should not be saved

## Rule: Payment terms can be updated

### Scenario: Update an existing payment terms configuration

* Given payment terms are configured with a penalty rate of 15
* When I update the penalty rate to 12
* And I save the payment terms configuration
* Then the penalty rate should be 12

## Rule: Payment terms may not be configured yet

### Scenario: Payment terms configuration is unavailable when not configured

* Given there are no payment terms configured
* When I attempt to retrieve the payment terms configuration
* Then the payment terms configuration should be unavailable

---

## Domain constraints

### PaymentDeadline

- starting point: "upon receipt" | "from invoice date"
- days: integer >= 0
- max 60 days from invoice date (without end of month)
- max 45 days with end of month
- 0 days + end of month is valid (= end of current month)

### PenaltyRate

- must be strictly positive (> 0)
- stored as annual percentage (no upper bound)

### EarlyPaymentDiscount

- discriminated union: "no discount" | "with discount"
- "with discount" requires:
  - discount rate > 0
  - discount delay threshold > 0 (in days)

### PaymentMethods

- at least one required
- valid values: bank transfer, check, direct debit, credit card

### Iban

- international format: 2 letters country code + 2 check digits + BBAN
- must pass modulo 97 checksum validation
- required when payment methods include bank transfer

---

## Presentation rules

- "No discount for early payment" is shown when early payment discount is "no discount"
- Recovery fee of 40 EUR is always displayed (B2B only, non-configurable)
