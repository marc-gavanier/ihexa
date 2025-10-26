import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InvoicePageLoader } from '@/features/invoice/abilities/consult';

const meta = {
  title: 'Features/Invoice/Consult/Pages/Invoice page loader',
  component: InvoicePageLoader,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof InvoicePageLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
