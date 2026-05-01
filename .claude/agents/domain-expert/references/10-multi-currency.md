# Multi-Currency Invoicing (Facturation multi-devises)

## Legal basis

- PCG: Article 420-6
- CGI: Article 289
- economie.gouv.fr guidance on foreign currency invoicing

## When is multi-currency invoicing allowed?

Invoicing in a foreign currency is allowed when:
- The transaction is with a foreign client or supplier
- Both parties agree on the currency
- The currency is recognized and convertible

**Key rule**: the invoice CAN be expressed in a foreign currency, but
VAT amounts MUST always appear in euros (EUR).

## Exchange rate rules

### Which rate to use
- **ECB (European Central Bank) daily rate** on the invoice date
- Alternatively: the customs exchange rate for the month
- The rate used must be documented and traceable

### When to convert
- At the **transaction date** (invoice issuance) for accounting purposes
- At **payment date** for actual settlement (may differ)
- At **fiscal year close** for outstanding receivables/payables

## Invoice presentation

A multi-currency invoice must show:
1. **All amounts in the foreign currency** (HT, TVA, TTC)
2. **VAT amount in EUR** (mandatory, even if rest is in foreign currency)
3. **Exchange rate used** (recommended, not legally mandatory but strongly advised)
4. **EUR equivalent of the total** (recommended for clarity)

### Example
```
Subtotal (HT):      10,000.00 USD
VAT 20%:             2,000.00 USD  (EUR equivalent: 1,850.00 EUR)
Total (TTC):        12,000.00 USD

Exchange rate: 1 EUR = 1.0811 USD (ECB rate of 01/05/2026)
EUR equivalent:     11,100.82 EUR
```

## Accounting treatment

### At invoice date
Record at the ECB rate of the day:
```
Debit  411    Clients            11,100.82 EUR (12,000 USD × rate)
Credit 706    Prestations         9,250.69 EUR (10,000 USD × rate)
Credit 44571  TVA collectée       1,850.13 EUR (2,000 USD × rate)
```

### At payment date (if rate changed)
If 12,000 USD now converts to 11,200 EUR:
```
Debit  512    Banque             11,200.00 EUR (actual received)
Credit 411    Clients            11,100.82 EUR (original booking)
Credit 766    Gains de change        99.18 EUR (exchange gain)
```

If 12,000 USD now converts to 11,000 EUR:
```
Debit  512    Banque             11,000.00 EUR (actual received)
Debit  666    Pertes de change      100.82 EUR (exchange loss)
Credit 411    Clients            11,100.82 EUR (original booking)
```

### At fiscal year close (unrealized differences)
Outstanding foreign currency receivables must be revalued:
- **Unrealized gains**: credited to account **477** (not taxable yet)
- **Unrealized losses**: debited to account **476** + provision in **6865**

## VAT implications

- VAT base is calculated in EUR using the exchange rate at invoice date
- Exchange gains/losses have **no VAT impact**
- VAT declarations are always in EUR regardless of invoice currency

## Supported currencies

No legal restriction on which currency to use. Most common:
- USD (US Dollar)
- GBP (British Pound)
- CHF (Swiss Franc)
- JPY (Japanese Yen)
- CAD (Canadian Dollar)

The ECB publishes daily reference rates for ~30 currencies.
