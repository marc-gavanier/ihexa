export const InvoiceError = ({ error }: { error: unknown }) => (
  <div data-testid="invoice-error">
    {error instanceof Error ? error.message : 'Unexpected error'}
  </div>
);
