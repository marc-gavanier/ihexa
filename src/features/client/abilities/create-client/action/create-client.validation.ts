import { Schema, Struct, UUID } from 'effect/Schema';
import { City, Street, Zipcode } from '@/features/client/domain/address';
import { DenominationSociale } from '@/features/client/domain/denomination-sociale';
import { Email } from '@/features/client/domain/email';
import { FormeJuridique } from '@/features/client/domain/forme-juridique';
import { Firstname, Lastname } from '@/features/client/domain/name';
import { Phone } from '@/features/client/domain/phone';
import { Siret } from '@/features/client/domain/siret';

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

export const createB2BClientValidation = Struct({
  id: UUID,
  denominationSociale: DenominationSociale.schema,
  formeJuridique: FormeJuridique,
  siret: Siret.schema,
  street: Street.schema,
  city: City.schema,
  zipcode: Zipcode.schema,
  email: Schema.optionalWith(Email.schema, { exact: true }),
  phone: Schema.optionalWith(Phone.schema, { exact: true })
});

export type CreateB2BClientFormData = typeof createB2BClientValidation.Type;
export type CreateB2BClientInput = typeof createB2BClientValidation.Encoded;
