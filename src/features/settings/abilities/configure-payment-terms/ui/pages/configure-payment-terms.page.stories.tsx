import { Toaster } from '@arckit/daisyui/blocks-client';
import { ServerActionError, ServerActionSuccess } from '@arckit/nextjs/client';
import translations from '@public/locales/en-US/settings.configure-payment-terms.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { provide } from '@/configuration/injection';
import { withI18nProvider } from '@/configuration/storybook';
import {
  DiscountDelayThreshold,
  DiscountRate,
  noDiscount,
  withDiscount
} from '@/features/settings/domain/payment-terms/early-payment-discount';
import { Iban } from '@/features/settings/domain/payment-terms/iban';
import { PenaltyRate } from '@/features/settings/domain/payment-terms/penalty-rate';
import { CONFIGURE_PAYMENT_TERMS_KEY } from '../../action/configure-payment-terms.key';
import { type ConfigurePaymentTermsViewModel, presentPaymentTerms } from '../components';
import { ConfigurePaymentTermsPage } from './configure-payment-terms.page';

const EXISTING_PAYMENT_TERMS: ConfigurePaymentTermsViewModel = {
  startingPoint: 'from_invoice_date',
  days: '30',
  endOfMonth: false,
  penaltyRate: '15',
  earlyPaymentDiscountTag: 'NoDiscount',
  discountRate: '',
  discountDelayThreshold: '',
  paymentMethods: { bank_transfer: true, check: false, direct_debit: false, credit_card: false },
  iban: 'FR7630006000011234567890189'
};

const meta: Meta<typeof ConfigurePaymentTermsPage> = {
  title: 'Features/Settings/ConfigurePaymentTerms',
  component: ConfigurePaymentTermsPage,
  parameters: { layout: 'padded' },
  decorators: [
    withI18nProvider('en-US', { 'settings.configure-payment-terms': translations }),
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
  args: { paymentTerms: presentPaymentTerms(null) },
  decorators: [
    (Story) => {
      provide(CONFIGURE_PAYMENT_TERMS_KEY, async () =>
        ServerActionSuccess({
          deadline: { startingPoint: 'from_invoice_date' as const, days: 30, endOfMonth: false },
          penaltyRate: PenaltyRate(15),
          earlyPaymentDiscount: noDiscount,
          paymentMethods: ['bank_transfer' as const],
          iban: Iban('FR7630006000011234567890189')
        })
      );
      return <Story />;
    }
  ]
};

export const WithExistingConfiguration: Story = {
  args: { paymentTerms: EXISTING_PAYMENT_TERMS },
  decorators: [
    (Story) => {
      provide(CONFIGURE_PAYMENT_TERMS_KEY, async () =>
        ServerActionSuccess({
          deadline: { startingPoint: 'from_invoice_date' as const, days: 30, endOfMonth: false },
          penaltyRate: PenaltyRate(15),
          earlyPaymentDiscount: noDiscount,
          paymentMethods: ['bank_transfer' as const],
          iban: Iban('FR7630006000011234567890189')
        })
      );
      return <Story />;
    }
  ]
};

export const WithDiscount: Story = {
  args: {
    paymentTerms: {
      ...EXISTING_PAYMENT_TERMS,
      earlyPaymentDiscountTag: 'WithDiscount',
      discountRate: '2',
      discountDelayThreshold: '10'
    }
  },
  decorators: [
    (Story) => {
      provide(CONFIGURE_PAYMENT_TERMS_KEY, async () =>
        ServerActionSuccess({
          deadline: { startingPoint: 'from_invoice_date' as const, days: 30, endOfMonth: false },
          penaltyRate: PenaltyRate(15),
          earlyPaymentDiscount: withDiscount(DiscountRate(2), DiscountDelayThreshold(10)),
          paymentMethods: ['bank_transfer' as const],
          iban: Iban('FR7630006000011234567890189')
        })
      );
      return <Story />;
    }
  ]
};

export const WithError: Story = {
  args: { paymentTerms: presentPaymentTerms(null) },
  decorators: [
    (Story) => {
      provide(CONFIGURE_PAYMENT_TERMS_KEY, async () => ServerActionError('error.bankTransferRequiresIban' as const));
      return <Story />;
    }
  ]
};
