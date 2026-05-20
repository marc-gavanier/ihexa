import { describe, expect, it } from 'vitest';
import type { CompanySummary } from '@/libraries/recherche-entreprises';
import { emptyB2BClientFormValues, toCreateB2BClientInput } from './create-b2b-client.submission';

const GOOGLE: CompanySummary = {
  companyName: 'GOOGLE FRANCE',
  legalForm: 'SAS',
  siren: '443061841',
  siret: '44306184100047',
  street: '8 Rue de Londres',
  zipcode: '75009',
  city: 'Paris',
  inseeCode: '75109'
};

describe('toCreateB2BClientInput', () => {
  it('passes the action-relevant company fields through unchanged', () => {
    const result = toCreateB2BClientInput({ ...emptyB2BClientFormValues(), company: GOOGLE });

    expect(result.company).toEqual({
      companyName: GOOGLE.companyName,
      legalForm: GOOGLE.legalForm,
      siret: GOOGLE.siret,
      street: GOOGLE.street,
      zipcode: GOOGLE.zipcode,
      city: GOOGLE.city
    });
  });

  it('preserves the legalForm exactly as returned by the API', () => {
    const result = toCreateB2BClientInput({
      ...emptyB2BClientFormValues(),
      company: { ...GOOGLE, legalForm: 'EXOTIC-FORM' }
    });

    expect(result.company.legalForm).toBe('EXOTIC-FORM');
  });

  it('uses an empty company when none is selected', () => {
    const result = toCreateB2BClientInput(emptyB2BClientFormValues());

    expect(result.company.companyName).toBe('');
    expect(result.company.siret).toBe('');
  });

  it('omits empty email and phone', () => {
    const result = toCreateB2BClientInput({ ...emptyB2BClientFormValues(), company: GOOGLE });

    expect(result.email).toBeUndefined();
    expect(result.phone).toBeUndefined();
  });

  it('keeps email and phone when filled', () => {
    const result = toCreateB2BClientInput({
      ...emptyB2BClientFormValues(),
      company: GOOGLE,
      email: 'contact@google.fr',
      phone: '+33145678901'
    });

    expect(result.email).toBe('contact@google.fr');
    expect(result.phone).toBe('+33145678901');
  });
});
