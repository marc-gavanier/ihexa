import type { City, PostalCode, Street } from '@/features/invoice/domain/recipient';

export const InvoiceRecipientAddress = ({
  street,
  city,
  postalCode
}: {
  street: Street;
  city: City;
  postalCode: PostalCode;
}) => {
  return (
    <div>
      <div data-testid='invoice-recipient.address.street'>{street}</div>
      <div>
        <span data-testid='invoice-recipient.address.city'>{city}</span>{' '}
        <span data-testid='invoice-recipient.address.postalCode'>{postalCode}</span>
      </div>
    </div>
  );
};
