import { describe, expect, it } from 'vitest';
import { InseeCode, SellerCity, SellerStreet, SellerZipcode } from '@/features/settings/domain/seller/address';
import { CompanyName } from '@/features/settings/domain/seller/company-name';
import { Email } from '@/features/settings/domain/seller/email';
import { Phone } from '@/features/settings/domain/seller/phone';
import { RcsRegistration } from '@/features/settings/domain/seller/rcs-registration';
import type { FranchiseEnBaseSeller, NormalVatSeller } from '@/features/settings/domain/seller/seller';
import { ShareCapital } from '@/features/settings/domain/seller/share-capital';
import { Siren } from '@/features/settings/domain/seller/siren';
import { Siret } from '@/features/settings/domain/seller/siret';
import { VatNumber } from '@/features/settings/domain/seller/vat-number';
import { Website } from '@/features/settings/domain/seller/website';
import { presentSeller, showShareCapital, showVatFields } from './configure-seller.presenter';

const NORMAL_SELLER: NormalVatSeller = {
  companyName: CompanyName('ACME SARL'),
  legalForm: 'SARL',
  siren: Siren('123456789'),
  siret: Siret('12345678900014'),
  address: {
    street: SellerStreet('10 Rue du Commerce'),
    zipcode: SellerZipcode('75015'),
    city: SellerCity('Paris'),
    inseeCode: InseeCode('75115')
  },
  vatRegime: 'normal',
  vatNumber: VatNumber('FR12123456789'),
  taxDebitOption: true,
  rcsRegistration: RcsRegistration('RCS Paris 123456789'),
  shareCapital: ShareCapital(10000),
  email: Email('contact@acme.fr'),
  phone: Phone('+33123456789'),
  website: Website('https://acme.fr')
};

const FRANCHISE_SELLER: FranchiseEnBaseSeller = {
  companyName: CompanyName('DUPONT EI'),
  legalForm: 'EI',
  siren: Siren('987654321'),
  siret: Siret('98765432100012'),
  address: {
    street: SellerStreet('5 Avenue de la Paix'),
    zipcode: SellerZipcode('69001'),
    city: SellerCity('Lyon'),
    inseeCode: InseeCode('69123')
  },
  vatRegime: 'franchise_en_base',
  email: Email('dupont@email.fr')
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
