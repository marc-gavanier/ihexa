import { Schema } from 'effect';
import { InseeCode, SellerCity, SellerStreet, SellerZipcode } from '@/features/settings/domain/seller/address';
import { CompanyName } from '@/features/settings/domain/seller/company-name';
import { Email } from '@/features/settings/domain/seller/email';
import { LegalForm } from '@/features/settings/domain/seller/legal-form';
import { Phone } from '@/features/settings/domain/seller/phone';
import { RcsRegistration } from '@/features/settings/domain/seller/rcs-registration';
import type { Seller } from '@/features/settings/domain/seller/seller';
import { ShareCapital } from '@/features/settings/domain/seller/share-capital';
import { Siren } from '@/features/settings/domain/seller/siren';
import { Siret } from '@/features/settings/domain/seller/siret';
import { VatNumber } from '@/features/settings/domain/seller/vat-number';
import { Website } from '@/features/settings/domain/seller/website';
import type { sellerTable } from './seller.table';

type SellerRow = typeof sellerTable.$inferSelect;

export const sellerToDomain = (row: SellerRow): Seller => ({
  companyName: CompanyName(row.companyName),
  legalForm: Schema.decodeUnknownSync(LegalForm)(row.legalForm),
  siren: Siren(row.siren),
  siret: Siret(row.siret),
  address: {
    street: SellerStreet(row.street),
    zipcode: SellerZipcode(row.zipcode),
    city: SellerCity(row.city),
    inseeCode: InseeCode(row.inseeCode)
  },
  email: Email(row.email),
  ...(row.rcsRegistration != null ? { rcsRegistration: RcsRegistration(row.rcsRegistration) } : {}),
  ...(row.phone != null ? { phone: Phone(row.phone) } : {}),
  ...(row.website != null ? { website: Website(row.website) } : {}),
  ...(row.shareCapital != null ? { shareCapital: ShareCapital(row.shareCapital) } : {}),
  ...(row.vatRegime === 'normal' && row.vatNumber != null
    ? { vatRegime: 'normal', vatNumber: VatNumber(row.vatNumber), taxDebitOption: row.taxDebitOption ?? false }
    : { vatRegime: 'franchise_en_base' })
});

export const sellerFromDomain = (seller: Seller): SellerRow => ({
  companyName: seller.companyName,
  legalForm: seller.legalForm,
  siren: seller.siren,
  siret: seller.siret,
  street: seller.address.street,
  zipcode: seller.address.zipcode,
  city: seller.address.city,
  inseeCode: seller.address.inseeCode,
  vatRegime: seller.vatRegime,
  ...(seller.vatRegime === 'normal'
    ? {
        vatNumber: seller.vatNumber,
        taxDebitOption: seller.taxDebitOption
      }
    : { vatNumber: null, taxDebitOption: null }),
  rcsRegistration: seller.rcsRegistration ?? null,
  shareCapital: seller.shareCapital ?? null,
  email: seller.email,
  phone: seller.phone ?? null,
  website: seller.website ?? null
});
