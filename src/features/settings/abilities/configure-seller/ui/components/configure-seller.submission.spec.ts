import { describe, expect, it } from 'vitest';
import type { CompanySummary } from '@/libraries/recherche-entreprises';
import { toConfigureSellerInput } from './configure-seller.submission';

const COMPANY: CompanySummary = {
  companyName: 'ACME SARL',
  legalForm: 'SARL',
  siren: '123456789',
  siret: '12345678900014',
  street: '10 Rue du Commerce',
  zipcode: '75015',
  city: 'Paris',
  inseeCode: '75115'
};

const FULL_VALUES = {
  company: COMPANY,
  vatRegime: 'normal',
  vatNumber: 'FR12123456789',
  taxDebitOption: true,
  rcsRegistration: 'RCS Paris 123456789',
  shareCapital: '10000',
  email: 'contact@acme.fr',
  phone: '+33123456789',
  website: 'https://acme.fr'
};

describe('toConfigureSellerInput', () => {
  it('should provide empty company when null for schema validation to reject', () => {
    const result = toConfigureSellerInput({ ...FULL_VALUES, company: null });
    expect(result.company.companyName).toBe('');
  });

  it('should include company and required fields', () => {
    const result = toConfigureSellerInput(FULL_VALUES);

    expect(result).toMatchObject({
      company: COMPANY,
      vatRegime: 'normal',
      email: 'contact@acme.fr'
    });
  });

  it('should include optional fields when non-empty', () => {
    const result = toConfigureSellerInput(FULL_VALUES);

    expect(result).toMatchObject({
      vatNumber: 'FR12123456789',
      taxDebitOption: true,
      rcsRegistration: 'RCS Paris 123456789',
      shareCapital: 10000,
      phone: '+33123456789',
      website: 'https://acme.fr'
    });
  });

  it('should convert shareCapital string to number', () => {
    const result = toConfigureSellerInput(FULL_VALUES);

    expect(result?.shareCapital).toBe(10000);
  });

  it('should omit vatNumber when empty', () => {
    const result = toConfigureSellerInput({ ...FULL_VALUES, vatNumber: '' });

    expect(result).not.toHaveProperty('vatNumber');
  });

  it('should omit taxDebitOption when false', () => {
    const result = toConfigureSellerInput({ ...FULL_VALUES, taxDebitOption: false });

    expect(result).not.toHaveProperty('taxDebitOption');
  });

  it('should omit rcsRegistration when empty', () => {
    const result = toConfigureSellerInput({ ...FULL_VALUES, rcsRegistration: '' });

    expect(result).not.toHaveProperty('rcsRegistration');
  });

  it('should omit shareCapital when empty', () => {
    const result = toConfigureSellerInput({ ...FULL_VALUES, shareCapital: '' });

    expect(result).not.toHaveProperty('shareCapital');
  });

  it('should omit phone when empty', () => {
    const result = toConfigureSellerInput({ ...FULL_VALUES, phone: '' });

    expect(result).not.toHaveProperty('phone');
  });

  it('should omit website when empty', () => {
    const result = toConfigureSellerInput({ ...FULL_VALUES, website: '' });

    expect(result).not.toHaveProperty('website');
  });
});
