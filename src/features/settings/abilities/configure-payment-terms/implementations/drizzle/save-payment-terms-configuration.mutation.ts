import { Either } from 'effect';
import { db } from '@/configuration/drizzle';
import { paymentTermsFromDomain, paymentTermsTable } from '@/features/settings/db';
import { buildPaymentTerms } from '@/features/settings/domain/payment-terms';
import type { SavePaymentTermsConfiguration } from '../../domain';

export const savePaymentTermsConfiguration: SavePaymentTermsConfiguration = async (input) => {
  const result = buildPaymentTerms(input);

  if (Either.isLeft(result)) return result;

  const paymentTerms = result.right;
  const row = paymentTermsFromDomain(paymentTerms);
  await db.delete(paymentTermsTable);
  await db.insert(paymentTermsTable).values(row);

  return Either.right(paymentTerms);
};
