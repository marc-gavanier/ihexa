import type { CompanySummary } from '@/libraries/recherche-entreprises';
import type { ConfigureSellerInput } from '../../action/configure-seller.validation';

interface ConfigureSellerFormValues {
  readonly company: CompanySummary | null;
  readonly vatRegime: string;
  readonly vatNumber: string;
  readonly taxDebitOption: boolean;
  readonly rcsRegistration: string;
  readonly shareCapital: string;
  readonly email: string;
  readonly phone: string;
  readonly website: string;
}

export const toConfigureSellerInput = (values: ConfigureSellerFormValues): ConfigureSellerInput => ({
  company: values.company ?? {
    companyName: '',
    legalForm: '',
    siren: '',
    siret: '',
    street: '',
    zipcode: '',
    city: '',
    inseeCode: ''
  },
  vatRegime: values.vatRegime,
  email: values.email,
  ...(values.vatNumber !== '' ? { vatNumber: values.vatNumber } : {}),
  ...(values.taxDebitOption ? { taxDebitOption: values.taxDebitOption } : {}),
  ...(values.rcsRegistration !== '' ? { rcsRegistration: values.rcsRegistration } : {}),
  ...(values.shareCapital !== '' ? { shareCapital: Number(values.shareCapital) } : {}),
  ...(values.phone !== '' ? { phone: values.phone } : {}),
  ...(values.website !== '' ? { website: values.website } : {})
});
