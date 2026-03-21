import { Either, Schema } from 'effect';
import { Invoice, type InvoiceById, InvoiceId, InvoiceNotFound } from '@/features/invoice/domain';

const INVOICES = new Map<InvoiceId, Invoice>([
  [
    Schema.decodeSync(InvoiceId)('550e8400-e29b-41d4-a716-446655440000'),
    Schema.decodeSync(Invoice)({
      id: '550e8400-e29b-41d4-a716-446655440000',
      recipient: {
        name: {
          firstname: 'Jean',
          lastname: 'Dupont'
        },
        address: {
          street: '123 Rue de la Paix',
          city: 'Paris',
          zipcode: '75001'
        }
      },
      lines: [
        { label: 'Prestation de conseil', quantity: 2, amount: 150 },
        { label: 'Développement logiciel', quantity: 1, amount: 500 }
      ]
    })
  ]
]);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const invoiceById: InvoiceById = async (invoiceId) => {
  await delay(200);
  return Either.fromNullable(INVOICES.get(invoiceId), () => new InvoiceNotFound({ invoiceId }));
};
