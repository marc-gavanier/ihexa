import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { Alert } from './alert';
import { blockKindArg, directionArg, statusColorArg } from './storybook';

const AlertContent = (): ReactNode => 'This is an alert message.';

const meta = {
  title: 'Libraries/UI/Primitives/Alert',
  component: Alert,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    ...statusColorArg('alert'),
    ...blockKindArg('alert'),
    ...directionArg('alert'),
    children: {
      table: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlertDefault: Story = {
  args: { children: AlertContent() }
};

export const AlertInfo: Story = {
  args: { color: 'alert-info', children: AlertContent() }
};

export const AlertSuccess: Story = {
  args: { color: 'alert-success', children: AlertContent() }
};

export const AlertWarning: Story = {
  args: { color: 'alert-warning', children: AlertContent() }
};

export const AlertError: Story = {
  args: { color: 'alert-error', children: AlertContent() }
};

export const AlertOutline: Story = {
  args: { kind: 'alert-outline', children: AlertContent() }
};

export const AlertDash: Story = {
  args: { kind: 'alert-dash', children: AlertContent() }
};

export const AlertSoft: Story = {
  args: { kind: 'alert-soft', children: AlertContent() }
};

export const AlertVertical: Story = {
  args: { direction: 'alert-vertical', children: AlertContent() }
};

export const AlertHorizontal: Story = {
  args: { direction: 'alert-horizontal', children: AlertContent() }
};
