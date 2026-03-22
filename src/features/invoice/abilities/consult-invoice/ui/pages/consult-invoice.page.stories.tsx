import invoices from '@public/locales/en-US/invoices.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Schema } from 'effect';
import { Invoice } from '@/features/invoice/domain';
import { translation } from '@/libraries/storybook';
import { ConsultInvoiceLoadingContent } from './consult-invoice.loading';
import { ConsultInvoicePageContent } from './consult-invoice.page';

const t = translation('en-US', { invoices });

const meta = {
  title: 'Features/Invoice/ConsultInvoice',
  component: ConsultInvoicePageContent,
  parameters: { layout: 'padded' },
  args: { t }
} satisfies Meta<typeof ConsultInvoicePageContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: StoryObj = {
  render: () => <ConsultInvoiceLoadingContent t={t} />
};

export const SingleLine: Story = {
  args: {
    invoice: Schema.decodeSync(Invoice)({
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
    invoice: Schema.decodeSync(Invoice)({
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
