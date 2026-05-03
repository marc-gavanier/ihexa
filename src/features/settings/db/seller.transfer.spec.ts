import { describe, expect, it } from 'vitest';
import { InseeCode, SellerCity, SellerStreet, SellerZipcode } from '@/features/settings/domain/seller/address';
import { CompanyName } from '@/features/settings/domain/seller/company-name';
import { Email } from '@/features/settings/domain/seller/email';
import { Phone } from '@/features/settings/domain/seller/phone';
import { RcsRegistration } from '@/features/settings/domain/seller/rcs-registration';
import type { NormalVatSeller } from '@/features/settings/domain/seller/seller';
import { ShareCapital } from '@/features/settings/domain/seller/share-capital';
import { Siren } from '@/features/settings/domain/seller/siren';
import { Siret } from '@/features/settings/domain/seller/siret';
import { VatNumber } from '@/features/settings/domain/seller/vat-number';
import { Website } from '@/features/settings/domain/seller/website';
import { sellerFromDomain, sellerToDomain } from './seller.transfer';

describe('seller transfer', () => {
  it('should preserve seller data through round-trip conversion for normal VAT seller', () => {
    const seller: NormalVatSeller = {
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
      vatNumber: VatNumber('FR32123456789'),
      taxDebitOption: false,
      shareCapital: ShareCapital(10000),
      rcsRegistration: RcsRegistration('RCS Paris'),
      email: Email('contact@acme.fr'),
      phone: Phone('+33123456789'),
      website: Website('https://acme.fr')
    };

    const result = sellerToDomain(sellerFromDomain(seller));

    expect(result).toStrictEqual(seller);
  });

  it('should preserve seller data through round-trip conversion for franchise en base seller', () => {
    const seller = {
      companyName: CompanyName('DUPONT EI'),
      legalForm: 'EI' as const,
      siren: Siren('987654321'),
      siret: Siret('98765432100012'),
      address: {
        street: SellerStreet('5 Avenue de la Paix'),
        zipcode: SellerZipcode('69001'),
        city: SellerCity('Lyon'),
        inseeCode: InseeCode('69123')
      },
      vatRegime: 'franchise_en_base' as const,
      email: Email('dupont@email.fr')
    };

    const result = sellerToDomain(sellerFromDomain(seller));

    expect(result).toStrictEqual(seller);
  });
});
