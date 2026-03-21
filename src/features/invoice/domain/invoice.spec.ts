import { Schema } from 'effect';
import { describe, expect, it } from 'vitest';
import { Invoice, invoiceTotal } from './invoice';

describe('invoiceTotal', () => {
  it('should compute the total of all lines', () => {
    const invoice = Schema.decodeSync(Invoice)({
      id: '550e8400-e29b-41d4-a716-446655440000',
      recipient: {
        name: { firstname: 'Jean', lastname: 'Dupont' },
        address: { street: '123 Rue de la Paix', city: 'Paris', zipcode: '75001' }
      },
      lines: [
        { label: 'Article A', quantity: 1, amount: 550 },
        { label: 'Article B', quantity: 2, amount: 1_100 }
      ]
    });

    expect(invoiceTotal(invoice)).toBe(2_750);
  });
});
