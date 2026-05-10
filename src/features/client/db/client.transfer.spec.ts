import { describe, expect, it } from 'vitest';
import { B2BClient, B2CClient } from '@/features/client/domain';
import { clientFromDomain, clientToDomain } from './client.transfer';

describe('client transfer', () => {
  it('should preserve B2C client data through round-trip conversion', () => {
    const client = B2CClient({
      _tag: 'B2CClient',
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      name: { firstname: 'Jean-Pierre', lastname: 'DUPONT' },
      address: { street: '12 Rue de la Paix', city: 'Lyon', zipcode: '69001' }
    });

    const result = clientToDomain(clientFromDomain(client));

    expect(result).toStrictEqual(client);
  });

  it('should preserve B2B client data through round-trip conversion', () => {
    const client = B2BClient({
      _tag: 'B2BClient',
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      denominationSociale: 'ACME SARL',
      formeJuridique: 'SARL',
      siret: '44306184100047',
      tvaIntracommunautaire: 'FR40443061841',
      address: { street: '8 Rue de Londres', city: 'Paris', zipcode: '75009' }
    });

    const result = clientToDomain(clientFromDomain(client));

    expect(result).toStrictEqual(client);
  });

  it('should preserve B2C client with optional fields through round-trip', () => {
    const client = B2CClient({
      _tag: 'B2CClient',
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      name: { firstname: 'Marie', lastname: 'CURIE' },
      address: { street: '5 Rue Pierre Curie', city: 'Paris', zipcode: '75005' },
      email: 'marie.curie@lab.fr',
      phone: '+33612345678'
    });

    const result = clientToDomain(clientFromDomain(client));

    expect(result).toStrictEqual(client);
  });

  it('should preserve B2B client with optional fields through round-trip', () => {
    const client = B2BClient({
      _tag: 'B2BClient',
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      denominationSociale: 'ACME SARL',
      formeJuridique: 'SARL',
      siret: '44306184100047',
      tvaIntracommunautaire: 'FR40443061841',
      address: { street: '8 Rue de Londres', city: 'Paris', zipcode: '75009' },
      email: 'contact@acme.fr',
      phone: '+33145678901'
    });

    const result = clientToDomain(clientFromDomain(client));

    expect(result).toStrictEqual(client);
  });
});
