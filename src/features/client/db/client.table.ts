import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { CITY_MAX_LENGTH } from '@/features/client/domain/address/city';
import { STREET_MAX_LENGTH } from '@/features/client/domain/address/street';
import { FIRSTNAME_MAX_LENGTH } from '@/features/client/domain/name/firstname';
import { LASTNAME_MAX_LENGTH } from '@/features/client/domain/name/lastname';

const ZIPCODE_LENGTH = 5;

export const clientsTable = pgTable('client', {
  id: uuid().primaryKey(),
  firstname: varchar({ length: FIRSTNAME_MAX_LENGTH }).notNull(),
  lastname: varchar({ length: LASTNAME_MAX_LENGTH }).notNull(),
  street: varchar({ length: STREET_MAX_LENGTH }).notNull(),
  city: varchar({ length: CITY_MAX_LENGTH }).notNull(),
  zipcode: varchar({ length: ZIPCODE_LENGTH }).notNull()
});
