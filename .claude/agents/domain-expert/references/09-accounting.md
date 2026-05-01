# Accounting Integration (Intégration comptable)

## Legal basis

- Plan Comptable Général (PCG) 2024
- Code de commerce: Articles L123-12 to L123-28

## Key accounts for invoicing

### Sales (revenue)

| Account | Name | Usage |
|---|---|---|
| **411** | Clients | Debited for total TTC of issued invoices (trade receivable) |
| **701** | Ventes de produits finis | Products manufactured/transformed by the company |
| **706** | Prestations de services | Service revenue |
| **707** | Ventes de marchandises | Goods bought and resold as-is |
| **709** | Remises, rabais, ristournes | Discounts granted |
| **44571** | TVA collectée | VAT collected on sales |

### Purchases (expenses)

| Account | Name | Usage |
|---|---|---|
| **401** | Fournisseurs | Credited for total TTC of received invoices (trade payable) |
| **601** | Achats de matières premières | Raw materials |
| **607** | Achats de marchandises | Goods for resale |
| **44566** | TVA déductible sur ABS | Deductible VAT on goods and services |

### Down payments

| Account | Name | Usage |
|---|---|---|
| **4191** | Clients — avances et acomptes reçus | Down payments received from clients |
| **4091** | Fournisseurs — avances et acomptes versés | Down payments paid to suppliers |

### Credit notes

| Account | Name | Usage |
|---|---|---|
| **709** | Remises, rabais, ristournes | Credit notes reducing revenue |
| **411** | Clients | Credited to reduce the receivable |
| **44571** | TVA collectée | Reversed for the VAT portion |

## Journal entries — typical scenarios

### Sale invoice (facture de vente)
```
Debit  411    Clients                    1,200.00 EUR (TTC)
Credit 706    Prestations de services    1,000.00 EUR (HT)
Credit 44571  TVA collectée                200.00 EUR (20%)
```

### Down payment received
```
Step 1 — Down payment invoice:
Debit  411    Clients                      600.00 EUR (TTC)
Credit 4191   Acomptes reçus               500.00 EUR (HT)
Credit 44571  TVA collectée                100.00 EUR (20%)

Step 2 — Payment received:
Debit  512    Banque                       600.00 EUR
Credit 411    Clients                      600.00 EUR

Step 3 — Final invoice (solde):
Debit  411    Clients                      600.00 EUR (remaining TTC)
Credit 706    Prestations de services    1,000.00 EUR (total HT)
Credit 44571  TVA collectée                200.00 EUR (total TVA)
Debit  4191   Acomptes reçus               500.00 EUR (reverse down payment)
Debit  44571  TVA collectée                100.00 EUR (reverse down payment VAT)
```

### Credit note (avoir)
```
Debit  706    Prestations de services      500.00 EUR (HT credit)
Debit  44571  TVA collectée                100.00 EUR (VAT reversal)
Credit 411    Clients                      600.00 EUR (TTC reduction)
```

### Client payment
```
Debit  512    Banque                     1,200.00 EUR
Credit 411    Clients                    1,200.00 EUR
```

### Late payment penalty invoiced
```
Debit  411    Clients                       99.86 EUR
Credit 7631   Revenus des créances comm.    99.86 EUR
```

## Accounting journals

| Journal | Code | Purpose |
|---|---|---|
| Journal des ventes | VE | All sales invoices and credit notes |
| Journal des achats | AC | All purchase invoices |
| Journal de banque | BQ | Bank transactions (payments, receipts) |
| Journal de caisse | CA | Cash transactions |
| Journal des OD | OD | Miscellaneous operations (year-end adjustments) |

## Fiscal year close considerations

- All invoices for the period must be recorded
- Revenue recognition: services completed vs. goods delivered
- Provisions for doubtful debts (account 491)
- VAT declarations must reconcile with accounting
- Exchange differences on foreign currency invoices (see 10-multi-currency.md)
