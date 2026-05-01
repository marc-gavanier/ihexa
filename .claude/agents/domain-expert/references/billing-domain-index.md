# Billing Domain — Index

This document maps all aspects of the French billing/invoicing domain
relevant to this project. Each section identifies the topic, key rules,
and legal references. Detailed content can be added in separate files
as the domain grows.

## 1. Mandatory Invoice Fields (Mentions obligatoires)

**Legal basis**: Article L441-9 du Code de commerce

Required fields on every invoice:
- Invoice number (sequential, no gaps, per fiscal year)
- Invoice date
- Seller identity (name, address, SIREN/SIRET, RCS, legal form, share capital)
- Buyer identity (name, address, SIREN if B2B)
- Billing address (if different from buyer address)
- Delivery address (if different from buyer address) — **new Sept 2026**
- Description of goods/services sold
- Quantity and unit price (excl. tax)
- VAT rate(s) and amounts
- Total excl. tax, VAT, incl. tax
- Payment due date
- Early payment discount conditions (or "none")
- Late payment penalty rate
- Fixed recovery fee (indemnité forfaitaire de recouvrement): 40 EUR
- Purchase order number (if applicable)
- Nature of operations (goods / services / both) — **new Sept 2026**
- Buyer SIREN number — **new Sept 2026**
- "Option pour le paiement de la taxe d'après les débits" — **new Sept 2026** (if applicable)

