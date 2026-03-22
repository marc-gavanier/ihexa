import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiLogoutBoxLine, RiSettings3Line, RiUserLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { Popover, Trigger } from './popover';

const meta = {
  title: 'Libraries/UI/Primitives/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Popover component for displaying floating content triggered by a button. Built on Radix UI with button styling support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'btn-accent',
        'btn-error',
        'btn-info',
        'btn-neutral',
        'btn-primary',
        'btn-secondary',
        'btn-success',
        'btn-warning'
      ],
      description: 'Button color',
      table: {
        category: 'Appearance',
        type: { summary: 'Color' }
      }
    },
    kind: {
      control: 'select',
      options: ['btn-dash', 'btn-ghost', 'btn-link', 'btn-outline', 'btn-soft'],
      description: 'Button style variant',
      table: {
        category: 'Appearance',
        type: { summary: 'Kind' }
      }
    },
    scale: {
      control: 'select',
      options: ['btn-lg', 'btn-md', 'btn-sm', 'btn-xl', 'btn-xs'],
      description: 'Button size',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls popover visibility',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
    contentClassName: {
      control: 'text',
      description: 'CSS class for popover content',
      table: {
        category: 'Styling',
        type: { summary: 'string' }
      }
    },
    trigger: {
      description: 'Button trigger content',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    },
    children: {
      description: 'Popover content',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    }
  },
  args: {
    trigger: <Trigger>Options</Trigger>,
    children: (
      <ul>
        <li>
          <span>Item 1</span>
        </li>
        <li>
          <span>Item 2</span>
        </li>
        <li>
          <span>Item 3</span>
        </li>
      </ul>
    )
  },
  decorators: [
    (Story) => (
      <div className='p-32'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

// =============================================================================
// States
// =============================================================================

export const Closed: Story = {
  args: { isOpen: false },
  parameters: {
    docs: {
      description: { story: 'Popover in closed state.' }
    }
  }
};

export const Open: Story = {
  args: { isOpen: true },
  parameters: {
    docs: {
      description: { story: 'Popover forced open for demonstration.' }
    }
  }
};

// =============================================================================
// Button Colors
// =============================================================================

export const Primary: Story = {
  args: { color: 'btn-primary' },
  parameters: {
    docs: {
      description: { story: 'Primary colored trigger button.' }
    }
  }
};

export const Secondary: Story = {
  args: { color: 'btn-secondary' },
  parameters: {
    docs: {
      description: { story: 'Secondary colored trigger button.' }
    }
  }
};

export const Neutral: Story = {
  args: { color: 'btn-neutral' },
  parameters: {
    docs: {
      description: { story: 'Neutral colored trigger button.' }
    }
  }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Popover trigger={<Trigger>Default</Trigger>}>
        <ul>
          <li>
            <span>Item</span>
          </li>
        </ul>
      </Popover>
      <Popover color='btn-primary' trigger={<Trigger>Primary</Trigger>}>
        <ul>
          <li>
            <span>Item</span>
          </li>
        </ul>
      </Popover>
      <Popover color='btn-secondary' trigger={<Trigger>Secondary</Trigger>}>
        <ul>
          <li>
            <span>Item</span>
          </li>
        </ul>
      </Popover>
      <Popover color='btn-neutral' trigger={<Trigger>Neutral</Trigger>}>
        <ul>
          <li>
            <span>Item</span>
          </li>
        </ul>
      </Popover>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of button colors.' }
    }
  }
};

// =============================================================================
// Button Styles
// =============================================================================

export const Ghost: Story = {
  args: { kind: 'btn-ghost' },
  parameters: {
    docs: {
      description: { story: 'Ghost style trigger.' }
    }
  }
};

export const Outline: Story = {
  args: { kind: 'btn-outline' },
  parameters: {
    docs: {
      description: { story: 'Outline style trigger.' }
    }
  }
};

export const Soft: Story = {
  args: { kind: 'btn-soft' },
  parameters: {
    docs: {
      description: { story: 'Soft style trigger.' }
    }
  }
};

