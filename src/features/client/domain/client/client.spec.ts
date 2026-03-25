import { describe, expect, it } from 'vitest';
import { Client } from './client';

describe('Client', () => {
  const baseInput = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: {
      firstname: 'jean',
      lastname: 'dupont'
    },
    address: {
      street: '123 Rue de la Paix',
      city: 'Paris',
      zipcode: '75001'
    }
  };

  it('should capitalize simple firstname', () => {
    const client = Client(baseInput);

    expect(client.name.firstname).toBe('Jean');
  });

  it('should capitalize compound firstname with hyphen', () => {
    const client = Client({ ...baseInput, name: { ...baseInput.name, firstname: 'jean-pierre' } });

    expect(client.name.firstname).toBe('Jean-Pierre');
  });

  it('should handle mixed case compound firstname', () => {
    const client = Client({ ...baseInput, name: { ...baseInput.name, firstname: 'JEAN-PIERRE' } });

    expect(client.name.firstname).toBe('Jean-Pierre');
  });

  it('should handle triple compound firstname', () => {
    const client = Client({ ...baseInput, name: { ...baseInput.name, firstname: 'jean-marie-louis' } });

    expect(client.name.firstname).toBe('Jean-Marie-Louis');
  });

  it('should capitalize compound firstname with space', () => {
    const client = Client({ ...baseInput, name: { ...baseInput.name, firstname: 'jean pierre' } });

    expect(client.name.firstname).toBe('Jean Pierre');
  });

  it('should uppercase lastname', () => {
    const client = Client(baseInput);

    expect(client.name.lastname).toBe('DUPONT');
  });

  it('should preserve address fields as-is', () => {
    const client = Client(baseInput);

    expect(client.address.street).toBe('123 Rue de la Paix');
    expect(client.address.city).toBe('Paris');
    expect(client.address.zipcode).toBe('75001');
  });
});
