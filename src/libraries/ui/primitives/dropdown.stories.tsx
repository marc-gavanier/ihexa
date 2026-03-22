import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiDeleteBinLine, RiEditLine, RiFileCopyLine, RiLogoutBoxLine, RiSettings3Line, RiUserLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { Dropdown } from './dropdown';
import { Trigger } from './popover';

const meta = {
  title: 'Libraries/UI/Primitives/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown menu component for displaying a list of actions. Built on Radix UI with button styling support and item-based API.'
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
      description: 'Controls dropdown visibility',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
    contentClassName: {
      control: 'text',
      description: 'CSS class for dropdown content',
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
    items: {
      description: 'Menu items as key-value pairs',
      table: {
        category: 'Content',
        type: { summary: 'Record<string, ReactNode>' }
      }
    }
  },
  args: {
    trigger: <Trigger>Options</Trigger>,
    items: {
      item1: <span>Item 1</span>,
      item2: <span>Item 2</span>,
      item3: <span>Item 3</span>
    }
  },
  decorators: [
    (Story) => (
      <div className='p-32'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Dropdown>;

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
      description: { story: 'Dropdown in closed state.' }
    }
  }
};

export const Open: Story = {
  args: { isOpen: true },
  parameters: {
    docs: {
      description: { story: 'Dropdown forced open for demonstration.' }
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
      <Dropdown trigger={<Trigger>Default</Trigger>} items={{ item: <span>Item</span> }} />
      <Dropdown color='btn-primary' trigger={<Trigger>Primary</Trigger>} items={{ item: <span>Item</span> }} />
      <Dropdown color='btn-secondary' trigger={<Trigger>Secondary</Trigger>} items={{ item: <span>Item</span> }} />
      <Dropdown color='btn-neutral' trigger={<Trigger>Neutral</Trigger>} items={{ item: <span>Item</span> }} />
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
      <Dropdown trigger={<Trigger>Default</Trigger>} items={{ item: <span>Item</span> }} />
      <Dropdown kind='btn-ghost' trigger={<Trigger>Ghost</Trigger>} items={{ item: <span>Item</span> }} />
      <Dropdown kind='btn-outline' trigger={<Trigger>Outline</Trigger>} items={{ item: <span>Item</span> }} />
      <Dropdown kind='btn-soft' trigger={<Trigger>Soft</Trigger>} items={{ item: <span>Item</span> }} />
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
    items: {
      profile: (
        <span className='flex items-center gap-2'>
          <RiUserLine />
          Profile
        </span>
      ),
      settings: (
        <span className='flex items-center gap-2'>
          <RiSettings3Line />
          Settings
        </span>
      ),
      logout: (
        <span className='flex items-center gap-2 text-error'>
          <RiLogoutBoxLine />
          Logout
        </span>
      )
    }
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
    items: {
      edit: (
        <span className='flex items-center gap-2'>
          <RiEditLine />
          Edit
        </span>
      ),
      duplicate: (
        <span className='flex items-center gap-2'>
          <RiFileCopyLine />
          Duplicate
        </span>
      ),
      delete: (
        <span className='flex items-center gap-2 text-error'>
          <RiDeleteBinLine />
          Delete
        </span>
      )
    }
  },
  parameters: {
    docs: {
      description: { story: 'Actions dropdown with icons.' }
    }
  }
};

export const SimpleMenu: Story = {
  args: {
    kind: 'btn-ghost',
    scale: 'btn-sm',
    trigger: <Trigger>Sort by</Trigger>,
    items: {
      newest: <span>Newest first</span>,
      oldest: <span>Oldest first</span>,
      nameAsc: <span>Name A-Z</span>,
      nameDesc: <span>Name Z-A</span>
    }
  },
  parameters: {
    docs: {
      description: { story: 'Simple text-only menu items.' }
    }
  }
};

export const StatusMenu: Story = {
  args: {
    kind: 'btn-outline',
    trigger: <Trigger>Status</Trigger>,
    items: {
      active: (
        <span className='flex items-center gap-2'>
          <span className='badge badge-success badge-xs' />
          Active
        </span>
      ),
      pending: (
        <span className='flex items-center gap-2'>
          <span className='badge badge-warning badge-xs' />
          Pending
        </span>
      ),
      inactive: (
        <span className='flex items-center gap-2'>
          <span className='badge badge-error badge-xs' />
          Inactive
        </span>
      )
    }
  },
  parameters: {
    docs: {
      description: { story: 'Status selection dropdown with indicators.' }
    }
  }
};

export const ManyItems: Story = {
  args: {
    trigger: <Trigger>Select Country</Trigger>,
    contentClassName: 'menu max-h-48 overflow-y-auto',
    items: {
      us: <span>United States</span>,
      uk: <span>United Kingdom</span>,
      fr: <span>France</span>,
      de: <span>Germany</span>,
      es: <span>Spain</span>,
      it: <span>Italy</span>,
      jp: <span>Japan</span>,
      cn: <span>China</span>,
      br: <span>Brazil</span>,
      au: <span>Australia</span>
    }
  },
  parameters: {
    docs: {
      description: { story: 'Dropdown with many items and scroll.' }
    }
  }
};

export const CompactMenu: Story = {
  args: {
    scale: 'btn-xs',
    kind: 'btn-ghost',
    trigger: '•••',
    items: {
      view: <span>View</span>,
      edit: <span>Edit</span>,
      delete: <span className='text-error'>Delete</span>
    }
  },
  parameters: {
    docs: {
      description: { story: 'Compact action menu for tables.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    trigger: <Trigger>Menu</Trigger>,
    items: {
      option1: <span>Option 1</span>,
      option2: <span>Option 2</span>
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');

    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveTextContent('Menu');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies dropdown trigger is accessible.' }
    }
  }
};
