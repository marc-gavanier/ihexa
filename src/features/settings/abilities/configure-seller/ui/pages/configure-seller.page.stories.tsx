import { Toaster } from '@arckit/daisyui/blocks-client';
import { ServerActionError, ServerActionSuccess } from '@arckit/nextjs';
import translations from '@public/locales/en-US/settings.configure-seller.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { provide } from '@/configuration/injection';
import { withI18nProvider } from '@/configuration/storybook';
import type { Seller } from '@/features/settings/domain/seller';
import type { CompanySummary } from '@/libraries/recherche-entreprises';
import { CONFIGURE_SELLER_KEY } from '../../action/configure-seller.key';
import { SEARCH_COMPANY_KEY } from '../../action/search-company.key';
import { type ConfigureSellerViewModel, presentSeller } from '../components/configure-seller.presenter';
import { ConfigureSellerPage } from './configure-seller.page';

const COMPANY_FIXTURES: readonly CompanySummary[] = [
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
  }
];

const provideDefaults = () => {
  provide(SEARCH_COMPANY_KEY, async (query: string) => {
    const results = COMPANY_FIXTURES.filter((c) => c.companyName.toLowerCase().includes(query.toLowerCase()));
    return ServerActionSuccess(results);
  });
};

const EXISTING_SELLER: ConfigureSellerViewModel = {
  company: COMPANY_FIXTURES[0],
  vatRegime: 'normal',
  vatNumber: 'FR12443061841',
  taxDebitOption: true,
  rcsRegistration: '',
  shareCapital: '',
  email: 'contact@google.fr',
  phone: '',
  website: ''
};

const meta = {
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
} satisfies Meta<typeof ConfigureSellerPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { seller: presentSeller(null) },
  decorators: [
    (Story) => {
      provideDefaults();
      provide(CONFIGURE_SELLER_KEY, async () =>
        ServerActionSuccess({
          companyName: 'ACME SARL',
          legalForm: 'SARL',
          siren: '123456789',
          siret: '12345678900014',
          address: { street: '10 Rue du Commerce', zipcode: '75015', city: 'Paris', inseeCode: '75115' },
          vatRegime: 'normal',
          vatNumber: 'FR12123456789',
          taxDebitOption: false,
          email: 'contact@acme.fr'
        } as Seller)
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
      provide(CONFIGURE_SELLER_KEY, async () => ServerActionSuccess({} as Seller));
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
