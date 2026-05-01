# Recurring Invoices and Subscriptions (Facturation récurrente et abonnements)

## Legal basis

- Code de la consommation: Articles L215-1 to L215-5 (tacit renewal)
- Code de la consommation: Articles L221-18 to L221-28 (withdrawal right)
- Loi Chatel (2005): information obligation before renewal
- Loi Hamon (2014): simplified termination for consumers

## Types of recurring billing

### Subscription (abonnement)
- Fixed periodic amount for ongoing access to a service
- Duration: fixed-term or open-ended
- Examples: SaaS, maintenance contracts, hosting

### Retainer (forfait récurrent)
- Agreed periodic amount for a defined scope of work
- May include usage-based overage billing
- Examples: accounting services, consulting packages

### Usage-based (facturation à l'usage)
- Variable amount based on actual consumption
- Periodic invoice summarizing usage for the period
- Examples: cloud compute, API calls, metered utilities

## Invoice requirements for recurring billing

Each periodic invoice must include:
- **All standard mandatory fields** (see 01-mandatory-fields.md)
- **Billing period**: start and end dates of the period covered
- **Subscription reference**: contract or subscription number
- **Unit prices**: even if the total is a flat fee
- **Recurring amount**: clearly identified as recurring

### Numbering
- Each periodic invoice gets its own unique number
- Follows the same sequential rules as regular invoices
- Cannot reuse or reference a previous invoice number

## Contract obligations (B2C)

### Before contract signing
- Clear description of the service
- Price and payment terms
- Duration and renewal conditions
- Termination conditions and any early termination fees

### Tacit renewal (reconduction tacite)
- **Loi Chatel obligation**: the seller must inform the consumer of their
  right not to renew, between **3 months and 1 month** before the
  deadline to terminate
- If the seller fails to inform: the consumer can terminate at any
  time after renewal, effective immediately
- **Written notification**: must be sent in a prominent and clear manner

### Right of withdrawal (droit de rétractation)
- **14 calendar days** from contract signing for distance/online contracts
- Does not apply to B2B contracts
- Does not apply to services already fully performed with consumer consent

### Online termination (résiliation en ligne)
- Since 2023: if a contract was signed online, it must be possible
  to terminate it online (parallel forms principle)
- Dedicated termination button must be accessible

## Contract obligations (B2B)

- Governed by contract law (Code civil) and CGV
- No Loi Chatel protection (B2B)
- No 14-day withdrawal right
- Termination conditions as per contract
- Minimum notice period as agreed between parties

## Revenue recognition

### Accounting treatment
- Revenue recognized over the service period, not at invoice date
- If billed in advance: use account **4872** (produits constatés d'avance)
- If billed in arrears: use account **4181** (clients — factures à établir)

### Example — Annual subscription billed Jan 1, fiscal year = calendar year
```
Jan 1 — Invoice issued (12 months of service):
Debit  411    Clients              12,000.00 EUR
Credit 706    Prestations           1,000.00 EUR (Jan portion)
Credit 4872   Produits constatés   11,000.00 EUR (Feb-Dec deferred)
Credit 44571  TVA collectée         2,400.00 EUR (full VAT due at billing)

Monthly (Feb through Dec):
Debit  4872   Produits constatés    1,000.00 EUR
Credit 706    Prestations           1,000.00 EUR
```

## VAT on recurring invoices

- VAT is due at the **invoice date** (for goods) or **payment date**
  (for services, unless opted for "TVA d'après les débits")
- For advance billing: VAT on the full amount at invoice date if the
  seller opted for "débits"; otherwise at each payment
- Down payment rules apply if partial payment is received before service

## Dunning for recurring invoices

Same rules as standard invoicing (see 05-payment-terms.md), plus:
- Subscription can be suspended after formal notice for non-payment
- Suspension conditions must be specified in the contract/CGV
- Service cannot be cut without prior notice (typically 15-30 days)
