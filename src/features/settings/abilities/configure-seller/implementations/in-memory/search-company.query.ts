import { Either } from 'effect';
import { SIRET_PATTERN } from '@/features/settings/domain/seller/siret';
import type { CompanySearchResult } from '@/libraries/company-registry';
import { InvalidSiretFormat } from '@/libraries/company-registry';
import type { SearchCompany } from '../../company-search';
import { COMPANY_FIXTURES } from './company-fixtures';

const isSiretQuery = (query: string): boolean => /^\d+$/.test(query);

export const searchCompany: SearchCompany = async (query) => {
  if (isSiretQuery(query)) {
    if (!SIRET_PATTERN.test(query)) {
      return Either.left(new InvalidSiretFormat({ siret: query }));
    }
    const results: readonly CompanySearchResult[] = COMPANY_FIXTURES.filter((c) => c.siret === query).map(
      ({ companyName, siret, siren, legalForm }) => ({ companyName, siret, siren, legalForm })
    );
    return Either.right(results);
  }

  const normalizedQuery = query.toLowerCase();
  const results: readonly CompanySearchResult[] = COMPANY_FIXTURES.filter((c) =>
    c.companyName.toLowerCase().includes(normalizedQuery)
  ).map(({ companyName, siret, siren, legalForm }) => ({ companyName, siret, siren, legalForm }));
  return Either.right(results);
};
