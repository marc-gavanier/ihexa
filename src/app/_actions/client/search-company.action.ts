'use server';

import { withInput } from '@arckit/nextjs';
import { Schema } from 'effect';
import { actionBuilder } from '@/configuration/nextjs';
import { withErrorReporter } from '@/configuration/telemetry/error-reporter/server';
import { withLogger } from '@/configuration/telemetry/logger/server';
import { withMetrics } from '@/configuration/telemetry/metrics/server';
import { withTracer } from '@/configuration/telemetry/tracer/server';
import { searchCompanyValidation } from '@/features/client/abilities/create-client/action/search-company.validation';
import { searchCompany } from '@/features/client/abilities/create-client/implementations';

export const searchCompanyForClientAction = actionBuilder()
  .use(withTracer('action.searchCompanyForClient', { kind: 'server' }))
  .use(withMetrics('searchCompanyForClient'))
  .use(withInput(Schema.standardSchemaV1(searchCompanyValidation)))
  .use(withLogger('searchCompanyForClientAction'))
  .use(withErrorReporter('searchCompanyForClientAction'))
  .execute(async ({ input }) => searchCompany(input));