export const AllKinds: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Popover trigger={<Trigger>Default</Trigger>}>
        <ul>
          <li>
            <span>Item</span>
          </li>
        </ul>
      </Popover>
      <Popover kind='btn-ghost' trigger={<Trigger>Ghost</Trigger>}>
        <ul>
          <li>
            <span>Item</span>
          </li>
        </ul>
      </Popover>
      <Popover kind='btn-outline' trigger={<Trigger>Outline</Trigger>}>
        <ul>
          <li>
            <span>Item</span>
          </li>
        </ul>
      </Popover>
      <Popover kind='btn-soft' trigger={<Trigger>Soft</Trigger>}>
        <ul>
          <li>
            <span>Item</span>
          </li>
        </ul>
      </Popover>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of button styles.' }
    }
  }
};

// =============================================================================
// Button Sizes
// =============================================================================

export const Large: Story = {
  args: { scale: 'btn-lg' },
  parameters: {
    docs: {
      description: { story: 'Large trigger button.' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'btn-sm' },
  parameters: {
    docs: {
      description: { story: 'Small trigger button.' }
    }
  }
};

export const ExtraSmall: Story = {
  args: { scale: 'btn-xs' },
  parameters: {
    docs: {
      description: { story: 'Extra small trigger button.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const UserMenu: Story = {
  args: {
    trigger: <Trigger>John Doe</Trigger>,
    children: (
      <ul className='w-52'>
        <li>
          <span>
            <RiUserLine />
            Profile
          </span>
        </li>
        <li>
          <span>
            <RiSettings3Line />
            Settings
          </span>
        </li>
        <li className='border-t border-base-300'>
          <span className='text-error'>
            <RiLogoutBoxLine />
            Logout
          </span>
        </li>
      </ul>
    )
  },
  parameters: {
    docs: {
      description: { story: 'User account dropdown menu.' }
    }
  }
};

export const ActionsMenu: Story = {
  args: {
    color: 'btn-primary',
    trigger: <Trigger>Actions</Trigger>,
    children: (
      <ul className='w-48'>
        <li>
          <span>Edit</span>
        </li>
        <li>
          <span>Duplicate</span>
        </li>
        <li>
          <span>Archive</span>
        </li>
        <li className='border-t border-base-300'>
          <span className='text-error'>Delete</span>
        </li>
      </ul>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Actions dropdown with destructive option.' }
    }
  }
};

export const FilterMenu: Story = {
  args: {
    kind: 'btn-outline',
    trigger: <Trigger>Filter</Trigger>,
    contentClassName: 'p-4 w-64',
    children: (
      <div className='flex flex-col gap-3'>
        <label className='flex items-center gap-2'>
          <input type='checkbox' className='checkbox checkbox-sm' defaultChecked />
          <span>Active</span>
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' className='checkbox checkbox-sm' />
          <span>Pending</span>
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' className='checkbox checkbox-sm' />
          <span>Completed</span>
        </label>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Filter popover with checkboxes.' }
    }
  }
};

export const SortMenu: Story = {
  args: {
    kind: 'btn-ghost',
    scale: 'btn-sm',
    trigger: <Trigger>Sort by</Trigger>,
    children: (
      <ul className='w-40'>
        <li>
          <span className='active'>Newest</span>
        </li>
        <li>
          <span>Oldest</span>
        </li>
        <li>
          <span>Name A-Z</span>
        </li>
        <li>
          <span>Name Z-A</span>
        </li>
      </ul>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Sort options menu.' }
    }
  }
};

export const CustomTrigger: Story = {
  args: {
    trigger: 'Click me',
    children: (
      <div className='p-4'>
        <p>Custom trigger without arrow icon.</p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Popover with custom trigger text (no Trigger component).' }
    }
  }
};

export const CardContent: Story = {
  args: {
    trigger: <Trigger>Details</Trigger>,
    contentClassName: 'card card-sm bg-base-100 w-72',
    children: (
      <div className='card-body'>
        <h3 className='card-title'>Quick Info</h3>
        <p className='text-sm'>This popover contains card-styled content for richer information display.</p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Popover with card-styled content.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    trigger: <Trigger>Menu</Trigger>,
    children: (
      <ul>
        <li>
          <span>Option 1</span>
        </li>
        <li>
          <span>Option 2</span>
        </li>
      </ul>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');

    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveTextContent('Menu');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies popover trigger is accessible.' }
    }
  }
};
