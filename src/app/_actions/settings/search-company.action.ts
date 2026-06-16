'use server';

import { withInput } from '@arckit/nextjs';
import { Schema } from 'effect';
import { actionBuilder } from '@/configuration/nextjs';
import { withErrorReporter } from '@/configuration/telemetry/error-reporter/server';
import { withLogger } from '@/configuration/telemetry/logger/server';
import { withMetrics } from '@/configuration/telemetry/metrics/server';
import { withTracer } from '@/configuration/telemetry/tracer/server';
import { searchCompanyValidation } from '@/features/settings/abilities/configure-seller/action/search-company.validation';
import { searchCompany } from '@/features/settings/abilities/configure-seller/implementations';

export const searchCompanyAction = actionBuilder()
  .use(withTracer('action.searchCompany', { kind: 'server' }))
  .use(withMetrics('searchCompany'))
  .use(withInput(Schema.standardSchemaV1(searchCompanyValidation)))
  .use(withLogger('searchCompanyAction'))
  .use(withErrorReporter('searchCompanyAction'))
  .execute(async ({ input }) => searchCompany(input));
