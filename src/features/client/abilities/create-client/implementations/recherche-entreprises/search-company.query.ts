import { search } from '@/configuration/recherche-entreprises';
import type { FormeJuridique } from '@/features/client/domain/forme-juridique';
import type { Company, Establishment } from '@/libraries/recherche-entreprises';
import type { CompanySearchResult, SearchCompany } from '../../domain';

const NATURE_JURIDIQUE: Record<string, FormeJuridique> = {
  '1000': 'EI',
  '5306': 'SNC',
  '5308': 'SCS',
  '5385': 'SCA',
  '5410': 'SARL',
  '5485': 'SELARL',
  '5498': 'EURL',
  '5499': 'SAS',
  '5505': 'SA',
  '5585': 'SELAFA',
  '5685': 'SELCA',
  '5710': 'SASU',
  '5720': 'SCI',
  '5785': 'SELAS',
  '6220': 'GIE',
  '6316': 'Mutuelle',
  '6317': 'Mutuelle',
  '6411': 'Coopérative',
  '6470': 'Coopérative',
  '6533': 'SCP',
  '6534': 'SCM',
  '6540': 'SCEA',
  '6585': 'GAEC',
  '6589': 'EARL',
  '7220': 'EPIC',
  '9220': 'Association',
  '9230': 'Association',
  '9260': 'Association'
};

const toLegalForm = (code: string): FormeJuridique | undefined => NATURE_JURIDIQUE[code];

type CompanyWithKnownLegalForm = Company & {
  readonly headquarters: Establishment & { readonly postalCode: string };
  readonly resolvedLegalForm: FormeJuridique;
};

const withKnownLegalForm = (company: Company): CompanyWithKnownLegalForm | null => {
  if (company.headquarters === null || company.headquarters.postalCode === null) return null;
  const resolvedLegalForm = toLegalForm(company.legalForm);
  if (resolvedLegalForm === undefined) return null;
  return {
    ...company,
    headquarters: { ...company.headquarters, postalCode: company.headquarters.postalCode },
    resolvedLegalForm
  };
};

const isPresent = <T>(value: T | null): value is T => value !== null;

const toCompanySearchResult = (company: CompanyWithKnownLegalForm): CompanySearchResult => ({
  companyName: company.fullName,
  legalForm: company.resolvedLegalForm,
  siren: company.siren,
  siret: company.headquarters.siret,
  street: company.headquarters.address,
  zipcode: company.headquarters.postalCode,
  city: company.headquarters.city,
  inseeCode: company.headquarters.inseeCode ?? ''
});

export const searchCompany: SearchCompany = async (query) => {
  const result = await search(query).include(['headquarters']).execute();
  return result.companies.map(withKnownLegalForm).filter(isPresent).map(toCompanySearchResult);
};
