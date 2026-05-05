# Feature: Configure Seller

## Scenario: Search for a company by SIRET

* Given there is no seller configured
* When I search for a company with SIRET "44306184100047"
* Then the results should include a company named "GOOGLE FRANCE"
* And the results should include full company data
  | Field               | Value            |
  | company name        | GOOGLE FRANCE    |
  | legal form          | SAS              |
  | SIREN               | 443061841        |
  | SIRET               | 44306184100047   |
  | registered address  | 8 Rue de Londres |
  | zipcode             | 75009            |
  | city                | Paris            |

## Scenario: Search for a company by name

* Given there is no seller configured
* When I search for a company with name "Google France"
* Then the results should include a company named "GOOGLE FRANCE"

## Scenario: Save a complete seller configuration with normal VAT regime

* Given I have selected company "ACME SARL" with legal form "SARL"
* When I save the seller configuration with
  | Field            | Value                 |
  | VAT regime       | normal                |
  | tax debit option | no                    |
  | email            | contact@acme.fr       |
* Then the seller configuration should be saved successfully

## Scenario: Save a complete seller configuration with franchise en base

* Given I have selected company "DUPONT EI" with legal form "EI"
* When I save the seller configuration with
  | Field      | Value              |
  | VAT regime | franchise en base  |
  | email      | dupont@email.fr    |
* Then the seller configuration should be saved successfully
* And the seller should have no intra-EU VAT number
* And the seller should have no tax debit option

## Scenario: Saving without VAT regime is rejected

* Given I have selected company "ACME SARL" with legal form "SARL"
* When I save the seller configuration without a VAT regime
* Then the seller configuration should not be saved

## Scenario: Saving without email is rejected

* Given I have selected company "ACME SARL" with legal form "SARL"
* When I save the seller configuration without an email
* Then the seller configuration should not be saved

## Scenario: Share capital is not required for EI

* Given I have selected company "DUPONT EI" with legal form "EI"
* When I save the seller configuration with
  | Field      | Value             |
  | VAT regime | franchise en base |
  | email      | dupont@email.fr   |
* Then the seller configuration should be saved successfully

## Scenario: Company not found

* When I search for a company with name "ZZZZNONEXISTENT999"
* Then no companies should be found

## Scenario: Update an existing seller configuration

* Given a seller is configured with email "old@acme.fr"
* When I update the seller email to "new@acme.fr"
* And I save the seller configuration
* Then the seller configuration should have email "new@acme.fr"

## Scenario: Switching from normal to franchise en base clears VAT-specific data

* Given a seller is configured with VAT regime "normal" and tax debit option "yes"
* When I change the VAT regime to "franchise en base"
* And I save the seller configuration
* Then the seller should have no tax debit option
* And the seller should have no intra-EU VAT number

## Scenario: Seller configuration is unavailable when not configured

* Given there is no seller configured
* When I attempt to retrieve the seller configuration
* Then the seller configuration should be unavailable

## Scenario: SIRET must be exactly 14 digits

* When I save the seller configuration with SIRET "1234"
* Then the seller configuration should not be saved

## Scenario: SIREN must be exactly 9 digits

* When I save the seller configuration with SIREN "123"
* Then the seller configuration should not be saved

## Scenario: Tax debit option is rejected when VAT regime is franchise en base

* Given I have selected company "DUPONT EI" with legal form "EI"
* When I save the seller configuration with
  | Field            | Value             |
  | VAT regime       | franchise en base |
  | tax debit option | yes               |
* Then the seller configuration should not be saved

## Scenario: Share capital is rejected for legal form EI

* Given I have selected company "DUPONT EI" with legal form "EI"
* When I save the seller configuration with
  | Field         | Value             |
  | VAT regime    | franchise en base |
  | email         | dupont@email.fr   |
  | share capital | 10000             |
* Then the seller configuration should not be saved
