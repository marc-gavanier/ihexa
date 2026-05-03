import { Either } from 'effect';
import { describe, expect, it } from 'vitest';
import { InseeCode, SellerCity, SellerStreet, SellerZipcode } from './address';
import { CompanyName } from './company-name';
import { Email } from './email';
import { Phone } from './phone';
import { RcsRegistration } from './rcs-registration';
import type { ValidatedSellerInput } from './seller';
import { buildSeller } from './seller';
import { ShareCapital } from './share-capital';
import { Siren } from './siren';
import { Siret } from './siret';
import { VatNumber } from './vat-number';
import { Website } from './website';

describe('SIREN validation', () => {
  it('should accept exactly 9 digits', () => {
    expect(() => Siren('123456789')).not.toThrow();
  });

  it('should reject fewer than 9 digits', () => {
    expect(() => Siren('123')).toThrow();
  });

  it('should reject more than 9 digits', () => {
    expect(() => Siren('1234567890')).toThrow();
  });

  it('should reject non-digit characters', () => {
    expect(() => Siren('12345678A')).toThrow();
  });

  it('should reject empty string', () => {
    expect(() => Siren('')).toThrow();
  });

  it('should trim whitespace', () => {
    expect(() => Siren('  123456789  ')).not.toThrow();
  });
});

describe('SIRET validation', () => {
  it('should accept exactly 14 digits', () => {
    expect(() => Siret('12345678900014')).not.toThrow();
  });

  it('should reject fewer than 14 digits', () => {
    expect(() => Siret('1234')).toThrow();
  });

  it('should reject more than 14 digits', () => {
    expect(() => Siret('123456789000141')).toThrow();
  });

  it('should reject non-digit characters', () => {
    expect(() => Siret('1234567890001A')).toThrow();
  });

  it('should reject empty string', () => {
    expect(() => Siret('')).toThrow();
  });
});

describe('Phone validation', () => {
  it('should accept +33 prefix with 9 digits', () => {
    expect(() => Phone('+33123456789')).not.toThrow();
  });

  it('should accept international outre-mer format', () => {
    expect(() => Phone('+262692123456')).not.toThrow();
  });

  it('should reject national format (0 prefix)', () => {
    expect(() => Phone('0123456789')).toThrow();
  });

  it('should reject phone without + prefix', () => {
    expect(() => Phone('33123456789')).toThrow();
  });

  it('should reject phone with wrong number of digits', () => {
    expect(() => Phone('+3312345')).toThrow();
  });

  it('should reject empty phone', () => {
    expect(() => Phone('')).toThrow();
  });
});

describe('Website validation', () => {
  it('should accept https URL', () => {
    expect(() => Website('https://example.com')).not.toThrow();
  });

  it('should accept http URL', () => {
    expect(() => Website('http://example.com')).not.toThrow();
  });

  it('should reject URL without protocol', () => {
    expect(() => Website('example.com')).toThrow();
  });

  it('should reject empty website', () => {
    expect(() => Website('')).toThrow();
  });
});

describe('RcsRegistration validation', () => {
  it('should accept RCS followed by city', () => {
    expect(() => RcsRegistration('RCS Paris')).not.toThrow();
  });

  it('should accept RM followed by city', () => {
    expect(() => RcsRegistration('RM Lyon')).not.toThrow();
  });

  it('should accept RCS with city and numbers', () => {
    expect(() => RcsRegistration('RCS Paris 123 456 789')).not.toThrow();
  });

  it('should accept dispensation text', () => {
    expect(() => RcsRegistration("Dispens\u00e9 d'immatriculation au RCS et au RM")).not.toThrow();
  });

  it('should reject arbitrary text', () => {
    expect(() => RcsRegistration('some random text')).toThrow();
  });

  it('should reject empty registration', () => {
    expect(() => RcsRegistration('')).toThrow();
  });
});

const validatedNormalInput: ValidatedSellerInput = {
  companyName: CompanyName('ACME SARL'),
  legalForm: 'SARL',
  siren: Siren('123456789'),
  siret: Siret('12345678900014'),
  street: SellerStreet('10 Rue du Commerce'),
  zipcode: SellerZipcode('75015'),
  city: SellerCity('Paris'),
  inseeCode: InseeCode('75115'),
  vatRegime: 'normal',
  vatNumber: VatNumber('FR32123456789'),
  taxDebitOption: false,
  email: Email('contact@acme.fr')
};

