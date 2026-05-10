import type { CompanySearchResult } from '../../domain';

export const COMPANY_FIXTURES: readonly CompanySearchResult[] = [
  {
    companyName: 'GOOGLE FRANCE',
    legalForm: 'SAS',
    siren: '443061841',
    siret: '44306184100047',
    street: '8 Rue de Londres',
    zipcode: '75009',
    city: 'Paris',
    inseeCode: '75109'
  },
  {
    companyName: 'ACME SARL',
    legalForm: 'SARL',
    siren: '123456789',
    siret: '12345678900014',
    street: '15 Rue du Commerce',
    zipcode: '33000',
    city: 'Bordeaux',
    inseeCode: '33063'
  },
  {
    companyName: 'DUPONT EI',
    legalForm: 'EI',
    siren: '802954785',
    siret: '80295478500028',
    street: '5 Avenue de la Paix',
    zipcode: '69001',
    city: 'Lyon',
    inseeCode: '69123'
  }
];
