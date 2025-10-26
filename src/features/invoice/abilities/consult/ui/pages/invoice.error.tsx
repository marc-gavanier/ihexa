import { Alert } from '@/libraries/ui/primitives/alert';

export const InvoiceError = ({ message }: { message: string }) => (
  <Alert color='alert-error' data-testid='invoice-error'>
    {message}
  </Alert>
);
