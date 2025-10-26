import type { Recipient } from '@/features/invoice/domain/recipient';
import { Card } from '@/libraries/ui/primitives/card';
import { InvoiceRecipientAddress } from './invoice-recipient-address';
import { InvoiceRecipientName } from './invoice-recipient-name';

export const InvoiceRecipient = ({ recipient }: { recipient: Recipient }) => {
  return (
    <Card kind='card-border' className='w-fit'>
      <div className='card-body'>
        <h2 className='card-title'>
          <InvoiceRecipientName {...recipient.name} />
        </h2>
        <InvoiceRecipientAddress {...recipient.address} />
      </div>
    </Card>
  );
};
