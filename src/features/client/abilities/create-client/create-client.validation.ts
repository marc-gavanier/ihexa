import { filter, maxLength, nonEmptyString, Struct, Trim, UUID } from 'effect/Schema';
import { ZIPCODE_PATTERN } from '@/features/client/domain/address';
import { FIRSTNAME_MAX_LENGTH, LASTNAME_MAX_LENGTH } from '@/features/client/domain/name';

export const createClientValidation = Struct({
  id: UUID,
  firstname: Trim.pipe(
    nonEmptyString({ message: () => 'form.firstname.error.required' }),
    maxLength(FIRSTNAME_MAX_LENGTH, { message: () => 'form.firstname.error.maxLength' })
  ),
  lastname: Trim.pipe(
    nonEmptyString({ message: () => 'form.lastname.error.required' }),
    maxLength(LASTNAME_MAX_LENGTH, { message: () => 'form.lastname.error.maxLength' })
  ),
  street: Trim.pipe(nonEmptyString({ message: () => 'form.street.error.required' })),
  city: Trim.pipe(nonEmptyString({ message: () => 'form.city.error.required' })),
  zipcode: Trim.pipe(
    nonEmptyString({ message: () => 'form.zipcode.error.required' }),
    filter((value) => ZIPCODE_PATTERN.test(value) || 'form.zipcode.error.invalid')
  )
});

export type CreateClientFormData = typeof createClientValidation.Type;
