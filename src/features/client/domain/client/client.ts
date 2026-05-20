import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';
import { Address } from '../address';
import { DenominationSociale } from '../denomination-sociale';
import { Email } from '../email';
import { FormeJuridique } from '../forme-juridique';
import { Name } from '../name';
import { Phone } from '../phone';
import { Siret } from '../siret';
import { TvaIntracommunautaire } from '../tva-intracommunautaire';
import { ClientId } from './client-id';

export const B2CClient = defineModel(
  Schema.Struct({
    id: ClientId.schema,
    name: Name.schema,
    address: Address.schema,
    email: Schema.optionalWith(Email.schema, { exact: true }),
    phone: Schema.optionalWith(Phone.schema, { exact: true })
  })
);
export type B2CClient = Model.TypeOf<typeof B2CClient>;

export const B2BClient = defineModel(
  Schema.Struct({
    id: ClientId.schema,
    denominationSociale: DenominationSociale.schema,
    formeJuridique: FormeJuridique,
    siret: Siret.schema,
    tvaIntracommunautaire: TvaIntracommunautaire.schema,
    address: Address.schema,
    email: Schema.optionalWith(Email.schema, { exact: true }),
    phone: Schema.optionalWith(Phone.schema, { exact: true })
  })
);
export type B2BClient = Model.TypeOf<typeof B2BClient>;

export type Client = B2CClient | B2BClient;
