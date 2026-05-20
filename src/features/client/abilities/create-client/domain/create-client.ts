import { defineModel, type Model } from '@arckit/effect';
import { Data, type Either, Schema } from 'effect';
import { Address } from '@/features/client/domain/address';
import type { B2BClient, B2CClient, Client } from '@/features/client/domain/client';
import { ClientId } from '@/features/client/domain/client';
import { DenominationSociale } from '@/features/client/domain/denomination-sociale';
import { Email } from '@/features/client/domain/email';
import { FormeJuridique } from '@/features/client/domain/forme-juridique';
import { Name } from '@/features/client/domain/name';
import { Phone } from '@/features/client/domain/phone';
import { Siret } from '@/features/client/domain/siret';
import { computeTvaIntracommunautaire } from '@/features/client/domain/tva-intracommunautaire';

const FIRSTNAME_PATTERN = /(?<=^|[\s-])\p{L}/gu;

const capitalizeCompoundName = (name: string): string =>
  name.toLowerCase().replace(FIRSTNAME_PATTERN, (letter) => letter.toUpperCase());

const formatName = ({ firstname, lastname }: Model.EncodedOf<typeof Name>) => ({
  firstname: capitalizeCompoundName(firstname),
  lastname: lastname.toUpperCase()
});

const lowercaseEmail = <T extends { email?: string }>(input: T): T =>
  input.email != null ? { ...input, email: input.email.toLowerCase() } : input;

export const B2CClientToCreate = defineModel(
  Schema.Struct({
    id: ClientId.schema,
    name: Name.schema,
    address: Address.schema,
    email: Schema.optionalWith(Email.schema, { exact: true }),
    phone: Schema.optionalWith(Phone.schema, { exact: true })
  }),
  ({ name, ...input }) => lowercaseEmail({ ...input, name: formatName(name) })
);

export type B2CClientToCreate = Model.TypeOf<typeof B2CClientToCreate>;

export const B2BClientToCreate = defineModel(
  Schema.Struct({
    id: ClientId.schema,
    denominationSociale: DenominationSociale.schema,
    formeJuridique: FormeJuridique,
    siret: Siret.schema,
    address: Address.schema,
    email: Schema.optionalWith(Email.schema, { exact: true }),
    phone: Schema.optionalWith(Phone.schema, { exact: true })
  }),
  (input) => lowercaseEmail(input)
);

export type B2BClientToCreate = Model.TypeOf<typeof B2BClientToCreate>;

export type ClientToCreate = B2CClientToCreate | B2BClientToCreate;

export class ClientAlreadyExists extends Data.TaggedError('ClientAlreadyExists')<{
  readonly clientId: ClientId;
}> {}

export class SiretAlreadyExists extends Data.TaggedError('SiretAlreadyExists')<{
  readonly siret: string;
}> {}

export type CreateB2CClient = (clientToCreate: B2CClientToCreate) => Promise<Either.Either<B2CClient, ClientAlreadyExists>>;

export type CreateB2BClient = (
  clientToCreate: B2BClientToCreate
) => Promise<Either.Either<B2BClient, ClientAlreadyExists | SiretAlreadyExists>>;

export type CreateClient = (
  clientToCreate: ClientToCreate
) => Promise<Either.Either<Client, ClientAlreadyExists | SiretAlreadyExists>>;

export const toB2BClient = (clientToCreate: B2BClientToCreate): B2BClient => ({
  id: clientToCreate.id,
  denominationSociale: clientToCreate.denominationSociale,
  formeJuridique: clientToCreate.formeJuridique,
  siret: clientToCreate.siret,
  tvaIntracommunautaire: computeTvaIntracommunautaire(clientToCreate.siret),
  address: clientToCreate.address,
  ...(clientToCreate.email != null ? { email: clientToCreate.email } : {}),
  ...(clientToCreate.phone != null ? { phone: clientToCreate.phone } : {})
});

export const toB2CClient = (clientToCreate: B2CClientToCreate): B2CClient => ({
  id: clientToCreate.id,
  name: clientToCreate.name,
  address: clientToCreate.address,
  ...(clientToCreate.email != null ? { email: clientToCreate.email } : {}),
  ...(clientToCreate.phone != null ? { phone: clientToCreate.phone } : {})
});
