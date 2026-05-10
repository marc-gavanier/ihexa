import { Schema } from 'effect';
import { B2BClient, B2CClient, type Client } from '@/features/client/domain';
import { FormeJuridique } from '@/features/client/domain/forme-juridique';
import type { clientsTable } from './client.table';

type ClientRow = typeof clientsTable.$inferSelect;
type ClientInsertRow = typeof clientsTable.$inferInsert;

export const clientToDomain = (row: ClientRow): Client =>
  row.type === 'B2B'
    ? B2BClient({
        _tag: 'B2BClient',
        id: row.id,
        denominationSociale: row.denominationSociale ?? '',
        formeJuridique: Schema.decodeUnknownSync(FormeJuridique)(row.formeJuridique),
        siret: row.siret ?? '',
        tvaIntracommunautaire: row.tvaIntracommunautaire ?? '',
        address: { street: row.street, city: row.city, zipcode: row.zipcode },
        ...(row.email != null ? { email: row.email } : {}),
        ...(row.phone != null ? { phone: row.phone } : {})
      })
    : B2CClient({
        _tag: 'B2CClient',
        id: row.id,
        name: { firstname: row.firstname ?? '', lastname: row.lastname ?? '' },
        address: { street: row.street, city: row.city, zipcode: row.zipcode },
        ...(row.email != null ? { email: row.email } : {}),
        ...(row.phone != null ? { phone: row.phone } : {})
      });

export const clientFromDomain = (client: Client): ClientInsertRow =>
  client._tag === 'B2BClient'
    ? {
        id: client.id,
        type: 'B2B',
        denominationSociale: client.denominationSociale,
        formeJuridique: client.formeJuridique,
        siret: client.siret,
        tvaIntracommunautaire: client.tvaIntracommunautaire,
        street: client.address.street,
        city: client.address.city,
        zipcode: client.address.zipcode,
        ...(client.email != null ? { email: client.email } : {}),
        ...(client.phone != null ? { phone: client.phone } : {})
      }
    : {
        id: client.id,
        type: 'B2C',
        firstname: client.name.firstname,
        lastname: client.name.lastname,
        street: client.address.street,
        city: client.address.city,
        zipcode: client.address.zipcode,
        ...(client.email != null ? { email: client.email } : {}),
        ...(client.phone != null ? { phone: client.phone } : {})
      };
