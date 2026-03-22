import type { Recipient } from '@/features/invoice/domain';
import { Card, CardBody, CardTitle } from '@/libraries/ui/primitives/card';

type InvoiceRecipientProps = {
  recipient: Recipient;
};

export const InvoiceRecipient = ({ recipient: { name, address } }: InvoiceRecipientProps) => (
  <Card kind='card-border' className='w-fit'>
    <CardBody className='gap-1'>
      <CardTitle className='text-lg'>
        {name.firstname} {name.lastname}
      </CardTitle>
      <p className='text-base-content/70' data-testid='recipient-address'>
        {address.street}, {address.zipcode} {address.city}
      </p>
    </CardBody>
  </Card>
);
