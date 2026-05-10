'use server';

import { withInput } from '@arckit/nextjs';
import { withLogger } from '@/configuration/logger';
import { actionBuilder } from '@/configuration/nextjs';
import { searchCompanyValidation } from '@/features/client/abilities/create-client/action/search-company.validation';
import { searchCompany } from '@/features/client/abilities/create-client/implementations';

export const searchCompanyForClientAction = actionBuilder()
  .use(withInput(searchCompanyValidation))
  .use(withLogger('searchCompanyForClientAction'))
  .execute(async ({ input }) => searchCompany(input));
