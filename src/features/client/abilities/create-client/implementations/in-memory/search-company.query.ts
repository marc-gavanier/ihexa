import type { SearchCompany } from '../../domain';
import { COMPANY_FIXTURES } from './company-fixtures';

export const searchCompany: SearchCompany = async (query: string) => {
  const normalizedQuery = query.toLowerCase();
  return COMPANY_FIXTURES.filter((c) => c.companyName.toLowerCase().includes(normalizedQuery) || c.siret.includes(query));
};
