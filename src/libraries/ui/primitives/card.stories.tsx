import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { Card } from './card';
import { scaleArg } from './storybook';

const CardContent = (): ReactNode => (
  <div className='card-body'>
    <h2 className='card-title'>Card</h2>
    <p>Card with a body containing a title and a description paragraph.</p>
  </div>
);

const meta = {
  title: 'Libraries/UI/Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    ...scaleArg('card'),
    kind: {
      control: 'select',
      options: ['card-dash', 'card-border']
    },
    children: {
      table: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardDefault: Story = {
  args: { children: CardContent() }
};

export const CardXl: Story = {
  args: { scale: 'card-xl', children: CardContent() }
};

export const CardLg: Story = {
  args: { scale: 'card-lg', children: CardContent() }
};

export const CardMd: Story = {
  args: { scale: 'card-md', children: CardContent() }
};

export const CardSm: Story = {
  args: { scale: 'card-sm', children: CardContent() }
};

export const CardXs: Story = {
  args: { scale: 'card-xs', children: CardContent() }
};

export const CardBorder: Story = {
  args: { kind: 'card-border', children: CardContent() }
};

export const CardDash: Story = {
  args: { kind: 'card-dash', children: CardContent() }
};
