import { pipe } from 'effect';
import { fail, flatMap, map, runPromise, sleep, succeed } from 'effect/Effect';
import { fromNullable, match } from 'effect/Option';
import type {
  Invoice,
  InvoiceId,
  InvoicesRepository,
} from '@/features/invoice/domain';

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

const INVOICES: Map<InvoiceId, Invoice> = new Map([
  ['36916dcd-ccd1-46ef-972d-377db546014a' as InvoiceId, INVOICE],
]);

class InvoiceNotFoundError extends Error {
  constructor(public readonly id: InvoiceId) {
    super(`Invoice id ${id} not found`);
    this.name = 'InvoiceNotFoundError';
  }
}

const toInvoiceMatching = (id: string & { isInvoiceId: true }) => () =>
  fromNullable(INVOICES.get(id));

export const InMemoryInvoicesRepository: InvoicesRepository = {
  get: (id: InvoiceId): Promise<Invoice> =>
    runPromise(
      pipe(
        sleep(1000),
        map(toInvoiceMatching(id)),
        flatMap(
          match({
            onSome: succeed,
            onNone: () => fail(new InvoiceNotFoundError(id)),
          }),
        ),
      ),
    ),
};
