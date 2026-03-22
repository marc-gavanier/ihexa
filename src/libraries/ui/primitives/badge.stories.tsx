import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiCheckLine, RiCloseLine, RiTimeLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { Badge, type BadgeProps } from './badge';

const meta = {
  title: 'Libraries/UI/Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge component for displaying status indicators, labels, or counts. Supports semantic colors, border styles, and multiple sizes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'badge-neutral',
        'badge-primary',
        'badge-secondary',
        'badge-accent',
        'badge-info',
        'badge-success',
        'badge-warning',
        'badge-error'
      ],
      description: 'Semantic color of the badge',
      table: {
        category: 'Appearance',
        type: { summary: 'Color' }
      }
    },
    kind: {
      control: 'select',
      options: ['badge-outline', 'badge-dash', 'badge-soft', 'badge-ghost'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        type: { summary: 'Kind' }
      }
    },
    scale: {
      control: 'select',
      options: ['badge-xl', 'badge-lg', 'badge-md', 'badge-sm', 'badge-xs'],
      description: 'Size of the badge',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    children: {
      description: 'Badge content',
      table: { category: 'Content' }
    },
    className: {
      description: 'Additional CSS classes',
      table: { category: 'Styling' }
    }
  },
  args: {
    children: 'Badge'
  }
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

// =============================================================================
// Colors
// =============================================================================

export const Neutral: Story = {
  args: { color: 'badge-neutral' },
  parameters: {
    docs: {
      description: { story: 'Neutral badge for general purpose labels.' }
    }
  }
};

export const Primary: Story = {
  args: { color: 'badge-primary' },
  parameters: {
    docs: {
      description: { story: 'Primary color badge for main actions or highlights.' }
    }
  }
};

export const Secondary: Story = {
  args: { color: 'badge-secondary' },
  parameters: {
    docs: {
      description: { story: 'Secondary color badge for less prominent labels.' }
    }
  }
};

export const Accent: Story = {
  args: { color: 'badge-accent' },
  parameters: {
    docs: {
      description: { story: 'Accent color badge for special highlights.' }
    }
  }
};

export const Info: Story = {
  args: { color: 'badge-info' },
  parameters: {
    docs: {
      description: { story: 'Informational badge for neutral status.' }
    }
  }
};

export const Success: Story = {
  args: { color: 'badge-success' },
  parameters: {
    docs: {
      description: { story: 'Success badge for positive status.' }
    }
  }
};

export const Warning: Story = {
  args: { color: 'badge-warning' },
  parameters: {
    docs: {
      description: { story: 'Warning badge for cautionary status.' }
    }
  }
};

export const BadgeError: Story = {
  args: { color: 'badge-error' },
  parameters: {
    docs: {
      description: { story: 'Error badge for negative status.' }
    }
  }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge color='badge-accent'>Accent</Badge>
      <Badge>Default</Badge>
      <Badge color='badge-error'>Error</Badge>
      <Badge color='badge-info'>Info</Badge>
      <Badge color='badge-neutral'>Neutral</Badge>
      <Badge color='badge-primary'>Primary</Badge>
      <Badge color='badge-secondary'>Secondary</Badge>
      <Badge color='badge-success'>Success</Badge>
      <Badge color='badge-warning'>Warning</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all available colors.' }
    }
  }
};

// =============================================================================
// Scales
// =============================================================================

