import type { Invoice, InvoicesRepository } from '@/features/invoice/domain';

const INVOICE = {
  id: '36916dcd-ccd1-46ef-972d-377db546014a',
  recipient: {
    name: { firstName: 'John', lastName: 'Doe' },
    address: {
      street: '123 Main St',
      city: 'Anytown',
      postalCode: '12345',
    },
  },
  lines: [
    { label: 'Item 1', unitPrice: 100, quantity: 2 },
    { label: 'Item 2', unitPrice: 50, quantity: 1 },
  ],
  total: 250,
} as Invoice;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const InMemoryInvoicesRepository: InvoicesRepository = {
  get: async (): Promise<Invoice> => {
    await wait(1000);
    return Promise.resolve(INVOICE);
  },
};
