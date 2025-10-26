import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { scaleArg } from './storybook';
import { Table } from './table';

const TableContent = (): ReactNode => (
  <>
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </>
);

const meta = {
  title: 'Libraries/UI/Primitives/Table',
  component: Table,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    ...scaleArg('table'),
    modifier: {
      control: 'select',
      options: ['table-zebra', 'table-pin-rows', 'table-pin-cols']
    },
    children: {
      table: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TableDefault: Story = {
  args: { children: TableContent() }
};

export const TableXl: Story = {
  args: { scale: 'table-xl', children: TableContent() }
};

export const TableLg: Story = {
  args: { scale: 'table-lg', children: TableContent() }
};

export const TableMd: Story = {
  args: { scale: 'table-md', children: TableContent() }
};

export const TableSm: Story = {
  args: { scale: 'table-sm', children: TableContent() }
};

export const TableXs: Story = {
  args: { scale: 'table-xs', children: TableContent() }
};

export const TableZebra: Story = {
  args: { modifier: 'table-zebra', children: TableContent() }
};

export const TablePinCols: Story = {
  args: { modifier: 'table-pin-cols', children: TableContent() }
};

export const TablePinRows: Story = {
  args: { modifier: 'table-pin-rows', children: TableContent() }
};
