import { pipe } from 'effect';
import { type Effect, fail, flatMap, runPromise, sleep, succeed } from 'effect/Effect';
import { fromNullable, match } from 'effect/Option';
import {
  Amount,
  Invoice,
  type InvoiceById,
  type InvoiceByIdError,
  InvoiceByIdNotFoundError,
  Quantity
} from '@/features/invoice/domain';
import { InvoiceId } from '@/features/invoice/domain/invoice-id';
import { Line, LineLabel } from '@/features/invoice/domain/line';
import { Address, City, FirstName, LastName, Name, PostalCode, Recipient, Street } from '@/features/invoice/domain/recipient';

const INVOICE = Invoice(
  InvoiceId('b06f2a21-d137-4557-80e1-6e6d44669cf6'),
  [Line(LineLabel('Item 1'), Quantity(2), Amount(100_00)), Line(LineLabel('Item 2'), Quantity(1), Amount(50_00))],
  Recipient(Name(FirstName('John'), LastName('Doe')), Address(Street('123 Main St'), City('Anytown'), PostalCode('12345')))
);

const INVOICES: Map<InvoiceId, Invoice> = new Map([
  [await runPromise(InvoiceId('b06f2a21-d137-4557-80e1-6e6d44669cf6')), await runPromise(INVOICE)]
]);

export const invoiceById: InvoiceById = (id: InvoiceId): Effect<Invoice, InvoiceByIdError> =>
  pipe(
    sleep(1000),
    flatMap(() =>
      pipe(
        fromNullable(INVOICES.get(id)),
        match({
          onSome: succeed,
          onNone: () => fail(InvoiceByIdNotFoundError())
        })
      )
    )
  );
