import { Toaster } from '@arckit/daisyui/blocks-client';
import { ServerActionError, ServerActionSuccess } from '@arckit/nextjs/client';
import translations from '@public/locales/en-US/settings.configure-seller.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { provide } from '@/configuration/injection';
import { withI18nProvider } from '@/configuration/storybook';
import { InseeCode, SellerCity, SellerStreet, SellerZipcode } from '@/features/settings/domain/seller/address';
import { CompanyName } from '@/features/settings/domain/seller/company-name';
import { Email } from '@/features/settings/domain/seller/email';
import { Siren } from '@/features/settings/domain/seller/siren';
import { Siret } from '@/features/settings/domain/seller/siret';
import { VatNumber } from '@/features/settings/domain/seller/vat-number';
import type { CompanySummary } from '@/libraries/recherche-entreprises';
import { CONFIGURE_SELLER_KEY } from '../../action/configure-seller.key';
import { SEARCH_COMPANY_KEY } from '../../action/search-company.key';
import { type ConfigureSellerViewModel, presentSeller } from '../components/configure-seller.presenter';
import { ConfigureSellerPage } from './configure-seller.page';

const GOOGLE_FRANCE: CompanySummary = {
  companyName: 'GOOGLE FRANCE',
  legalForm: 'SAS',
  siren: '443061841',
  siret: '44306184100047',
  street: '8 Rue de Londres',
  zipcode: '75009',
  city: 'Paris',
  inseeCode: '75109'
};

const ACME_SARL: CompanySummary = {
  companyName: 'ACME SARL',
  legalForm: 'SARL',
  siren: '123456789',
  siret: '12345678900014',
  street: '10 Rue du Commerce',
  zipcode: '75015',
  city: 'Paris',
  inseeCode: '75115'
};

const COMPANY_FIXTURES = [GOOGLE_FRANCE, ACME_SARL];

const provideDefaults = () => {
  provide(SEARCH_COMPANY_KEY, async (query: string) => {
    const results = COMPANY_FIXTURES.filter((c) => c.companyName.toLowerCase().includes(query.toLowerCase()));
    return ServerActionSuccess(results);
  });
};

const EXISTING_SELLER: ConfigureSellerViewModel = {
  company: GOOGLE_FRANCE,
  vatRegime: 'normal',
  vatNumber: 'FR12443061841',
  taxDebitOption: true,
  rcsRegistration: '',
  shareCapital: '',
  email: 'contact@google.fr',
  phone: '',
  website: ''
};

const meta: Meta<typeof ConfigureSellerPage> = {
  title: 'Features/Settings/ConfigureSeller',
  component: ConfigureSellerPage,
  parameters: { layout: 'padded' },
  decorators: [
    withI18nProvider('en-US', { 'settings.configure-seller': translations }),
    (Story) => (
      <div className='mx-auto w-full max-w-7xl px-4 py-6'>
        <Toaster directionY='toast-top' />
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { seller: presentSeller(null) },
  decorators: [
    (Story) => {
      provideDefaults();
      provide(CONFIGURE_SELLER_KEY, async () =>
        ServerActionSuccess({
          companyName: CompanyName('ACME SARL'),
          legalForm: 'SARL',
          siren: Siren('123456789'),
          siret: Siret('12345678900014'),
          address: {
            street: SellerStreet('10 Rue du Commerce'),
            zipcode: SellerZipcode('75015'),
            city: SellerCity('Paris'),
            inseeCode: InseeCode('75115')
          },
          vatRegime: 'normal',
          vatNumber: VatNumber('FR12123456789'),
          taxDebitOption: false,
          email: Email('contact@acme.fr')
        })
      );
      return <Story />;
    }
  ]
};

export const WithExistingConfiguration: Story = {
  args: { seller: EXISTING_SELLER },
  decorators: [
    (Story) => {
      provideDefaults();
      provide(CONFIGURE_SELLER_KEY, async () =>
        ServerActionSuccess({
          companyName: CompanyName('GOOGLE FRANCE'),
          legalForm: 'SAS',
          siren: Siren('443061841'),
          siret: Siret('44306184100047'),
          address: {
            street: SellerStreet('8 Rue de Londres'),
            zipcode: SellerZipcode('75009'),
            city: SellerCity('Paris'),
            inseeCode: InseeCode('75109')
          },
          vatRegime: 'normal',
          vatNumber: VatNumber('FR12443061841'),
          taxDebitOption: true,
          email: Email('contact@google.fr')
        })
      );
      return <Story />;
    }
  ]
};

export const WithError: Story = {
  args: { seller: presentSeller(null) },
  decorators: [
    (Story) => {
      provideDefaults();
      provide(CONFIGURE_SELLER_KEY, async () => ServerActionError('error.shareCapitalNotAllowedForEI' as const));
      return <Story />;
    }
  ]
};
