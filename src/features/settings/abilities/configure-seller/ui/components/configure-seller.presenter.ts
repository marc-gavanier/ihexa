import type { Seller } from '@/features/settings/domain/seller';
import type { CompanySummary } from '@/libraries/recherche-entreprises';

export type ConfigureSellerViewModel = {
  readonly company: CompanySummary | null;
  readonly vatRegime: string;
  readonly vatNumber: string;
  readonly taxDebitOption: boolean;
  readonly rcsRegistration: string;
  readonly shareCapital: string;
  readonly email: string;
  readonly phone: string;
  readonly website: string;
};

const EMPTY_SELLER = {
  company: null,
  vatRegime: '',
  vatNumber: '',
  taxDebitOption: false,
  rcsRegistration: '',
  shareCapital: '',
  email: '',
  phone: '',
  website: ''
};

export const presentSeller = (seller: Seller | null): ConfigureSellerViewModel =>
  seller
    ? {
        company: {
          companyName: seller.companyName,
          legalForm: seller.legalForm,
          siren: seller.siren,
          siret: seller.siret,
          street: seller.address.street,
          zipcode: seller.address.zipcode,
          city: seller.address.city,
          inseeCode: seller.address.inseeCode
        },
        vatRegime: seller.vatRegime,
        vatNumber: seller.vatRegime === 'normal' ? seller.vatNumber : '',
        taxDebitOption: seller.vatRegime === 'normal' ? seller.taxDebitOption : false,
        rcsRegistration: seller.rcsRegistration ?? '',
        shareCapital: seller.shareCapital != null ? String(seller.shareCapital) : '',
        email: seller.email,
        phone: seller.phone ?? '',
        website: seller.website ?? ''
      }
    : EMPTY_SELLER;

export const showVatFields = (vatRegime: string): boolean => vatRegime === 'normal';

export const showShareCapital = (legalForm: string): boolean => legalForm !== '' && legalForm !== 'EI';
