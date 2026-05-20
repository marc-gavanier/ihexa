import { Toaster } from '@arckit/daisyui/blocks-client';
import { ServerActionError } from '@arckit/nextjs/client';
import translations from '@public/locales/en-US/clients.create.json';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useEffect } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { inject, provide } from '@/configuration/injection';
import { withI18nProvider } from '@/configuration/storybook';
import { CREATE_B2B_CLIENT_ACTION_KEY, CREATE_B2C_CLIENT_ACTION_KEY } from '../../action/create-client.key';
import { provideCreateClientDefaults } from './create-client.story-defaults';
import { CREATE_CLIENT_MODAL_KEY, CreateClientModal } from './create-client-modal';

const OpenedModalDecorator = (Story: () => React.ReactElement) => {
  useEffect(() => {
    inject(CREATE_CLIENT_MODAL_KEY).open();
  }, []);
  return <Story />;
};

const meta = {
  title: 'Features/Client/CreateClientModal',
  component: CreateClientModal,
  parameters: { layout: 'centered' },
  decorators: [
    withI18nProvider('en-US', { 'clients.create': translations }),
    (Story) => (
      <div className='mx-auto w-full max-w-7xl px-4 py-6'>
        <Toaster directionY='toast-top' />
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof CreateClientModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const selectB2BTab = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const b2bTab = await canvas.findByText(/Company \(B2B\)/i);
  await userEvent.click(b2bTab);
};

const selectGoogleFrance = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const search = await canvas.findByLabelText(/Search company/i);
  await userEvent.type(search, 'GOOGLE');
  const option = await canvas.findByRole('option', { name: /GOOGLE FRANCE/i });
  await userEvent.click(option);
};

export const Default: Story = {
  decorators: [
    (Story) => {
      provideCreateClientDefaults();
      return <Story />;
    },
    OpenedModalDecorator
  ]
};

export const B2BEmpty: Story = {
  decorators: [
    (Story) => {
      provideCreateClientDefaults();
      return <Story />;
    },
    OpenedModalDecorator
  ],
  play: async ({ canvasElement }) => {
    await selectB2BTab(canvasElement);
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText(/Search company/i)).toBeVisible();
  }
};

export const B2BWithCompanySelected: Story = {
  decorators: [
    (Story) => {
      provideCreateClientDefaults();
      return <Story />;
    },
    OpenedModalDecorator
  ],
  play: async ({ canvasElement }) => {
    await selectB2BTab(canvasElement);
    await selectGoogleFrance(canvasElement);
    const canvas = within(canvasElement);
    await expect(canvas.getByText('GOOGLE FRANCE')).toBeVisible();
    await expect(canvas.getByText('44306184100047')).toBeVisible();
    await expect(canvas.getByLabelText(/email/i)).toBeVisible();
    await expect(canvas.getByLabelText(/phone/i)).toBeVisible();
  }
};

export const WithB2CError: Story = {
  decorators: [
    (Story) => {
      provideCreateClientDefaults();
      provide(CREATE_B2C_CLIENT_ACTION_KEY, async () => ServerActionError('error.clientAlreadyExists'));
      return <Story />;
    },
    OpenedModalDecorator
  ]
};

export const WithB2BSiretError: Story = {
  decorators: [
    (Story) => {
      provideCreateClientDefaults();
      provide(CREATE_B2B_CLIENT_ACTION_KEY, async () => ServerActionError('error.siretAlreadyExists'));
      return <Story />;
    },
    OpenedModalDecorator
  ]
};
