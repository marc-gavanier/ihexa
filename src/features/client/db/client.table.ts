import { sql } from 'drizzle-orm';
import { index, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { CITY_MAX_LENGTH } from '@/features/client/domain/address/city';
import { STREET_MAX_LENGTH } from '@/features/client/domain/address/street';
import { DENOMINATION_SOCIALE_MAX_LENGTH } from '@/features/client/domain/denomination-sociale';
import { FIRSTNAME_MAX_LENGTH } from '@/features/client/domain/name/firstname';
import { LASTNAME_MAX_LENGTH } from '@/features/client/domain/name/lastname';

const ZIPCODE_LENGTH = 5;
const SIRET_LENGTH = 14;
const TVA_LENGTH = 13;
const EMAIL_MAX_LENGTH = 320;
const PHONE_MAX_LENGTH = 16;
const FORME_JURIDIQUE_MAX_LENGTH = 20;

export const clientsTable = pgTable(
  'client',
  {
    id: uuid().primaryKey(),
    type: varchar({ length: 10 }).notNull().default('B2C'),
    firstname: varchar({ length: FIRSTNAME_MAX_LENGTH }),
    lastname: varchar({ length: LASTNAME_MAX_LENGTH }),
    denominationSociale: varchar({ length: DENOMINATION_SOCIALE_MAX_LENGTH }),
    formeJuridique: varchar({ length: FORME_JURIDIQUE_MAX_LENGTH }),
    siret: varchar({ length: SIRET_LENGTH }).unique(),
    tvaIntracommunautaire: varchar({ length: TVA_LENGTH }),
    street: varchar({ length: STREET_MAX_LENGTH }).notNull(),
    city: varchar({ length: CITY_MAX_LENGTH }).notNull(),
    zipcode: varchar({ length: ZIPCODE_LENGTH }).notNull(),
    email: varchar({ length: EMAIL_MAX_LENGTH }),
    phone: varchar({ length: PHONE_MAX_LENGTH }),
    searchText: text().generatedAlwaysAs(
      sql`lower(immutable_unaccent(coalesce(firstname, '') || ' ' || coalesce(lastname, '') || ' ' || coalesce(denomination_sociale, '') || ' ' || street || ' ' || city || ' ' || zipcode))`
    )
  },
  (table) => [index('client_search_text_trgm_idx').using('gin', sql`${table.searchText} gin_trgm_ops`)]
);
