import { Either } from 'effect';
import { db } from '@/configuration/drizzle';
import { paymentTermsTable, paymentTermsToDomain } from '@/features/settings/db';
import { PaymentTermsNotConfigured } from '@/features/settings/domain/payment-terms';
import type { GetPaymentTermsConfiguration } from '../../domain';

export const getPaymentTermsConfiguration: GetPaymentTermsConfiguration = async () => {
  const [row] = await db.select().from(paymentTermsTable).limit(1);
  return row ? Either.right(paymentTermsToDomain(row)) : Either.left(PaymentTermsNotConfigured);
};
