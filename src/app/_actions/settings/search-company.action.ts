'use server';

import { withInput } from '@arckit/nextjs';
import { actionBuilder } from '@/configuration/nextjs';
import { withErrorReporter } from '@/configuration/observability/error-reporter/server';
import { withLogger } from '@/configuration/observability/logger/server';
import { withMetrics } from '@/configuration/observability/metrics/server';
import { withTracer } from '@/configuration/observability/tracer/server';
import { searchCompanyValidation } from '@/features/settings/abilities/configure-seller/action/search-company.validation';
import { searchCompany } from '@/features/settings/abilities/configure-seller/implementations';

export const searchCompanyAction = actionBuilder()
  .use(withTracer('action.searchCompany', { kind: 'server' }))
  .use(withMetrics('searchCompany'))
  .use(withInput(searchCompanyValidation))
  .use(withLogger('searchCompanyAction'))
  .use(withErrorReporter('searchCompanyAction'))
  .execute(async ({ input }) => searchCompany(input));
