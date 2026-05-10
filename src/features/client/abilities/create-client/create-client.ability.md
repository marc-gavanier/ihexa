# Feature: Create Client

## Rule: A B2C client is created with formatted name and address

### Scenario: Create a B2C client with simple name

* Given I am on the client list page
* When I create a B2C client with the following data
  | Field     | Value              |
  | firstname | jean               |
  | lastname  | dupont             |
  | street    | 123 Rue de la Paix |
  | city      | Paris              |
  | zipcode   | 75001              |
* Then the client should be created with formatted data
  | Field           | Value              |
  | name.firstname  | Jean               |
  | name.lastname   | DUPONT             |
  | address.street  | 123 Rue de la Paix |
  | address.city    | Paris              |
  | address.zipcode | 75001              |

### Scenario: Create a B2C client with compound firstname

* When I create a B2C client with firstname "jean-pierre" and lastname "de la fontaine"
* Then the client firstname should be "Jean-Pierre"
* And the client lastname should be "DE LA FONTAINE"

### Scenario: Create a B2C client with optional contact info

* When I create a B2C client with the following data
  | Field     | Value              |
  | firstname | marie              |
  | lastname  | curie              |
  | street    | 5 Rue Pierre Curie |
  | city      | Paris              |
  | zipcode   | 75005              |
  | email     | Marie.Curie@lab.fr |
  | phone     | +33612345678       |
* Then the client should be created with email "marie.curie@lab.fr"
* And the client should be created with phone "+33612345678"

## Rule: A B2B client is created from a company search result

### Scenario: Create a B2B client from company search

* Given a company search for "ACME" returns the following result
  | Field               | Value            |
  | denominationSociale | ACME SARL        |
  | formeJuridique      | SARL             |
  | siret               | 44306184100047   |
  | street              | 8 Rue de Londres |
  | city                | Paris            |
  | zipcode             | 75009            |
* When I create a B2B client from this company
* Then the client should be created with the following data
  | Field                 | Value            |
  | denominationSociale   | ACME SARL        |
  | formeJuridique        | SARL             |
  | siret                 | 44306184100047   |
  | tvaIntracommunautaire | FR64443061841    |
  | address.street        | 8 Rue de Londres |
  | address.city          | Paris            |
  | address.zipcode       | 75009            |

### Scenario: Create a B2B client with optional contact info

* Given a company search for "44306184100047" returns "ACME SARL"
* When I create a B2B client from this company with
  | Field | Value           |
  | email | contact@acme.fr |
  | phone | +33145678901    |
* Then the client should be created with email "contact@acme.fr"
* And the client should be created with phone "+33145678901"

## Rule: TVA intracommunautaire is automatically computed from SIREN

### Scenario Outline: Compute TVA intracommunautaire from SIRET

* When I create a B2B client with SIRET "<siret>"
* Then the TVA intracommunautaire should be "<tva>"

#### Examples:

| siret          | tva           |
| 44306184100047 | FR64443061841 |
| 80295478500028 | FR26802954785 |

## Rule: A B2B client with the same SIRET cannot be created twice

### Scenario: Reject duplicate B2B client

* Given a B2B client already exists with SIRET "44306184100047"
* When I create a B2B client with SIRET "44306184100047"
* Then the client should not be created
* And I should be informed that a client with this SIRET already exists

## Rule: Company search returns matching results

### Scenario: Search company by name

* When I search for a company with query "Google France"
* Then the results should include a company named "GOOGLE FRANCE"

### Scenario: Search company by SIRET

* When I search for a company with query "44306184100047"
* Then the results should include a company with SIRET "44306184100047"

---

## Domain constraints

**Siret**
- Exactly 14 digits
- Required for B2B clients

**DenominationSociale**
- Non-empty string, max 400 characters, trimmed

**FormeJuridique**
- Enum: EI | EURL | SARL | SASU | SAS | SA | SNC | SCI | Association

**TvaIntracommunautaire**
- Format: FR + 2-digit zero-padded key + 9-digit SIREN
- Computed: FR${String((12 + 3 * (siren % 97)) % 97).padStart(2, '0')}${siren}
- Never user input

**Email**
- Standard email format, lowercased, trimmed
- Optional for both B2B and B2C

**Phone**
- E.164: + followed by 9 to 15 digits
- Optional for both B2B and B2C

**Firstname** (B2C)
- Non-empty, trimmed, max 100 chars
- Capitalized per segment (space/hyphen-separated), supports accents

**Lastname** (B2C)
- Non-empty, trimmed, max 100 chars
- Entirely uppercased

**Zipcode** — 5 digits (France)
**Street** — Non-empty, trimmed, max 255 chars
**City** — Non-empty, trimmed, max 255 chars

---

## Presentation rules

- "Add client" button on the client list page
- Clicking opens a modal dialog
- B2C is the default client type
- Toggle B2B/B2C adapts the form:
  - B2C: firstname, lastname, address, email, phone
  - B2B: company search combobox, then read-only fields + email, phone
- Company search combobox: min 2 chars to trigger, shows denomination + forme juridique + SIRET
- Selecting a company pre-fills read-only fields: denomination, forme juridique, SIRET, street, zipcode, city
- Always uses the company headquarters (siège social)
- TVA intra not shown in form (computed silently)
- On success: modal closes, new client appears in list
- On validation error: inline messages next to fields
- On duplicate SIRET: notification "client with this SIRET already exists"