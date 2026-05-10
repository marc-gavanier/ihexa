import { filtered, Page, PageSize, paginate, Search } from '@arckit/resultset';
import translations from '@public/locales/en-US/clients.list.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { withI18nProvider } from '@/configuration/storybook';
import { B2CClient } from '@/features/client/domain';
import { presentListClients } from '../components';
import { ListClientsPage } from './list-clients.page';

const CLIENT_JEAN = B2CClient({
  _tag: 'B2CClient',
  id: '550e8400-e29b-41d4-a716-446655440001',
  name: { firstname: 'Jean', lastname: 'DUPONT' },
  address: { street: '123 Rue de la Paix', city: 'Paris', zipcode: '75001' }
});

const CLIENT_MARIE = B2CClient({
  _tag: 'B2CClient',
  id: '550e8400-e29b-41d4-a716-446655440002',
  name: { firstname: 'Marie', lastname: 'MARTIN' },
  address: { street: '456 Avenue Foch', city: 'Lyon', zipcode: '69001' }
});

const CLIENT_PIERRE = B2CClient({
  _tag: 'B2CClient',
  id: '550e8400-e29b-41d4-a716-446655440003',
  name: { firstname: 'Pierre', lastname: 'BERNARD' },
  address: { street: '789 Boulevard', city: 'Marseille', zipcode: '13001' }
});

const meta: Meta<typeof ListClientsPage> = {
  title: 'Features/Client/ListClients',
  component: ListClientsPage,
  parameters: { layout: 'padded' },
  decorators: [
    withI18nProvider('en-US', { 'clients.list': translations }),
    (Story) => (
      <div className='mx-auto w-full max-w-7xl px-4 py-6'>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    view: presentListClients(filtered(paginate([CLIENT_JEAN, CLIENT_MARIE, CLIENT_PIERRE])), ''),
    search: Search('')
  }
};

export const Empty: Story = {
  args: {
    view: presentListClients(filtered(paginate([])), ''),
    search: Search('')
  }
};

export const NoResults: Story = {
  args: {
    view: presentListClients(filtered(paginate([])), 'xyz'),
    search: Search('xyz')
  }
};

export const WithSearch: Story = {
  args: {
    view: presentListClients(filtered(paginate([CLIENT_JEAN])), 'jean'),
    search: Search('jean')
  }
};

export const WithPagination: Story = {
  args: {
    view: presentListClients(
      filtered(
        paginate(
          Array.from({ length: 25 }, (_, i) =>
            B2CClient({
              _tag: 'B2CClient',
              id: `550e8400-e29b-41d4-a716-4466554400${String(i + 1).padStart(2, '0')}`,
              name: { firstname: `Client${i + 1}`, lastname: 'TEST' },
              address: { street: '1 Rue A', city: `City${i + 1}`, zipcode: '75001' }
            })
          ),
          { page: Page(1), pageSize: PageSize(10) }
        )
      ),
      ''
    ),
    search: Search('')
  }
};
