# Client Data Requirements (Données client)

## Legally required on invoices

### B2B clients (professional buyers)
- **Company name** (raison sociale / dénomination sociale)
- **Legal form** (SARL, SAS, SA, EI, EIRL, SCI, etc.)
- **Registered office address** (siège social)
- **SIREN number** (9 digits) — **mandatory on invoice from Sept 2026**
- **SIRET number** (14 digits) — recommended for precision
- **Intra-EU VAT number** (FR + 11 digits) — required for intra-EU transactions
- **Billing address** (if different from registered office)
- **Delivery address** (if different from billing address) — **mandatory on invoice from Sept 2026**

### B2C clients (individual buyers)
- **Name** (nom et prénom)
- **Address** — required for invoices above certain thresholds or upon request
- No SIREN/SIRET (individuals don't have one)

## Operational data (not legally required on invoices but useful)

### Contact information
- Contact person name
- Email address
- Phone number
- Mobile number

### Payment information
- Bank details (IBAN/BIC) — for payment by transfer
- Preferred payment method
- Payment terms agreed (if different from standard CGV)
- Credit limit (if applicable)

### Business information
- Activity sector / NAF code
- Client category (prospect, active, inactive)
- Account manager / commercial contact
- Special pricing agreements
- Tax regime (normal, franchise en base, etc.)

## Data validation rules

### SIREN / SIRET
- SIREN: exactly 9 digits
- SIRET: exactly 14 digits (SIREN + NIC of 5 digits)
- Validation: Luhn algorithm on the last digit
- Can be verified on: https://annuaire-entreprises.data.gouv.fr/

### Intra-EU VAT number
- Format: FR + 2-digit key + 9-digit SIREN
- Key calculation: (12 + 3 × (SIREN mod 97)) mod 97
- Can be verified on: https://ec.europa.eu/taxation_customs/vies/

### Address
- Street number + street name
- Postal code (5 digits in France)
- City name
- Country (for international clients)

## GDPR considerations

Client data constitutes personal data (for individual clients and
contact persons). Processing must comply with RGPD:
- **Legal basis**: contractual necessity (Article 6.1.b RGPD)
- **Retention**: as long as the commercial relationship is active,
  then 3 years after last interaction for prospecting purposes
- **Archival**: invoices containing personal data follow the 10-year
  fiscal retention rule (legal obligation overrides shorter RGPD periods)
- **Right of access/rectification**: clients can request access to
  and correction of their data
- **Right to erasure**: limited by fiscal archival obligations
