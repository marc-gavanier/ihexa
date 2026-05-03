import { Either } from 'effect';
import { CompanyNotFound } from '@/libraries/company-registry';
import type { SelectCompany } from '../../company-search';
import { COMPANY_FIXTURES } from './company-fixtures';

export const selectCompany: SelectCompany = async (siret) => {
  const company = COMPANY_FIXTURES.find((c) => c.siret === siret);
  if (!company) {
    return Either.left(new CompanyNotFound({ query: siret }));
  }

  return Either.right(company);
};
