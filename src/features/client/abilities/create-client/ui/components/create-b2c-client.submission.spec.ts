import { describe, expect, it } from 'vitest';
import { emptyB2CClientFormValues, toCreateB2CClientInput } from './create-b2c-client.submission';

describe('toCreateB2CClientInput', () => {
  it('omits empty email and phone', () => {
    const result = toCreateB2CClientInput({
      ...emptyB2CClientFormValues(),
      firstname: 'jean',
      lastname: 'dupont',
      street: '1 rue',
      city: 'Paris',
      zipcode: '75001'
    });

    expect(result.email).toBeUndefined();
    expect(result.phone).toBeUndefined();
  });

  it('keeps email and phone when filled', () => {
    const result = toCreateB2CClientInput({
      ...emptyB2CClientFormValues(),
      firstname: 'jean',
      lastname: 'dupont',
      street: '1 rue',
      city: 'Paris',
      zipcode: '75001',
      email: 'jean@example.com',
      phone: '+33612345678'
    });

    expect(result.email).toBe('jean@example.com');
    expect(result.phone).toBe('+33612345678');
  });
});
