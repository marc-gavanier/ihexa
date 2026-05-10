import type { Company } from '@/libraries/recherche-entreprises';
import { search } from '@/libraries/recherche-entreprises';
import type { CompanySearchResult, SearchCompany } from '../../domain';

const NATURE_JURIDIQUE: Record<string, string> = {
  '1000': 'EI',
  '5410': 'SARL',
  '5499': 'SAS',
  '5505': 'SA',
  '5498': 'EURL',
  '5710': 'SASU',
  '5720': 'SCI',
  '5306': 'SNC',
  '9220': 'Association'
};

const toLegalForm = (code: string): string => NATURE_JURIDIQUE[code] ?? code;

const toCompanySearchResult = (company: Company): CompanySearchResult => ({
  companyName: company.fullName,
  legalForm: toLegalForm(company.legalForm),
  siren: company.siren,
  siret: company.headquarters?.siret ?? '',
  street: company.headquarters?.address ?? '',
  zipcode: company.headquarters?.postalCode ?? '',
  city: company.headquarters?.city ?? '',
  inseeCode: company.headquarters?.inseeCode ?? ''
});

export const searchCompany: SearchCompany = async (query) => {
  const result = await search(query).include(['headquarters']).execute();
  return result.companies.map(toCompanySearchResult);
};
