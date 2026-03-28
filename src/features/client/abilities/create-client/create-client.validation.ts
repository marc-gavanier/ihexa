import { Struct, UUID } from 'effect/Schema';
import { City, Firstname, Lastname, Street, Zipcode } from '@/features/client/domain';

export const createClientValidation = Struct({
  id: UUID,
  firstname: Firstname.schema,
  lastname: Lastname.schema,
  street: Street.schema,
  city: City.schema,
  zipcode: Zipcode.schema
});

export type CreateClientFormData = typeof createClientValidation.Type;
export type CreateClientInput = typeof createClientValidation.Encoded;
