import { filter, String as Str, Struct } from 'effect/Schema';
import { isInvoiceId } from '@/features/invoice/domain';

export const consultInvoiceValidation = Struct({
  id: Str.pipe(filter((id: string): boolean => isInvoiceId(id))),
});
