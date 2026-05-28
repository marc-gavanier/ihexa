'use server';

import { withInput } from '@arckit/nextjs';
import { actionBuilder } from '@/configuration/nextjs';
import { withErrorReporter } from '@/configuration/observability/error-reporter/server';
import { withLogger } from '@/configuration/observability/logger/server';
import { withMetrics } from '@/configuration/observability/metrics/server';
import { withTracer } from '@/configuration/observability/tracer/server';
import { searchCompanyValidation } from '@/features/client/abilities/create-client/action/search-company.validation';
import { searchCompany } from '@/features/client/abilities/create-client/implementations';

export const searchCompanyForClientAction = actionBuilder()
  .use(withTracer('action.searchCompanyForClient', { kind: 'server' }))
  .use(withMetrics('searchCompanyForClient'))
  .use(withInput(searchCompanyValidation))
  .use(withLogger('searchCompanyForClientAction'))
  .use(withErrorReporter('searchCompanyForClientAction'))
  .execute(async ({ input }) => searchCompany(input));
