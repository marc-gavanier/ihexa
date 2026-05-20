import { Schema } from 'effect';
import { Struct, UUID } from 'effect/Schema';
import { City, Street, Zipcode } from '@/features/client/domain/address';
import { Email } from '@/features/client/domain/email';
import { FORMES_JURIDIQUES, type FormeJuridique } from '@/features/client/domain/forme-juridique';
import { Firstname, Lastname } from '@/features/client/domain/name';
import { Phone } from '@/features/client/domain/phone';

const FormeJuridiqueValidation = Schema.String.pipe(
  Schema.filter((value): value is FormeJuridique => FORMES_JURIDIQUES.some((fj) => fj === value), {
    message: () => 'invalid'
  })
);

export const createB2CClientValidation = Struct({
  id: UUID,
  firstname: Firstname.schema,
  lastname: Lastname.schema,
  street: Street.schema,
  city: City.schema,
  zipcode: Zipcode.schema,
  email: Schema.optionalWith(Email.schema, { exact: true }),
  phone: Schema.optionalWith(Phone.schema, { exact: true })
});

export type CreateB2CClientFormData = typeof createB2CClientValidation.Type;
export type CreateB2CClientInput = typeof createB2CClientValidation.Encoded;

const companyValidation = Schema.Struct({
  companyName: Schema.String.pipe(Schema.nonEmptyString({ message: () => 'required' })),
  legalForm: FormeJuridiqueValidation,
  siret: Schema.String.pipe(Schema.nonEmptyString({ message: () => 'required' })),
  street: Schema.String,
  zipcode: Schema.String,
  city: Schema.String
});

export const createB2BClientValidation = Struct({
  id: UUID,
  company: companyValidation,
  email: Schema.optionalWith(Email.schema, { exact: true }),
  phone: Schema.optionalWith(Phone.schema, { exact: true })
});

export type CreateB2BClientFormData = typeof createB2BClientValidation.Type;
export type CreateB2BClientInput = typeof createB2BClientValidation.Encoded;
