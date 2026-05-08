import { boolean, integer, pgTable, real, varchar } from 'drizzle-orm/pg-core';

const STARTING_POINT_MAX_LENGTH = 20;
const PAYMENT_METHODS_MAX_LENGTH = 255;
const DISCOUNT_TAG_MAX_LENGTH = 20;
const IBAN_MAX_LENGTH = 34;

export const paymentTermsTable = pgTable('payment_terms', {
  startingPoint: varchar({ length: STARTING_POINT_MAX_LENGTH }).notNull(),
  days: integer().notNull(),
  endOfMonth: boolean().notNull(),
  penaltyRate: real().notNull(),
  discountTag: varchar({ length: DISCOUNT_TAG_MAX_LENGTH }).notNull(),
  discountRate: real(),
  discountDelayThreshold: integer(),
  paymentMethods: varchar({ length: PAYMENT_METHODS_MAX_LENGTH }).notNull(),
  iban: varchar({ length: IBAN_MAX_LENGTH })
});
