import { describe, expect, it } from 'vitest';
import { Client } from '@/features/client/domain';
import { clientFromDomain, clientToDomain } from './client.transfer';

describe('client transfer', () => {
  it('should preserve client data through round-trip conversion', () => {
    const client = Client({
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      name: { firstname: 'Jean-Pierre', lastname: 'DUPONT' },
      address: { street: '12 Rue de la Paix', city: 'Lyon', zipcode: '69001' }
    });

    const result = clientToDomain(clientFromDomain(client));

    expect(result).toStrictEqual(client);
  });
});
