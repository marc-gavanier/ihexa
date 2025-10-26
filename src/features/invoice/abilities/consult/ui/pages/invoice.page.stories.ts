import translations from '@public/locales/en-US/invoices.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { runPromise } from 'effect/Effect';
import { init } from 'i18next';
import { Amount, Invoice, InvoiceId, Quantity } from '@/features/invoice/domain';
import { Line, LineLabel } from '@/features/invoice/domain/line';
import { Address, City, FirstName, LastName, Name, PostalCode, Recipient, Street } from '@/features/invoice/domain/recipient';
import { toI18nConfig } from '@/libraries/i18n/load-i18n';
import { InvoicePage } from './invoice.page';

const meta = {
  title: 'Features/Invoice/Consult/Pages/Invoice page',
  component: InvoicePage,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof InvoicePage>;

export default meta;

type Story = StoryObj<typeof meta>;

await init(
  toI18nConfig({
    lng: 'en-US',
    ns: 'invoices'
  })(translations)
);

export const Default: Story = {
  args: {
    invoice: await runPromise(
      Invoice(
        InvoiceId('b06f2a21-d137-4557-80e1-6e6d44669cf6'),
        [Line(LineLabel('Item 1'), Quantity(2), Amount(100_00)), Line(LineLabel('Item 2'), Quantity(1), Amount(50_00))],
        Recipient(
          Name(FirstName('John'), LastName('Doe')),
          Address(Street('123 Main St'), City('Anytown'), PostalCode('12345'))
        )
      )
    )
  }
};
