import translations from '@public/locales/en-US/clients.create.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ClientToCreate } from '@/features/client/domain';
import { provide } from '@/libraries/injection';
import { ServerActionError, ServerActionSuccess } from '@/libraries/nextjs/action';
import { withI18nProvider } from '@/libraries/storybook';
import { Toaster } from '@/libraries/ui/blocks/toaster';
import { CREATE_CLIENT_ACTION_KEY } from '../../action';
import { CreateClientPage } from './create-client.page';

const meta = {
  title: 'Features/Client/CreateClient',
  component: CreateClientPage,
  parameters: { layout: 'padded' },
  decorators: [
    withI18nProvider('en-US', { 'clients.create': translations }),
    (Story) => (
      <div className='mx-auto w-full max-w-7xl px-4 py-6'>
        <Toaster directionY='toast-top' />
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof CreateClientPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      provide(CREATE_CLIENT_ACTION_KEY, async () =>
        ServerActionSuccess({
          id: crypto.randomUUID(),
          name: { firstname: 'Jean-Pierre', lastname: 'DUPONT' },
          address: { street: '123 Rue de la Paix', city: 'Paris', zipcode: '75001' }
        } as ClientToCreate)
      );
      return <Story />;
    }
  ]
};

export const WithError: Story = {
  decorators: [
    (Story) => {
      provide(CREATE_CLIENT_ACTION_KEY, async () => ServerActionError('error.clientAlreadyExists'));
      return <Story />;
    }
  ]
};
