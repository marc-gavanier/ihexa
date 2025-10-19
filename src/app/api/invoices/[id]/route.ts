import {
  catchAll,
  catchTag,
  fail,
  flatMap,
  runPromise,
  succeed,
} from 'effect/Effect';
import { decodeUnknown } from 'effect/Schema';
import type { NextRequest } from 'next/server';
import {
  type ConsultInvoiceError,
  consultInvoice,
  consultInvoiceValidation,
} from '@/features/invoice/abilities/consult';
import { InvalidInvoiceIdError, InvoiceId } from '@/features/invoice/domain';
import { INVOICE_BY_ID } from '@/features/invoice/implementations';
import { invoiceById } from '@/features/invoice/implementations/in-memory';
import { toInvoiceTransfer } from '@/features/invoice/transfers';
import { type ResponseErrorHandler, responseErrorFor } from '@/libraries/api';
import { hasDomainError } from '@/libraries/ddd';
import { provide } from '@/libraries/injection';

const ERRORS: ResponseErrorHandler<
  ConsultInvoiceError | InvalidInvoiceIdError
> = {
  InvoiceByIdNotFoundError: {
    message: (): string => 'Invoice not found',
    status: 404,
  },
  InvalidInvoiceIdError: {
    message: (value: string): string => `Invoice id ${value} is not valid`,
    status: 400,
  },
};

export const GET = async (
  _: NextRequest,
  ctx: RouteContext<'/api/invoices/[id]'>,
) => {
  provide(INVOICE_BY_ID, invoiceById);

  const params = await ctx.params;

  const invoice = await runPromise(
    decodeUnknown(consultInvoiceValidation)(params).pipe(
      catchTag('ParseError', () => fail(InvalidInvoiceIdError(params.id))),
      flatMap(({ id }) => InvoiceId(id)),
      flatMap(consultInvoice),
      catchAll((error) => succeed(error)),
    ),
  );

  return hasDomainError(invoice)
    ? responseErrorFor(invoice)(ERRORS)
    : Response.json(toInvoiceTransfer(invoice));
};
