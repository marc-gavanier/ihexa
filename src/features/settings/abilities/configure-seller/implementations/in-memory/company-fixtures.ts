import type { CompanySummary } from '@/libraries/recherche-entreprises';

export const COMPANY_FIXTURES: readonly CompanySummary[] = [
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
    street: '10 Rue du Commerce',
    zipcode: '75015',
    city: 'Paris',
    inseeCode: '75115'
  },
  {
    companyName: 'DUPONT EI',
    legalForm: 'EI',
    siren: '987654321',
    siret: '98765432100012',
    street: '5 Avenue de la Paix',
    zipcode: '69001',
    city: 'Lyon',
    inseeCode: '69123'
  }
];
