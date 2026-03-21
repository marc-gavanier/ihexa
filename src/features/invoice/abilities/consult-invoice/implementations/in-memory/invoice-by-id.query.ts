import { Either, Schema } from 'effect';
import { Invoice, type InvoiceById, InvoiceNotFound } from '@/features/invoice/domain';

const INVOICES: Invoice[] = [
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
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const invoiceById: InvoiceById = async (id) => {
  await delay(200);
  const invoice = INVOICES.find((invoice) => invoice.id === id);
  return Either.fromNullable(invoice, () => new InvoiceNotFound({ invoiceId: id }));
};
