# Mandatory Invoice Fields (Mentions obligatoires)

## Legal basis

- Code de commerce: Article L441-9
- Code général des impôts (CGI): Article 242 nonies A, annexe II
- Sanctions: 15 EUR per missing/incorrect field, capped at 25% of invoice amount

## Required fields — all invoices

### Identification
- **Invoice number**: unique, sequential, chronological, no gaps
- **Invoice date**: date of issue
- **Seller identity**: name/company name, legal form, address, SIREN/SIRET, RCS registration, share capital (if applicable)
- **Buyer identity**: name/company name, address
- **Buyer SIREN**: mandatory for B2B — **new Sept 2026**
- **Billing address**: if different from buyer registered address
- **Delivery address**: if different from buyer address — **new Sept 2026**

### Transaction details
- **Description**: clear designation of goods/services sold
- **Quantity**: number of units
- **Unit price**: excluding tax (HT)
- **Nature of operations**: goods delivery / service provision / both — **new Sept 2026**

### Amounts
- **Total excl. tax** (HT): per VAT rate
- **VAT rate(s)**: applicable rate(s) with breakdown
- **VAT amount(s)**: per rate
- **Total incl. tax** (TTC): grand total

### Payment
- **Payment due date**: specific date, not just "upon receipt"
- **Payment method**: bank transfer, check, etc. (recommended)
- **Early payment discount**: conditions or explicit mention "none" (Néant)
- **Late payment penalty rate**: minimum 3x legal interest rate
- **Fixed recovery fee**: 40 EUR (indemnité forfaitaire de recouvrement)

### Conditional fields
- **Purchase order number**: when buyer issued a PO
- **"Option pour le paiement de la taxe d'après les débits"**: if seller opted for this regime — **new Sept 2026**

## VAT exemption mentions

When VAT does not apply, the invoice must display the reason:
- Franchise en base: "TVA non applicable — article 293 B du CGI"
- Intra-EU reverse charge: "Autoliquidation — article 283-2 du CGI"
- Export: "Exonération de TVA — article 262 du CGI"

## Sept 2026 new fields summary

| Field                | Reason                       | Legal reference      |
|----------------------|------------------------------|----------------------|
| Buyer SIREN          | Tax authority cross-checking | Loi de finances 2024 |
| Delivery address     | Supply chain traceability    | Loi de finances 2024 |
| Nature of operations | VAT reporting accuracy       | Loi de finances 2024 |
| Tax debit option     | Payment regime transparency  | Loi de finances 2024 |
