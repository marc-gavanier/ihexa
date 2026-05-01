# Electronic Invoicing (Facturation électronique)

## Legal basis

- Loi de finances 2024
- Ordonnance 2021-1190
- Article 289 bis du CGI

## Timeline

| Date            | Obligation                       | Who                                     |
|-----------------|----------------------------------|-----------------------------------------|
| **1 Sept 2026** | Receive e-invoices (e-invoicing) | All companies                           |
| **1 Sept 2026** | Emit e-invoices + e-reporting    | Large enterprises (GE) + mid-size (ETI) |
| **1 Sept 2027** | Emit e-invoices + e-reporting    | SMEs (PME) + micro-enterprises          |

**Note**: Even micro-enterprises exempt from VAT (franchise en base) are
subject to e-invoicing and e-reporting obligations.

## Key concepts

### e-invoicing
- Structured electronic invoices exchanged between B2B parties
- Must transit through a certified platform (PDP)
- Replaces paper and simple PDF invoices

### e-reporting
- Transmission of transaction data to the tax authority
- Required for transactions NOT covered by e-invoicing:
  - B2C transactions
  - International transactions (export, intra-EU)
  - Transactions with non-established entities
- Purpose: tax authority pre-fills VAT declarations

### Chorus Pro
- Public sector platform for B2G (Business-to-Government) invoicing
- **Remains mandatory** for all invoices to public entities
- Already in use since 2017-2020
- Will coexist with the new PDP system for B2B

## Platforms

### PDP (Plateforme de Dématérialisation Partenaire)
- Certified private platforms for B2B e-invoicing
- Each company must choose its PDP (or use PPF)
- PDP responsibilities:
  - Emit and receive invoices in compliant formats
  - Transmit invoice data to the tax authority
  - Handle format conversion between platforms
  - Ensure archival and integrity

### PPF (Portail Public de Facturation)
- Public platform operated by the State
- Free alternative to PDP
- Basic functionality, may not cover all business needs

## Accepted formats

### Factur-X (hybrid)
- PDF/A-3 document + embedded XML data
- Human-readable (PDF) + machine-processable (XML)
- Based on EN 16931 European standard
- Best for: gradual transition from paper/PDF

### UBL (Universal Business Language)
- Pure XML format
- ISO/IEC 19845 standard
- Widely used internationally
- Best for: high-volume automated processing

### CII (Cross-Industry Invoice)
- Pure XML format
- UN/CEFACT standard (ISO 16931)
- Used in European electronic invoicing
- Best for: cross-border EU invoicing

### Format conversion
- PDPs handle conversion automatically between formats
- Sender emits in their preferred format
- Receiver gets it in their preferred format
- Conversion happens transparently between platforms

## Technical requirements

### Structured data
An e-invoice must contain at minimum:
- All mandatory invoice fields (see 01-mandatory-fields.md)
- Structured data that can be processed automatically
- Digital signature or seal guaranteeing authenticity and integrity

### Lifecycle statuses
E-invoices go through tracked statuses:
- Deposited (déposée)
- Received (reçue)
- Approved (approuvée)
- Rejected (rejetée)
- Paid (payée)

These statuses are reported to the tax authority.
