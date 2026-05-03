import { boolean, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { CITY_MAX_LENGTH, STREET_MAX_LENGTH } from '@/features/settings/domain/seller/address';
import { COMPANY_NAME_MAX_LENGTH } from '@/features/settings/domain/seller/company-name';

const SIREN_LENGTH = 9;
const SIRET_LENGTH = 14;
const ZIPCODE_LENGTH = 5;
const INSEE_CODE_LENGTH = 5;
const VAT_NUMBER_MAX_LENGTH = 13;
const LEGAL_FORM_MAX_LENGTH = 10;
const VAT_REGIME_MAX_LENGTH = 20;
const EMAIL_MAX_LENGTH = 255;
const PHONE_MAX_LENGTH = 15;
const WEBSITE_MAX_LENGTH = 255;
const RCS_REGISTRATION_MAX_LENGTH = 255;

export const sellerTable = pgTable('seller', {
  companyName: varchar({ length: COMPANY_NAME_MAX_LENGTH }).notNull(),
  legalForm: varchar({ length: LEGAL_FORM_MAX_LENGTH }).notNull(),
  siren: varchar({ length: SIREN_LENGTH }).notNull(),
  siret: varchar({ length: SIRET_LENGTH }).primaryKey(),
  street: varchar({ length: STREET_MAX_LENGTH }).notNull(),
  zipcode: varchar({ length: ZIPCODE_LENGTH }).notNull(),
  city: varchar({ length: CITY_MAX_LENGTH }).notNull(),
  inseeCode: varchar({ length: INSEE_CODE_LENGTH }).notNull(),
  vatRegime: varchar({ length: VAT_REGIME_MAX_LENGTH }).notNull(),
  vatNumber: varchar({ length: VAT_NUMBER_MAX_LENGTH }),
  taxDebitOption: boolean(),
  rcsRegistration: varchar({ length: RCS_REGISTRATION_MAX_LENGTH }),
  shareCapital: integer(),
  email: varchar({ length: EMAIL_MAX_LENGTH }).notNull(),
  phone: varchar({ length: PHONE_MAX_LENGTH }),
  website: varchar({ length: WEBSITE_MAX_LENGTH })
});
