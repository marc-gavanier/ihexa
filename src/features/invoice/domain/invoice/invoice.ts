import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';
import { Line, totalOfAll } from '../line';
import { Recipient } from '../recipient';

export const InvoiceId = defineModel(Schema.UUID.pipe(Schema.brand('InvoiceId')));
export type InvoiceId = Model.TypeOf<typeof InvoiceId>;

export const Invoice = defineModel(
  Schema.Struct({
    id: InvoiceId.schema,
    recipient: Recipient.schema,
    lines: Schema.NonEmptyArray(Line.schema)
  })
);
export type Invoice = Model.TypeOf<typeof Invoice>;

export const invoiceTotal = ({ lines }: Invoice): number => totalOfAll(lines);