const validatedFranchiseInput: ValidatedSellerInput = {
  companyName: CompanyName('DUPONT EI'),
  legalForm: 'EI',
  siren: Siren('987654321'),
  siret: Siret('98765432100012'),
  street: SellerStreet('5 Avenue de la Paix'),
  zipcode: SellerZipcode('69001'),
  city: SellerCity('Lyon'),
  inseeCode: InseeCode('69123'),
  vatRegime: 'franchise_en_base',
  email: Email('dupont@email.fr')
};

describe('buildSeller', () => {
  describe('normal VAT regime', () => {
    it('should build a seller with normal VAT regime', () => {
      const result = buildSeller(validatedNormalInput);

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result)) {
        expect(result.right.vatRegime).toBe('normal');
        expect(result.right.companyName).toBe('ACME SARL');
        expect(result.right.email).toBe('contact@acme.fr');
      }
    });

    it('should include VAT number and tax debit option for normal regime', () => {
      const result = buildSeller(validatedNormalInput);

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result) && result.right.vatRegime === 'normal') {
        expect(result.right.vatNumber).toBe('FR32123456789');
        expect(result.right.taxDebitOption).toBe(false);
      }
    });

    it('should reject normal regime without VAT number', () => {
      const result = buildSeller({ ...validatedNormalInput, vatNumber: null as unknown as VatNumber });

      expect(Either.isLeft(result)).toBe(true);
      if (Either.isLeft(result)) {
        expect(result.left._tag).toBe('VatNumberRequiredForNormalRegime');
      }
    });

    it('should accept share capital for SARL', () => {
      const result = buildSeller({ ...validatedNormalInput, shareCapital: ShareCapital(10000) });

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result)) {
        expect(result.right.shareCapital).toBe(10000);
      }
    });
  });

  describe('franchise en base regime', () => {
    it('should build a seller with franchise en base', () => {
      const result = buildSeller(validatedFranchiseInput);

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result)) {
        expect(result.right.vatRegime).toBe('franchise_en_base');
      }
    });

    it('should not include VAT number for franchise en base', () => {
      const result = buildSeller(validatedFranchiseInput);

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result)) {
        expect('vatNumber' in result.right).toBe(false);
      }
    });

    it('should not include tax debit option for franchise en base', () => {
      const result = buildSeller(validatedFranchiseInput);

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result)) {
        expect('taxDebitOption' in result.right).toBe(false);
      }
    });

    it('should reject tax debit option with franchise en base', () => {
      const result = buildSeller({ ...validatedFranchiseInput, taxDebitOption: true });

      expect(Either.isLeft(result)).toBe(true);
      if (Either.isLeft(result)) {
        expect(result.left._tag).toBe('TaxDebitOptionNotAllowedForFranchise');
      }
    });
  });

  describe('share capital rules', () => {
    it('should reject share capital for EI', () => {
      const result = buildSeller({
        ...validatedFranchiseInput,
        shareCapital: ShareCapital(10000)
      });

      expect(Either.isLeft(result)).toBe(true);
      if (Either.isLeft(result)) {
        expect(result.left._tag).toBe('ShareCapitalNotAllowedForEI');
      }
    });

    it('should accept no share capital for EI', () => {
      const result = buildSeller(validatedFranchiseInput);

      expect(Either.isRight(result)).toBe(true);
    });
  });

  describe('optional fields', () => {
    it('should include phone when provided', () => {
      const result = buildSeller({ ...validatedNormalInput, phone: Phone('+33123456789') });

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result)) {
        expect(result.right.phone).toBe('+33123456789');
      }
    });

    it('should include website when provided', () => {
      const result = buildSeller({ ...validatedNormalInput, website: Website('https://acme.fr') });

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result)) {
        expect(result.right.website).toBe('https://acme.fr');
      }
    });

    it('should include RCS registration when provided', () => {
      const result = buildSeller({ ...validatedNormalInput, rcsRegistration: RcsRegistration('RCS Paris 123 456 789') });

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result)) {
        expect(result.right.rcsRegistration).toBe('RCS Paris 123 456 789');
      }
    });
  });

  describe('address', () => {
    it('should assemble address from street, zipcode, and city', () => {
      const result = buildSeller(validatedNormalInput);

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result)) {
        expect(result.right.address).toEqual({
          street: '10 Rue du Commerce',
          zipcode: '75015',
          city: 'Paris',
          inseeCode: '75115'
        });
      }
    });
  });
});
