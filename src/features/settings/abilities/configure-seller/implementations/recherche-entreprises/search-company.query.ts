import { search } from '@/configuration/recherche-entreprises';
import type { Company, CompanySummary } from '@/libraries/recherche-entreprises';

type SearchCompany = (query: string) => Promise<readonly CompanySummary[]>;

const NATURE_JURIDIQUE: Record<string, string> = {
  '1000': 'EI',
  '5410': 'SARL',
  '5499': 'SAS',
  '5505': 'SA',
  '5498': 'EURL',
  '5720': 'SCI',
  '5306': 'SNC'
};

const toLegalForm = (code: string): string => NATURE_JURIDIQUE[code] ?? code;

const toCompanySummary = (company: Company): CompanySummary => ({
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
  return result.companies.map(toCompanySummary);
};
