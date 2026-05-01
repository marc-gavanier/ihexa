import { describe, expect, it } from 'vitest';
import { ClientToCreate } from './create-client';

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

describe('Create client', () => {
  it.each([
    { field: 'firstname', description: 'blank', set: () => ({ ...baseInput, name: { ...baseInput.name, firstname: ' ' } }) },
    { field: 'firstname', description: 'empty', set: () => ({ ...baseInput, name: { ...baseInput.name, firstname: '' } }) },
    { field: 'lastname', description: 'blank', set: () => ({ ...baseInput, name: { ...baseInput.name, lastname: ' ' } }) },
    { field: 'lastname', description: 'empty', set: () => ({ ...baseInput, name: { ...baseInput.name, lastname: '' } }) },
    { field: 'street', description: 'blank', set: () => ({ ...baseInput, address: { ...baseInput.address, street: ' ' } }) },
    { field: 'street', description: 'empty', set: () => ({ ...baseInput, address: { ...baseInput.address, street: '' } }) },
    { field: 'city', description: 'blank', set: () => ({ ...baseInput, address: { ...baseInput.address, city: ' ' } }) },
    { field: 'city', description: 'empty', set: () => ({ ...baseInput, address: { ...baseInput.address, city: '' } }) },
    { field: 'zipcode', description: 'blank', set: () => ({ ...baseInput, address: { ...baseInput.address, zipcode: ' ' } }) },
    { field: 'zipcode', description: 'empty', set: () => ({ ...baseInput, address: { ...baseInput.address, zipcode: '' } }) }
  ])('should reject $description $field', ({ field, set }) => {
    expect(() => ClientToCreate(set())).toThrow(new RegExp(`\\["${field}"\\]`));
  });

  it.each([
    { input: 'jean', expected: 'Jean', description: 'simple firstname' },
    { input: 'jean-pierre', expected: 'Jean-Pierre', description: 'compound firstname with hyphen' },
    { input: 'JEAN-PIERRE', expected: 'Jean-Pierre', description: 'mixed case compound firstname' },
    { input: 'jean-marie-louis', expected: 'Jean-Marie-Louis', description: 'triple compound firstname' },
    { input: 'jean pierre', expected: 'Jean Pierre', description: 'compound firstname with space' },
    { input: 'a', expected: 'A', description: 'single letter firstname' },
    { input: 'élise', expected: 'Élise', description: 'firstname with accent' },
    { input: 'éloïse', expected: 'Éloïse', description: 'firstname with multiple accents' },
    { input: 'jean-françois', expected: 'Jean-François', description: 'compound firstname with accent' },
    { input: '  jean  ', expected: 'Jean', description: 'firstname with leading and trailing spaces' }
  ])('should capitalize $description: $input → $expected', ({ input, expected }) => {
    const client = ClientToCreate({ ...baseInput, name: { ...baseInput.name, firstname: input } });

    expect(client.name.firstname).toBe(expected);
  });

  it.each([
    { input: 'dupont', expected: 'DUPONT', description: 'simple lastname' },
    { input: 'de la fontaine', expected: 'DE LA FONTAINE', description: 'compound lastname with spaces' },
    { input: 'x', expected: 'X', description: 'single letter lastname' },
    { input: 'bézier', expected: 'BÉZIER', description: 'lastname with accent' },
    { input: 'müller', expected: 'MÜLLER', description: 'lastname with umlaut' },
    { input: '  dupont  ', expected: 'DUPONT', description: 'lastname with leading and trailing spaces' }
  ])('should uppercase $description: $input → $expected', ({ input, expected }) => {
    const client = ClientToCreate({ ...baseInput, name: { ...baseInput.name, lastname: input } });

    expect(client.name.lastname).toBe(expected);
  });

  it('should preserve address fields as-is', () => {
    const client = ClientToCreate(baseInput);

    expect(client.address).toStrictEqual({
      street: '123 Rue de la Paix',
      city: 'Paris',
      zipcode: '75001'
    });
  });
});
