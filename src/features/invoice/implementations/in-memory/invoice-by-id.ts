import { pipe } from 'effect';
import { fail, flatMap, map, runPromise, sleep, succeed } from 'effect/Effect';
import { fromNullable, match } from 'effect/Option';
import {
  Amount,
  Invoice,
  type InvoiceById,
  InvoiceNotFoundError,
  Quantity,
} from '@/features/invoice/domain';
import { InvoiceId } from '@/features/invoice/domain/invoice-id';
import { Line, LineLabel } from '@/features/invoice/domain/line';
import {
  Address,
  City,
  FirstName,
  LastName,
  Name,
  PostalCode,
  Recipient,
  Street,
} from '@/features/invoice/domain/recipient';

const INVOICE = Invoice(
  InvoiceId('36916dcd-ccd1-46ef-972d-377db546014a'),
  [
    Line(LineLabel('Item 1'), Quantity(2), Amount(100_00n)),
    Line(LineLabel('Item 2'), Quantity(1), Amount(50_00n)),
  ],
  Recipient(
    Name(FirstName('John'), LastName('Doe')),
    Address(Street('123 Main St'), City('Anytown'), PostalCode('12345')),
  ),
);

const INVOICES: Map<InvoiceId, Invoice> = new Map([
  [
    await runPromise(InvoiceId('36916dcd-ccd1-46ef-972d-377db546014a')),
    await runPromise(INVOICE),
  ],
]);

const toInvoiceMatching = (id: InvoiceId) => () =>
  fromNullable(INVOICES.get(id));

export const invoiceById: InvoiceById = (id: InvoiceId): Promise<Invoice> =>
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
  );
