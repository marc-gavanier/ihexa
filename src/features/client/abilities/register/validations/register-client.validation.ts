import { filter, String as Str, Struct, transform } from 'effect/Schema';
import { formatFirstName, isFilledFirstName } from '@/features/client/domain/first-name';

export const registerClientValidation = Struct({
  firstName: Str.pipe(
    transform(Str, {
      decode: (firstName) => formatFirstName(firstName),
      encode: (firstName) => firstName
    }),
    filter((firstName: string): boolean => isFilledFirstName(firstName), {
      message: () => 'register-client.form.error.first-name.required'
    })
  )
});

export type RegisterClientValidation = typeof registerClientValidation.Type;

// import { filter, String as Str, Struct } from 'effect/Schema';
// import { isInvoiceId } from '@/features/invoice/domain';
//
// export const consultInvoiceValidation = Struct({
//   id: Str.pipe(filter((id: string): boolean => isInvoiceId(id)))
// });
