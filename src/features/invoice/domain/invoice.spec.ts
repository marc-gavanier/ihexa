import { runPromise } from 'effect/Effect';
import { describe, expect, it } from 'vitest';
import { Amount } from './amount';
import { Invoice } from './invoice';
import { InvoiceId } from './invoice-id';
import { Line, LineLabel } from './line';
import { Quantity } from './quantity';
import { Address, City, FirstName, LastName, Name, PostalCode, Recipient, Street } from './recipient';

describe('invoice domain model', () => {
  it('computes total from its lines', async () => {
    const invoice: Invoice = await runPromise(
      Invoice(
        InvoiceId('b06f2a21-d137-4557-80e1-6e6d44669cf6'),
        [Line(LineLabel('Item 1'), Quantity(1), Amount(550_00)), Line(LineLabel('Item 2'), Quantity(2), Amount(1_100_00))],
        Recipient(
          Name(FirstName('John'), LastName('Doe')),
          Address(Street('123 Main St'), City('Anytown'), PostalCode('12345'))
        )
      )
    );

    expect(invoice.total).toBe(2_750_00);
  });
});
