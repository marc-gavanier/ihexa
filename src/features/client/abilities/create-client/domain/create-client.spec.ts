import { describe, expect, it } from 'vitest';
import { computeTvaIntracommunautaire } from '@/features/client/domain/tva-intracommunautaire';
import { B2BClientToCreate, B2CClientToCreate, toB2BClient } from './create-client';

const b2cBaseInput = {
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

const b2bBaseInput = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  denominationSociale: 'ACME SARL',
  formeJuridique: 'SARL' as const,
  siret: '44306184100047',
  address: {
    street: '8 Rue de Londres',
    city: 'Paris',
    zipcode: '75009'
  }
};

describe('B2C Client creation', () => {
  it.each([
    {
      field: 'firstname',
      description: 'blank',
      set: () => ({ ...b2cBaseInput, name: { ...b2cBaseInput.name, firstname: ' ' } })
    },
    {
      field: 'firstname',
      description: 'empty',
      set: () => ({ ...b2cBaseInput, name: { ...b2cBaseInput.name, firstname: '' } })
    },
    {
      field: 'lastname',
      description: 'blank',
      set: () => ({ ...b2cBaseInput, name: { ...b2cBaseInput.name, lastname: ' ' } })
    },
    { field: 'lastname', description: 'empty', set: () => ({ ...b2cBaseInput, name: { ...b2cBaseInput.name, lastname: '' } }) },
    {
      field: 'street',
      description: 'blank',
      set: () => ({ ...b2cBaseInput, address: { ...b2cBaseInput.address, street: ' ' } })
    },
    {
      field: 'street',
      description: 'empty',
      set: () => ({ ...b2cBaseInput, address: { ...b2cBaseInput.address, street: '' } })
    },
    { field: 'city', description: 'blank', set: () => ({ ...b2cBaseInput, address: { ...b2cBaseInput.address, city: ' ' } }) },
    { field: 'city', description: 'empty', set: () => ({ ...b2cBaseInput, address: { ...b2cBaseInput.address, city: '' } }) },
    {
      field: 'zipcode',
      description: 'blank',
      set: () => ({ ...b2cBaseInput, address: { ...b2cBaseInput.address, zipcode: ' ' } })
    },
    {
      field: 'zipcode',
      description: 'empty',
      set: () => ({ ...b2cBaseInput, address: { ...b2cBaseInput.address, zipcode: '' } })
    }
  ])('should reject $description $field', ({ field, set }) => {
    expect(() => B2CClientToCreate(set())).toThrow(new RegExp(`\\["${field}"\\]`));
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
  ])('should capitalize $description: $input -> $expected', ({ input, expected }) => {
    const client = B2CClientToCreate({ ...b2cBaseInput, name: { ...b2cBaseInput.name, firstname: input } });

    expect(client.name.firstname).toBe(expected);
  });

  it.each([
    { input: 'dupont', expected: 'DUPONT', description: 'simple lastname' },
    { input: 'de la fontaine', expected: 'DE LA FONTAINE', description: 'compound lastname with spaces' },
    { input: 'x', expected: 'X', description: 'single letter lastname' },
    { input: 'bézier', expected: 'BÉZIER', description: 'lastname with accent' },
    { input: 'müller', expected: 'MÜLLER', description: 'lastname with umlaut' },
    { input: '  dupont  ', expected: 'DUPONT', description: 'lastname with leading and trailing spaces' }
  ])('should uppercase $description: $input -> $expected', ({ input, expected }) => {
    const client = B2CClientToCreate({ ...b2cBaseInput, name: { ...b2cBaseInput.name, lastname: input } });

    expect(client.name.lastname).toBe(expected);
  });

  it('should preserve address fields as-is', () => {
    const client = B2CClientToCreate(b2cBaseInput);

    expect(client.address).toStrictEqual({
      street: '123 Rue de la Paix',
      city: 'Paris',
      zipcode: '75001'
    });
  });

  it('should accept optional email', () => {
    const client = B2CClientToCreate({ ...b2cBaseInput, email: 'Test@Example.COM' });

    expect(client.email).toBe('test@example.com');
  });

  it('should accept optional phone', () => {
    const client = B2CClientToCreate({ ...b2cBaseInput, phone: '+33612345678' });

    expect(client.phone).toBe('+33612345678');
  });
});

describe('B2B Client creation', () => {
  it('should create a B2B client with valid data', () => {
    const client = B2BClientToCreate(b2bBaseInput);

    expect(client.denominationSociale).toBe('ACME SARL');
    expect(client.formeJuridique).toBe('SARL');
    expect(client.siret).toBe('44306184100047');
  });

  it('should reject empty denomination sociale', () => {
    expect(() => B2BClientToCreate({ ...b2bBaseInput, denominationSociale: '' })).toThrow();
  });

  it('should reject invalid SIRET (not 14 digits)', () => {
    expect(() => B2BClientToCreate({ ...b2bBaseInput, siret: '1234' })).toThrow();
  });

  it('should reject invalid forme juridique', () => {
    expect(() => B2BClientToCreate({ ...b2bBaseInput, formeJuridique: 'INVALID' as 'SARL' })).toThrow();
  });

  it('should compute TVA intracommunautaire from SIRET', () => {
    const client = toB2BClient(B2BClientToCreate(b2bBaseInput));

    expect(client.tvaIntracommunautaire).toBe('FR64443061841');
  });

  it('should accept optional email', () => {
    const client = B2BClientToCreate({ ...b2bBaseInput, email: 'Contact@ACME.fr' });

    expect(client.email).toBe('contact@acme.fr');
  });

  it('should accept optional phone', () => {
    const client = B2BClientToCreate({ ...b2bBaseInput, phone: '+33145678901' });

    expect(client.phone).toBe('+33145678901');
  });
});

describe('TVA intracommunautaire computation', () => {
  it.each([
    { siret: '44306184100047', expected: 'FR64443061841' },
    { siret: '80295478500028', expected: 'FR26802954785' }
  ])('should compute $expected from SIRET $siret', ({ siret, expected }) => {
    expect(computeTvaIntracommunautaire(siret)).toBe(expected);
  });
});
