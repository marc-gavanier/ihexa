import type { CompanySummary } from '@/libraries/recherche-entreprises';
import type { CreateB2BClientInput } from '../../action/create-client.validation';

export type CreateB2BClientFormValues = {
  readonly id: string;
  readonly company: CompanySummary | null;
  readonly email: string;
  readonly phone: string;
};

type CompanyInput = CreateB2BClientInput['company'];

const EMPTY_COMPANY: CompanyInput = {
  companyName: '',
  legalForm: '',
  siret: '',
  street: '',
  zipcode: '',
  city: ''
};

const toCompanyInput = (company: CompanySummary | null): CompanyInput =>
  company === null
    ? EMPTY_COMPANY
    : {
        companyName: company.companyName,
        legalForm: company.legalForm,
        siret: company.siret,
        street: company.street,
        zipcode: company.zipcode,
        city: company.city
      };

export const emptyB2BClientFormValues = (): CreateB2BClientFormValues => ({
  id: crypto.randomUUID(),
  company: null,
  email: '',
  phone: ''
});

export const toCreateB2BClientInput = (values: CreateB2BClientFormValues): CreateB2BClientInput => ({
  id: values.id,
  company: toCompanyInput(values.company),
  ...(values.email !== '' ? { email: values.email } : {}),
  ...(values.phone !== '' ? { phone: values.phone } : {})
});