export const ExtraLarge: Story = {
  args: { scale: 'badge-xl' },
  parameters: {
    docs: {
      description: { story: 'Extra large badge for prominent display.' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'badge-lg' },
  parameters: {
    docs: {
      description: { story: 'Large badge size.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'badge-md' },
  parameters: {
    docs: {
      description: { story: 'Medium badge size (default).' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'badge-sm' },
  parameters: {
    docs: {
      description: { story: 'Small badge for compact display.' }
    }
  }
};

export const ExtraSmall: Story = {
  args: { scale: 'badge-xs' },
  parameters: {
    docs: {
      description: { story: 'Extra small badge for minimal footprint.' }
    }
  }
};

export const AllScales: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Badge scale='badge-xl'>XL</Badge>
      <Badge scale='badge-lg'>LG</Badge>
      <Badge scale='badge-md'>MD</Badge>
      <Badge scale='badge-sm'>SM</Badge>
      <Badge scale='badge-xs'>XS</Badge>
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
// Styles (Kind)
// =============================================================================

export const Outline: Story = {
  args: { kind: 'badge-outline' },
  parameters: {
    docs: {
      description: { story: 'Outlined badge with transparent background.' }
    }
  }
};

export const Dash: Story = {
  args: { kind: 'badge-dash' },
  parameters: {
    docs: {
      description: { story: 'Badge with dashed border.' }
    }
  }
};

export const Soft: Story = {
  args: { kind: 'badge-soft' },
  parameters: {
    docs: {
      description: { story: 'Badge with muted background.' }
    }
  }
};

export const Ghost: Story = {
  args: { kind: 'badge-ghost' },
  parameters: {
    docs: {
      description: { story: 'Minimal ghost style badge.' }
    }
  }
};

export const AllKinds: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge>Default</Badge>
      <Badge kind='badge-outline'>Outline</Badge>
      <Badge kind='badge-dash'>Dash</Badge>
      <Badge kind='badge-soft'>Soft</Badge>
      <Badge kind='badge-ghost'>Ghost</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all style variants.' }
    }
  }
};

// =============================================================================
// Combinations
// =============================================================================

export const PrimaryOutline: Story = {
  args: {
    color: 'badge-primary',
    kind: 'badge-outline'
  },
  parameters: {
    docs: {
      description: { story: 'Primary color with outline style.' }
    }
  }
};

export const SuccessSoft: Story = {
  args: {
    color: 'badge-success',
    kind: 'badge-soft'
  },
  parameters: {
    docs: {
      description: { story: 'Success color with soft style.' }
    }
  }
};

export const ErrorSmall: Story = {
  args: {
    color: 'badge-error',
    scale: 'badge-sm'
  },
  parameters: {
    docs: {
      description: { story: 'Small error badge.' }
    }
  }
};

export const InfoLargeSoft: Story = {
  args: {
    color: 'badge-info',
    kind: 'badge-soft',
    scale: 'badge-lg'
  },
  parameters: {
    docs: {
      description: { story: 'Large info badge with soft style.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const StatusBadges: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <Badge color='badge-success' scale='badge-sm'>
          <RiCheckLine size={14} />
          Active
        </Badge>
        <Badge color='badge-warning' scale='badge-sm'>
          <RiTimeLine size={14} />
          Pending
        </Badge>
        <Badge color='badge-error' scale='badge-sm'>
          <RiCloseLine size={14} />
          Inactive
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Common status indicators with icons.' }
    }
  }
};

export const NotificationCount: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='relative'>
        <span className='text-lg'>Messages</span>
        <Badge color='badge-error' scale='badge-xs' className='absolute -top-2 -right-6'>
          5
        </Badge>
      </div>
      <div className='relative'>
        <span className='text-lg'>Notifications</span>
        <Badge color='badge-primary' scale='badge-xs' className='absolute -top-2 -right-6'>
          99+
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Notification count badges.' }
    }
  }
};

export const TagList: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge kind='badge-outline'>React</Badge>
      <Badge kind='badge-outline'>TypeScript</Badge>
      <Badge kind='badge-outline'>Tailwind</Badge>
      <Badge kind='badge-outline'>Next.js</Badge>
      <Badge kind='badge-outline'>Storybook</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Tags or labels list.' }
    }
  }
};

export const PriorityLevels: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <Badge color='badge-error' kind='badge-soft' scale='badge-sm'>
          Critical
        </Badge>
        <span>Server is down</span>
      </div>
      <div className='flex items-center gap-2'>
        <Badge color='badge-warning' kind='badge-soft' scale='badge-sm'>
          High
        </Badge>
        <span>Performance degradation</span>
      </div>
      <div className='flex items-center gap-2'>
        <Badge color='badge-info' kind='badge-soft' scale='badge-sm'>
          Medium
        </Badge>
        <span>New feature request</span>
      </div>
      <div className='flex items-center gap-2'>
        <Badge color='badge-neutral' kind='badge-soft' scale='badge-sm'>
          Low
        </Badge>
        <span>Documentation update</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Priority level indicators.' }
    }
  }
};

export const VersionBadge: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <span className='font-semibold'>My App</span>
      <Badge color='badge-primary' kind='badge-soft' scale='badge-xs'>
        v2.1.0
      </Badge>
      <Badge color='badge-success' kind='badge-outline' scale='badge-xs'>
        Stable
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Version and release status badges.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const colors: Array<BadgeProps['color']> = [
  'badge-accent',
  undefined,
  'badge-error',
  'badge-info',
  'badge-neutral',
  'badge-primary',
  'badge-secondary',
  'badge-success',
  'badge-warning'
];
const kinds: Array<BadgeProps['kind']> = [undefined, 'badge-dash', 'badge-ghost', 'badge-outline', 'badge-soft'];

export const Matrix: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {kinds.map((kind) => (
        <div key={kind ?? 'default-kind'}>
          <h3 className='mb-2 font-semibold'>{kind ?? 'Default'}</h3>
          <div className='flex flex-wrap gap-2'>
            {colors.map((color) => (
              <Badge key={`${kind}-${color}`} color={color} kind={kind}>
                {color?.replace('badge-', '') ?? 'Default'}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of all color × kind combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    color: 'badge-success',
    children: 'Active'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Active');

    await expect(badge).toBeVisible();
    await expect(badge).toHaveTextContent('Active');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies badge renders correctly.' }
    }
  }
};
