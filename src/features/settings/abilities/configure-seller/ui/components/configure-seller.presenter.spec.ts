import { describe, expect, it } from 'vitest';
import type { FranchiseEnBaseSeller, NormalVatSeller } from '@/features/settings/domain/seller';
import { presentSeller, showShareCapital, showVatFields } from './configure-seller.presenter';

const NORMAL_SELLER: NormalVatSeller = {
  companyName: 'ACME SARL' as never,
  legalForm: 'SARL',
  siren: '123456789' as never,
  siret: '12345678900014' as never,
  address: {
    street: '10 Rue du Commerce' as never,
    zipcode: '75015' as never,
    city: 'Paris' as never,
    inseeCode: '75115' as never
  },
  vatRegime: 'normal',
  vatNumber: 'FR12123456789' as never,
  taxDebitOption: true,
  rcsRegistration: 'RCS Paris 123456789' as never,
  shareCapital: 10000 as never,
  email: 'contact@acme.fr' as never,
  phone: '+33123456789' as never,
  website: 'https://acme.fr' as never
};

const FRANCHISE_SELLER: FranchiseEnBaseSeller = {
  companyName: 'DUPONT EI' as never,
  legalForm: 'EI',
  siren: '987654321' as never,
  siret: '98765432100012' as never,
  address: {
    street: '5 Avenue de la Paix' as never,
    zipcode: '69001' as never,
    city: 'Lyon' as never,
    inseeCode: '69123' as never
  },
  vatRegime: 'franchise_en_base',
  email: 'dupont@email.fr' as never
};

describe('presentSeller', () => {
  it('should return empty view model when seller is null', () => {
    const result = presentSeller(null);

    expect(result.company).toBeNull();
    expect(result.vatRegime).toBe('');
    expect(result.vatNumber).toBe('');
    expect(result.taxDebitOption).toBe(false);
    expect(result.email).toBe('');
  });

  it('should present a normal VAT seller with all fields', () => {
    const result = presentSeller(NORMAL_SELLER);

    expect(result.company).toEqual({
      companyName: 'ACME SARL',
      legalForm: 'SARL',
      siren: '123456789',
      siret: '12345678900014',
      street: '10 Rue du Commerce',
      zipcode: '75015',
      city: 'Paris',
      inseeCode: '75115'
    });
    expect(result.vatRegime).toBe('normal');
    expect(result.vatNumber).toBe('FR12123456789');
    expect(result.taxDebitOption).toBe(true);
    expect(result.rcsRegistration).toBe('RCS Paris 123456789');
    expect(result.shareCapital).toBe('10000');
    expect(result.email).toBe('contact@acme.fr');
    expect(result.phone).toBe('+33123456789');
    expect(result.website).toBe('https://acme.fr');
  });

  it('should clear VAT fields for franchise en base seller', () => {
    const result = presentSeller(FRANCHISE_SELLER);

    expect(result.vatRegime).toBe('franchise_en_base');
    expect(result.vatNumber).toBe('');
    expect(result.taxDebitOption).toBe(false);
  });

  it('should default optional fields to empty strings', () => {
    const result = presentSeller(FRANCHISE_SELLER);

    expect(result.rcsRegistration).toBe('');
    expect(result.shareCapital).toBe('');
    expect(result.phone).toBe('');
    expect(result.website).toBe('');
  });
});

describe('showVatFields', () => {
  it('should return true for normal regime', () => {
    expect(showVatFields('normal')).toBe(true);
  });

  it('should return false for franchise en base', () => {
    expect(showVatFields('franchise_en_base')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(showVatFields('')).toBe(false);
  });
});

describe('showShareCapital', () => {
  it('should return true for SARL', () => {
    expect(showShareCapital('SARL')).toBe(true);
  });

  it('should return true for SAS', () => {
    expect(showShareCapital('SAS')).toBe(true);
  });

  it('should return false for EI', () => {
    expect(showShareCapital('EI')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(showShareCapital('')).toBe(false);
  });
});
