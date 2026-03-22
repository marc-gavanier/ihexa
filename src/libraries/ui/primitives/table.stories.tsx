import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { Badge } from './badge';
import { Button } from './button';
import { Table, type TableProps } from './table';

const sampleData = [
  { id: 1, name: 'Cy Ganderton', job: 'Quality Control Specialist', color: 'Blue' },
  { id: 2, name: 'Hart Hagerty', job: 'Desktop Support Technician', color: 'Purple' },
  { id: 3, name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' }
];

const DefaultTableContent = () => (
  <>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {sampleData.map((row) => (
        <tr key={row.id}>
          <th>{row.id}</th>
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>{row.color}</td>
        </tr>
      ))}
    </tbody>
  </>
);

const meta = {
  title: 'Libraries/UI/Primitives/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Table component for displaying tabular data. Supports different sizes, zebra striping, and pinned rows/columns for scrollable tables.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    scale: {
      control: 'select',
      options: ['table-xl', 'table-lg', 'table-md', 'table-sm', 'table-xs'],
      description: 'Size of the table cells padding',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    modifier: {
      control: 'select',
      options: ['table-zebra', 'table-pin-rows', 'table-pin-cols'],
      description: 'Table behavior modifier',
      table: {
        category: 'Behavior',
        type: { summary: 'Modifier' }
      }
    },
    children: {
      description: 'Table content (thead, tbody, tfoot)',
      table: { category: 'Content' }
    },
    className: {
      description: 'Additional CSS classes',
      table: { category: 'Styling' }
    }
  },
  args: {
    children: <DefaultTableContent />
  }
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

// =============================================================================
// Scales
// =============================================================================

export const ExtraLarge: Story = {
  args: { scale: 'table-xl' },
  parameters: {
    docs: {
      description: { story: 'Extra large table with more padding.' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'table-lg' },
  parameters: {
    docs: {
      description: { story: 'Large table size.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'table-md' },
  parameters: {
    docs: {
      description: { story: 'Medium table size (default).' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'table-sm' },
  parameters: {
    docs: {
      description: { story: 'Small table with compact padding.' }
    }
  }
};

export const ExtraSmall: Story = {
  args: { scale: 'table-xs' },
  parameters: {
    docs: {
      description: { story: 'Extra small table for dense data.' }
    }
  }
};

export const AllScales: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {(['table-xl', 'table-lg', 'table-md', 'table-sm', 'table-xs'] as const).map((scale) => (
        <div key={scale}>
          <h3 className='mb-2 font-semibold'>{scale}</h3>
          <Table scale={scale}>
            <DefaultTableContent />
          </Table>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all available sizes.' }
    }
  }
};

// =============================================================================
// Modifiers
// =============================================================================

export const Zebra: Story = {
  args: { modifier: 'table-zebra' },
  parameters: {
    docs: {
      description: { story: 'Alternating row colors for better readability.' }
    }
  }
};

export const PinRows: Story = {
  args: { modifier: 'table-pin-rows' },
  decorators: [
    (Story) => (
      <div className='h-48 overflow-auto'>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 20 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static demo data
          <tr key={`pin-row-${i}`}>
            <th>{i + 1}</th>
            <td>User {i + 1}</td>
            <td>Job Title {i + 1}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: { story: 'Header row stays visible when scrolling vertically.' }
    }
  }
};

export const PinCols: Story = {
  args: { modifier: 'table-pin-cols' },
  decorators: [
    (Story) => (
      <div className='w-96 overflow-auto'>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Department</th>
          <th>Location</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row) => (
          <tr key={row.id}>
            <th>{row.id}</th>
            <td className='whitespace-nowrap'>{row.name}</td>
            <td>Engineering</td>
            <td>New York</td>
            <td>email@example.com</td>
            <td>+1 234 567 890</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: { story: 'First column stays visible when scrolling horizontally.' }
    }
  }
};

export const AllModifiers: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div>
        <h3 className='mb-2 font-semibold'>Default</h3>
        <Table>
          <DefaultTableContent />
        </Table>
      </div>
      <div>
        <h3 className='mb-2 font-semibold'>Zebra</h3>
        <Table modifier='table-zebra'>
          <DefaultTableContent />
        </Table>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Comparison of table modifiers.' }
    }
  }
};

// =============================================================================
// Combinations
// =============================================================================

export const SmallZebra: Story = {
  args: {
    scale: 'table-sm',
    modifier: 'table-zebra'
  },
  parameters: {
    docs: {
      description: { story: 'Compact zebra-striped table.' }
    }
  }
};

export const LargePinRows: Story = {
  args: {
    scale: 'table-lg',
    modifier: 'table-pin-rows'
  },
  decorators: [
    (Story) => (
      <div className='h-64 overflow-auto'>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 15 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static demo data
          <tr key={`large-row-${i}`}>
            <th>{i + 1}</th>
            <td>User {i + 1}</td>
            <td>Job Title {i + 1}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: { story: 'Large table with pinned header.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const WithActions: Story = {
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Job</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row) => (
          <tr key={row.id}>
            <th>{row.id}</th>
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td>
              <div className='flex gap-1'>
                <Button scale='btn-xs' kind='btn-ghost'>
                  <RiEditLine size={16} />
                </Button>
                <Button scale='btn-xs' kind='btn-ghost' color='btn-error'>
                  <RiDeleteBinLine size={16} />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: { story: 'Table with action buttons per row.' }
    }
  }
};

export const WithSelection: Story = {
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th>
            <input type='checkbox' className='checkbox checkbox-sm' />
          </th>
          <th>Name</th>
          <th>Job</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row, index) => (
          <tr key={row.id}>
            <th>
              <input type='checkbox' className='checkbox checkbox-sm' defaultChecked={index === 0} />
            </th>
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td>
              <Badge scale='badge-sm' color={index === 0 ? 'badge-success' : 'badge-warning'}>
                {index === 0 ? 'Active' : 'Pending'}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: { story: 'Table with row selection checkboxes and status badges.' }
    }
  }
};

export const WithFooter: Story = {
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Widget A</td>
          <td>10</td>
          <td>$100.00</td>
        </tr>
        <tr>
          <td>Widget B</td>
          <td>5</td>
          <td>$75.00</td>
        </tr>
        <tr>
          <td>Widget C</td>
          <td>8</td>
          <td>$120.00</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th>23</th>
          <th>$295.00</th>
        </tr>
      </tfoot>
    </Table>
  ),
  parameters: {
    docs: {
      description: { story: 'Table with footer row for totals.' }
    }
  }
};

export const Empty: Story = {
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={3} className='text-center text-base-content/50'>
            No data available
          </td>
        </tr>
      </tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: { story: 'Empty table state.' }
    }
  }
};

export const Compact: Story = {
  args: {
    scale: 'table-xs',
    modifier: 'table-zebra'
  },
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static demo data
          <tr key={`compact-row-${i}`}>
            <td>{1000 + i}</td>
            <td>Item {i + 1}</td>
            <td>
              <Badge scale='badge-xs' color={i % 2 === 0 ? 'badge-success' : 'badge-info'}>
                {i % 2 === 0 ? 'Done' : 'Active'}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: { story: 'Compact table for dense data display.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const scales: Array<TableProps['scale']> = [undefined, 'table-lg', 'table-md', 'table-sm', 'table-xs'];
const modifiers: Array<TableProps['modifier']> = [undefined, 'table-zebra'];

export const Matrix: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {modifiers.map((modifier) => (
        <div key={modifier ?? 'default-modifier'}>
          <h3 className='mb-4 font-semibold'>{modifier ?? 'Default'}</h3>
          <div className='flex flex-col gap-4'>
            {scales.map((scale) => (
              <div key={`${modifier}-${scale}`}>
                <p className='mb-1 text-sm text-base-content/70'>{scale ?? 'Default scale'}</p>
                <Table scale={scale} modifier={modifier}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Item</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Item</td>
                      <td>200</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of scale × modifier combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole('table');
    const headers = canvas.getAllByRole('columnheader');

    await expect(table).toBeVisible();
    await expect(headers).toHaveLength(4);
  },
  parameters: {
    docs: {
      description: { story: 'Verifies table has proper semantic structure.' }
    }
  }
};
