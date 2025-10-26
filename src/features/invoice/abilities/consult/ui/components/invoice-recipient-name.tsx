import type { FirstName, LastName } from '@/features/invoice/domain/recipient';

export const InvoiceRecipientName = ({ firstName, lastName }: { firstName: FirstName; lastName: LastName }) => (
  <div data-testid='invoice-recipient.name'>
    {firstName} {lastName}
  </div>
);
