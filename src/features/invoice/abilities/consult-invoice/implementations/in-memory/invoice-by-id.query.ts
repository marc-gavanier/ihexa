import { Either } from 'effect';
import { Invoice, type InvoiceById, InvoiceId, InvoiceNotFound } from '@/features/invoice/domain';

const ID = '550e8400-e29b-41d4-a716-446655440000';

const RECIPIENT = {
  name: {
    firstname: 'Jean',
    lastname: 'Dupont'
  },
  address: {
    street: '123 Rue de la Paix',
    city: 'Paris',
    zipcode: '75001'
  }
} as const;

const LINES = [
  { label: 'Prestation de conseil', quantity: 2, amount: 150 },
  { label: 'Développement logiciel', quantity: 1, amount: 500 }
] as const;

const INVOICES = new Map<InvoiceId, Invoice>([[InvoiceId(ID), Invoice({ id: ID, recipient: RECIPIENT, lines: LINES })]]);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const invoiceById: InvoiceById = async (invoiceId) => {
  await delay(200);
  return Either.fromNullable(INVOICES.get(invoiceId), () => new InvoiceNotFound({ invoiceId }));
};