**Source**: [Service Public — Mentions obligatoires](https://entreprendre.service-public.gouv.fr/vosdroits/F31808)

## 2. Invoice Numbering

- Must be sequential and chronological
- No gaps allowed (continuity requirement)
- Can be reset per fiscal year (with year prefix, e.g., 2026-001)
- Each invoice number must be unique
- Credit notes (avoirs) follow a separate numbering sequence

## 3. Document Types (Types de documents)

| Document                                     | Legal value             | Purpose                                          |
|----------------------------------------------|-------------------------|--------------------------------------------------|
| **Devis** (Quote)                            | Contractual when signed | Formal offer, binds both parties once signed     |
| **Bon de commande** (Purchase order)         | Contractual             | Confirms order, authorizes purchase              |
| **Facture proforma** (Pro-forma invoice)     | None (informational)    | Preview, customs, banking formalities            |
| **Facture d'acompte** (Down payment invoice) | Fiscal                  | Partial payment before delivery/completion       |
| **Facture** (Invoice)                        | Fiscal + contractual    | Final billing document                           |
| **Facture de solde** (Final invoice)         | Fiscal                  | Remaining balance after down payments            |
| **Avoir** (Credit note)                      | Fiscal                  | Corrects, cancels, or refunds a previous invoice |

**Key rule**: An issued invoice cannot be modified or deleted. Corrections
are made via credit notes (avoirs). This is the **inalterability** principle.

## 4. VAT (TVA)

### Standard rates (France mainland)
- 20% — standard rate (most goods and services)
- 10% — intermediate (restaurants, transport, renovation)
- 5.5% — reduced (food, books, energy)
- 2.1% — super-reduced (press, medications)

### Franchise en base (VAT exemption for micro-entrepreneurs)
- Threshold: 37,500 EUR (services) / 85,000 EUR (goods)
- Increased threshold: 41,250 EUR / 93,500 EUR
- Must display: "TVA non applicable — article 293 B du CGI"
- VAT becomes applicable immediately if increased threshold is crossed

### Reverse-charge (Autoliquidation)
- Applies to intra-EU B2B transactions
- Must display: "Autoliquidation — article 283-2 du CGI"

**Source**: [Service Public — TVA auto-entrepreneur](https://www.portail-autoentrepreneur.fr/academie/statut-auto-entrepreneur/tva)

## 5. Payment Terms (Délais de paiement)

**Legal basis**: Article L441-10 du Code de commerce

- Default: 30 days from goods receipt or service completion
- Maximum: 60 days from invoice date, OR 45 days end-of-month
- Must be specified on the invoice and in general terms of sale (CGV)

### Late payment penalties
- Minimum rate: 3x the legal interest rate (currently ~7.86%)
- Recommended rate: ECB rate + 10 points
- Apply automatically from the day after the due date
- No formal notice required

### Fixed recovery fee
- 40 EUR per unpaid invoice (not per day)
- Applied once per late invoice
- Additional recovery costs can be claimed if they exceed 40 EUR

**Sanctions**: Up to 75,000 EUR (individual) / 2,000,000 EUR (company) per violation.

**Source**: [economie.gouv.fr — Délais de paiement](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/delais-de-paiement-les-regles-connaitre)

## 6. Electronic Invoicing (Facturation électronique)

**Legal basis**: Loi de finances 2024, Ordonnance 2021-1190

### Timeline
| Date            | Obligation                    | Who                      |
|-----------------|-------------------------------|--------------------------|
| **1 Sept 2026** | Receive e-invoices            | All companies            |
| **1 Sept 2026** | Emit e-invoices + e-reporting | Large enterprises + ETI  |
| **1 Sept 2027** | Emit e-invoices + e-reporting | SMEs + micro-enterprises |

### Key concepts
- **e-invoicing**: Structured electronic invoices (Factur-X, UBL, CII) exchanged via certified platforms (PDP)
- **e-reporting**: Transmission of transaction data to the tax authority for B2C and international transactions
- **Chorus Pro**: Public sector platform, remains mandatory for B2G invoicing
- **PDP (Plateforme de Dématérialisation Partenaire)**: Certified private platforms for B2B e-invoicing

### Accepted formats
- Factur-X (hybrid PDF + XML)
- UBL (Universal Business Language)
- CII (Cross-Industry Invoice)

**Source**: [economie.gouv.fr — Facturation électronique](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises)

## 7. Client Management

### Required client data
- Company name or individual name
- Legal form (SARL, SAS, EI, etc.)
- SIREN / SIRET number
- VAT intracommunity number (for EU B2B)
- Address (registered office)
- Billing address (if different)
- Delivery address (if different)

### Contact information (operational, not legally required on invoices)
- Contact name
- Email
- Phone

## 8. Glossary

| Term           | French                                | Definition                                        |
|----------------|---------------------------------------|---------------------------------------------------|
| Invoice        | Facture                               | Legal billing document for a transaction          |
| Credit note    | Avoir                                 | Document correcting or cancelling an invoice      |
| Quote          | Devis                                 | Formal offer, contractual when signed             |
| Down payment   | Acompte                               | Partial payment before completion                 |
| Purchase order | Bon de commande                       | Buyer's formal order confirmation                 |
| Pro-forma      | Facture proforma                      | Informational preview, no legal value             |
| VAT            | TVA (Taxe sur la Valeur Ajoutée)      | Consumption tax                                   |
| VAT exemption  | Franchise en base                     | Exemption for small businesses under threshold    |
| Reverse charge | Autoliquidation                       | Buyer accounts for VAT (intra-EU B2B)             |
| Late penalty   | Pénalité de retard                    | Interest charged on overdue payments              |
| Recovery fee   | Indemnité forfaitaire de recouvrement | Fixed 40 EUR fee per late invoice                 |
| Tax incl.      | TTC (Toutes Taxes Comprises)          | Price including VAT                               |
| Tax excl.      | HT (Hors Taxes)                       | Price excluding VAT                               |
| Fiscal year    | Exercice comptable                    | Accounting period (usually 12 months)             |
| General terms  | CGV (Conditions Générales de Vente)   | Seller's standard terms                           |
| Inalterability | Inaltérabilité                        | Principle that issued invoices cannot be modified |

## Detailed reference files

| #  | File                       | Topic                                                         |
|----|----------------------------|---------------------------------------------------------------|
| 01 | 01-mandatory-fields.md     | All required invoice fields + Sept 2026 additions             |
| 02 | 02-numbering.md            | Sequential numbering rules, formats, credit note sequences    |
| 03 | 03-document-types.md       | Devis, BC, proforma, acompte, facture, avoir + lifecycle      |
| 04 | 04-vat.md                  | Rates (métropole, Corse, DOM), franchise, reverse charge      |
| 05 | 05-payment-terms.md        | Deadlines, penalties, 40 EUR fee, dunning/recovery process    |
| 06 | 06-electronic-invoicing.md | E-invoicing timeline 2026-2027, PDP, formats                  |
| 07 | 07-archival.md             | Conservation 10 years, integrity, NF Z42-026, sanctions       |
| 08 | 08-client-data.md          | Required/operational client data, SIREN validation, GDPR      |
| 09 | 09-accounting.md           | Journal entries, PCG accounts, down payments, credit notes    |
| 10 | 10-multi-currency.md       | Foreign currency rules, exchange rates, accounting treatment  |
| 11 | 11-international.md        | Intra-EU, export, DES/EMEBI, reverse charge, OSS              |
| 12 | 12-recurring.md            | Subscriptions, tacit renewal, Loi Chatel, revenue recognition |

## Topics not yet covered

- [ ] Specific industry rules (construction, real estate, etc.)
- [ ] Credit insurance (assurance-crédit)
- [ ] Factoring (affacturage)
