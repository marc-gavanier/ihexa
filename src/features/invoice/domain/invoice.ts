import { Schema } from 'effect';
import { type Amount, Line, totalOfAll } from './line';
import { Recipient } from './recipient';

export const InvoiceId = Schema.UUID.pipe(Schema.brand('InvoiceId'));
export type InvoiceId = typeof InvoiceId.Type;

export const Invoice = Schema.Struct({
  id: InvoiceId,
  recipient: Recipient,
  lines: Schema.NonEmptyArray(Line)
});
export type Invoice = typeof Invoice.Type;

export const invoiceTotal = ({ lines }: Invoice): Amount => totalOfAll(lines);
