import { Toaster } from '@arckit/daisyui/blocks-client';
import createTranslations from '@public/locales/en-US/clients.create.json';
import listTranslations from '@public/locales/en-US/clients.list.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { withI18nProvider } from '@/configuration/storybook';
import { AddClientButton } from './add-client-button';
import { provideCreateClientDefaults } from './create-client.story-defaults';

const meta = {
  title: 'Features/Client/AddClientButton',
  component: AddClientButton,
  parameters: { layout: 'centered' },
  decorators: [
    withI18nProvider('en-US', {
      'clients.list': listTranslations,
      'clients.create': createTranslations
    }),
    (Story) => (
      <div className='mx-auto w-full max-w-7xl px-4 py-6'>
        <Toaster directionY='toast-top' />
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof AddClientButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      provideCreateClientDefaults();
      return <Story />;
    }
  ]
};
