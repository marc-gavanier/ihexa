import translations from '@public/locales/en-US/clients.create.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { provide } from '@/libraries/injection';
import { ServerActionSuccess } from '@/libraries/nextjs/action';
import { withI18nProvider } from '@/libraries/storybook';
import { CREATE_CLIENT_ACTION_KEY } from '../../injection';
import { CreateClientPage } from './create-client.page';

const meta = {
  title: 'Features/Client/CreateClient',
  component: CreateClientPage,
  parameters: { layout: 'padded' },
  decorators: [
    withI18nProvider('en-US', { 'clients.create': translations }),
    (Story) => {
      provide(CREATE_CLIENT_ACTION_KEY, async () => ServerActionSuccess());
      return (
        <div className='mx-auto w-full max-w-7xl px-4 py-6'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof CreateClientPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
