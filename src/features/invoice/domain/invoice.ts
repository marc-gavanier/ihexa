import type { DomainModel } from '@/libraries/ddd/domain-model';

export type InvoiceId = DomainModel<'InvoiceId', string>;

type Name = DomainModel<
  'Name',
  {
    firstName: string;
    lastName: string;
  }
>;

type Street = DomainModel<'Street', string>;

type City = DomainModel<'City', string>;

type PostalCode = DomainModel<'PostalCode', string>;

type Address = DomainModel<
  'Address',
  { street: Street; city: City; postalCode: PostalCode }
>;

type Recipient = DomainModel<'Recipient', { name: Name; address: Address }>;

type LineLabel = DomainModel<'LineLabel', string>;

type Amount = DomainModel<'Amount', number>;

type Quantity = DomainModel<'Quantity', number>;

type Line = DomainModel<
  'Line',
  { label: LineLabel; unitPrice: Amount; quantity: Quantity }
>;

export type Invoice = DomainModel<
  'Invoice',
  {
    id: InvoiceId;
    recipient: Recipient;
    lines: Line[];
    total: Amount;
  }
>;
