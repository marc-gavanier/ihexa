import invoices from '@public/locales/en-US/invoices.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { withI18nProvider } from '@/configuration/storybook';
import { Invoice } from '@/features/invoice/domain';
import { ConsultInvoiceLoading } from './consult-invoice.loading';
import { ConsultInvoicePage } from './consult-invoice.page';

const meta = {
  title: 'Features/Invoice/ConsultInvoice',
  component: ConsultInvoicePage,
  parameters: { layout: 'padded' },
  decorators: [
    withI18nProvider('en-US', { invoices }),
    (Story) => (
      <div className='mx-auto w-full max-w-7xl px-4 py-6'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ConsultInvoicePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: StoryObj = {
  render: () => <ConsultInvoiceLoading />
};

export const SingleLine: Story = {
  args: {
    invoice: Invoice({
      id: '550e8400-e29b-41d4-a716-446655440000',
      recipient: {
        name: { firstname: 'Jean', lastname: 'Dupont' },
        address: { street: '123 Rue de la Paix', city: 'Paris', zipcode: '75001' }
      },
      lines: [{ label: 'Prestation de conseil', quantity: 1, amount: 150 }]
    })
  }
};

export const MultipleLines: Story = {
  args: {
    invoice: Invoice({
      id: '550e8400-e29b-41d4-a716-446655440001',
      recipient: {
        name: { firstname: 'Marie', lastname: 'Martin' },
        address: { street: '45 Avenue des Champs-Élysées', city: 'Paris', zipcode: '75008' }
      },
      lines: [
        { label: 'Prestation de conseil', quantity: 2, amount: 150 },
        { label: 'Développement logiciel', quantity: 1, amount: 500 },
        { label: 'Formation équipe', quantity: 3, amount: 200 }
      ]
    })
  }
};
