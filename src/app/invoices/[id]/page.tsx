import {
  catchAll,
  catchTag,
  fail,
  flatMap,
  runPromise,
  succeed,
} from 'effect/Effect';
import { decodeUnknown } from 'effect/Schema';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';
import {
  type ConsultInvoiceError,
  consultInvoice,
  consultInvoiceValidation,
  InvoiceError,
  InvoicePage,
} from '@/features/invoice/abilities/consult';
import { InvalidInvoiceIdError, InvoiceId } from '@/features/invoice/domain';
import { invoiceById } from '@/features/invoice/implementations/in-memory';
import { INVOICE_BY_ID } from '@/features/invoice/keys';
import {
  type ComponentErrorHandler,
  componentErrorFor,
} from '@/libraries/app-router';
import { hasDomainError } from '@/libraries/ddd';
import { INVOICES_FEATURE, loadI18n, translationsFor } from '@/libraries/i18n';
import { provide } from '@/libraries/injection';

const ERRORS: ComponentErrorHandler<
  ConsultInvoiceError | InvalidInvoiceIdError
> = {
  InvoiceByIdNotFoundError: {
    render: (): ReactNode => {
      const t = translationsFor(INVOICES_FEATURE);
      return <InvoiceError message={t('error.notFound')} />;
    },
  },
  InvalidInvoiceIdError: {
    render: (value: string): ReactNode => {
      const t = translationsFor(INVOICES_FEATURE);
      return <InvoiceError message={t('error.invalidId', { value })} />;
    },
  },
};

interface PageProps {
  params: Promise<{
    id: InvoiceId;
  }>;
}

const Page = async (props: PageProps) => {
  provide(INVOICE_BY_ID, invoiceById);
  await loadI18n(headers())(INVOICES_FEATURE);

  const params = await props.params;

  const invoice = await runPromise(
    decodeUnknown(consultInvoiceValidation)(params).pipe(
      catchTag('ParseError', () => fail(InvalidInvoiceIdError(params.id))),
      flatMap(({ id }) => InvoiceId(id)),
      flatMap(consultInvoice),
      catchAll((error) => succeed(error)),
    ),
  );

  return hasDomainError(invoice) ? (
    componentErrorFor(invoice)(ERRORS)
  ) : (
    <InvoicePage invoice={invoice} />
  );
};

export default Page;
