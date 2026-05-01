# Document Types (Types de documents commerciaux)

## Overview

The billing lifecycle involves several document types, each with
distinct legal status and rules.

## Devis (Quote / Estimate)

- **Legal value**: contractual when signed by both parties
- **Purpose**: formal offer with detailed pricing
- **Required fields**: same as invoice + validity period
- **Binding**: once signed, binds both parties to the terms
- **Numbering**: separate sequence (e.g., DEV-2026-001)
- **Conversion**: a signed devis typically leads to an invoice

## Bon de commande (Purchase Order)

- **Legal value**: contractual
- **Purpose**: buyer's formal confirmation of an order
- **Flow**: buyer sends PO → seller accepts → delivery → invoice
- **Invoice reference**: PO number must appear on the invoice (if issued)

## Facture proforma (Pro-forma Invoice)

- **Legal value**: none (informational only)
- **Purpose**: preview of expected costs, customs formalities, banking
- **Not a fiscal document**: no accounting or tax implications
- **No numbering requirement**: but recommended for tracking
- **Common use**: international trade, bank guarantees

## Facture d'acompte (Down Payment Invoice)

- **Legal value**: fiscal document
- **Purpose**: collect partial payment before delivery/completion
- **Mandatory**: CGI Article 289 requires an invoice for every payment received
- **VAT**: since Jan 2023, VAT is due upon receipt of down payment
  (for both goods and services)
- **Required fields**: same as regular invoice + reference to the quote/order
- **Amount**: typically expressed as percentage of total or fixed amount
- **Numbering**: follows the main invoice sequence

## Facture (Invoice)

- **Legal value**: fiscal + contractual
- **Purpose**: official billing document for a completed transaction
- **Inalterability**: once issued, cannot be modified or deleted
- **All mandatory fields** from 01-mandatory-fields.md apply
- **Issuance timing**: upon delivery of goods or completion of service

## Facture de solde (Final / Balance Invoice)

- **Legal value**: fiscal
- **Purpose**: remaining balance after down payment(s)
- **Must reference**: all prior down payment invoices
- **Calculation**: total amount - sum of down payments = balance due
- **VAT**: only on the remaining amount (down payment VAT already collected)

## Avoir (Credit Note)

- **Legal value**: fiscal
- **Purpose**: correct, cancel, or refund a previous invoice
- **When to use**:
  - Error on the original invoice
  - Partial or full cancellation of a transaction
  - Commercial discount granted after invoicing
  - Returned goods
- **Required fields**:
  - Own unique number (separate sequence, e.g., AV-2026-001)
  - Reference to the original invoice (number and date)
  - Mention "Avoir" clearly visible
  - Reason for the credit note
  - Amounts (negative or clearly marked as credit)
- **Key rule**: the ONLY legal way to correct an issued invoice
  (inalterability principle — cannot edit or delete the original)

## Document lifecycle

```
Devis (signed) → Bon de commande → Facture d'acompte → Facture de solde
                                                         ↓
                                                    Avoir (if correction needed)
```

Or simplified:
```
Devis (signed) → Facture → Avoir (if needed)
```
