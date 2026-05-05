'use server';

import { withInput } from '@arckit/nextjs';
import { withLogger } from '@/configuration/logger';
import { actionBuilder } from '@/configuration/nextjs';
import { searchCompanyValidation } from '@/features/settings/abilities/configure-seller/action/search-company.validation';
import { searchCompany } from '@/features/settings/abilities/configure-seller/implementations';

export const searchCompanyAction = actionBuilder()
  .use(withInput(searchCompanyValidation))
  .use(withLogger('searchCompanyAction'))
  .execute(async ({ input }) => searchCompany(input));
