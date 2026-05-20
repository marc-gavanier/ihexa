import { describe, expect, it } from 'vitest';
import { B2BClient, B2CClient, type Client } from '@/features/client/domain';
import type { clientsTable } from './client.table';
import { clientFromDomain, clientToDomain } from './client.transfer';

const asSelectRow = (insert: typeof clientsTable.$inferInsert): typeof clientsTable.$inferSelect => ({
  id: insert.id,
  type: insert.type ?? 'B2C',
  firstname: insert.firstname ?? null,
  lastname: insert.lastname ?? null,
  denominationSociale: insert.denominationSociale ?? null,
  formeJuridique: insert.formeJuridique ?? null,
  siret: insert.siret ?? null,
  tvaIntracommunautaire: insert.tvaIntracommunautaire ?? null,
  email: insert.email ?? null,
  phone: insert.phone ?? null,
  street: insert.street,
  city: insert.city,
  zipcode: insert.zipcode,
  searchText: null
});

const roundTrip = (client: Client): Client => clientToDomain(asSelectRow(clientFromDomain(client)));

describe('client transfer', () => {
  it('should preserve B2C client data through round-trip conversion', () => {
    const client = B2CClient({
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      name: { firstname: 'Jean-Pierre', lastname: 'DUPONT' },
      address: { street: '12 Rue de la Paix', city: 'Lyon', zipcode: '69001' }
    });

    expect(roundTrip(client)).toStrictEqual(client);
  });

  it('should preserve B2B client data through round-trip conversion', () => {
    const client = B2BClient({
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      denominationSociale: 'ACME SARL',
      formeJuridique: 'SARL',
      siret: '44306184100047',
      tvaIntracommunautaire: 'FR40443061841',
      address: { street: '8 Rue de Londres', city: 'Paris', zipcode: '75009' }
    });

    expect(roundTrip(client)).toStrictEqual(client);
  });

  it('should preserve B2C client with optional fields through round-trip', () => {
    const client = B2CClient({
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      name: { firstname: 'Marie', lastname: 'CURIE' },
      address: { street: '5 Rue Pierre Curie', city: 'Paris', zipcode: '75005' },
      email: 'marie.curie@lab.fr',
      phone: '+33612345678'
    });

    expect(roundTrip(client)).toStrictEqual(client);
  });

  it('should preserve B2B client with optional fields through round-trip', () => {
    const client = B2BClient({
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      denominationSociale: 'ACME SARL',
      formeJuridique: 'SARL',
      siret: '44306184100047',
      tvaIntracommunautaire: 'FR40443061841',
      address: { street: '8 Rue de Londres', city: 'Paris', zipcode: '75009' },
      email: 'contact@acme.fr',
      phone: '+33145678901'
    });

    expect(roundTrip(client)).toStrictEqual(client);
  });
});
