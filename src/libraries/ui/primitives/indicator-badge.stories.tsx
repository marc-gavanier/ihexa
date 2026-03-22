import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Button } from './button';
import { IndicatorBadge } from './indicator-badge';

const meta = {
  title: 'Libraries/UI/Primitives/IndicatorBadge',
  component: IndicatorBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'IndicatorBadge combines Indicator and Badge components. Provides a convenient way to add styled badge indicators to elements.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'badge-accent',
        'badge-error',
        'badge-info',
        'badge-neutral',
        'badge-primary',
        'badge-secondary',
        'badge-success',
        'badge-warning'
      ],
      description: 'Badge color',
      table: {
        category: 'Appearance',
        type: { summary: 'Color' }
      }
    },
    kind: {
      control: 'select',
      options: ['badge-dash', 'badge-ghost', 'badge-outline', 'badge-soft'],
      description: 'Badge style variant',
      table: {
        category: 'Appearance',
        type: { summary: 'Kind' }
      }
    },
    scale: {
      control: 'select',
      options: ['badge-lg', 'badge-md', 'badge-sm', 'badge-xl', 'badge-xs'],
      description: 'Badge size',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    displayIndicator: {
      control: 'boolean',
      description: 'Whether to show the indicator',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
    indicatorContent: {
      description: 'Content inside the badge',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    },
    placementX: {
      control: 'select',
      options: ['indicator-start', 'indicator-center', 'indicator-end'],
      description: 'Horizontal position',
      table: {
        category: 'Position',
        type: { summary: 'PlacementX' }
      }
    },
    placementY: {
      control: 'select',
      options: ['indicator-top', 'indicator-bottom'],
      description: 'Vertical position',
      table: {
        category: 'Position',
        type: { summary: 'PlacementY' }
      }
    },
    children: {
      description: 'Element to attach the indicator to',
      table: { category: 'Content' }
    }
  },
  args: {
    indicatorContent: '5',
    color: 'badge-primary',
    children: <Button>Inbox</Button>
  }
} satisfies Meta<typeof IndicatorBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

// =============================================================================
// Colors
// =============================================================================

export const Accent: Story = {
  args: { color: 'badge-accent' },
  parameters: {
    docs: {
      description: { story: 'Accent colored indicator badge.' }
    }
  }
};

export const IndicatorBadgeError: Story = {
  args: { color: 'badge-error' },
  parameters: {
    docs: {
      description: { story: 'Error colored indicator badge.' }
    }
  }
};

export const Info: Story = {
  args: { color: 'badge-info' },
  parameters: {
    docs: {
      description: { story: 'Info colored indicator badge.' }
    }
  }
};

export const Primary: Story = {
  args: { color: 'badge-primary' },
  parameters: {
    docs: {
      description: { story: 'Primary colored indicator badge.' }
    }
  }
};

export const Secondary: Story = {
  args: { color: 'badge-secondary' },
  parameters: {
    docs: {
      description: { story: 'Secondary colored indicator badge.' }
    }
  }
};

export const Success: Story = {
  args: { color: 'badge-success' },
  parameters: {
    docs: {
      description: { story: 'Success colored indicator badge.' }
    }
  }
};

export const Warning: Story = {
  args: { color: 'badge-warning' },
  parameters: {
    docs: {
      description: { story: 'Warning colored indicator badge.' }
    }
  }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <IndicatorBadge color='badge-accent' indicatorContent='1'>
        <Button kind='btn-ghost'>Accent</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-error' indicatorContent='2'>
        <Button kind='btn-ghost'>Error</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-info' indicatorContent='3'>
        <Button kind='btn-ghost'>Info</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-primary' indicatorContent='4'>
        <Button kind='btn-ghost'>Primary</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-secondary' indicatorContent='5'>
        <Button kind='btn-ghost'>Secondary</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-success' indicatorContent='6'>
        <Button kind='btn-ghost'>Success</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-warning' indicatorContent='7'>
        <Button kind='btn-ghost'>Warning</Button>
      </IndicatorBadge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all colors.' }
    }
  }
};

// =============================================================================
// Scales
// =============================================================================

export const ExtraSmall: Story = {
  args: { scale: 'badge-xs', indicatorContent: '' },
  parameters: {
    docs: {
      description: { story: 'Extra small badge (dot indicator).' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'badge-sm' },
  parameters: {
    docs: {
      description: { story: 'Small badge.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'badge-md' },
  parameters: {
    docs: {
      description: { story: 'Medium badge (default).' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'badge-lg' },
  parameters: {
    docs: {
      description: { story: 'Large badge.' }
    }
  }
};

export const AllScales: Story = {
  render: () => (
    <div className='flex items-center gap-6'>
      <IndicatorBadge color='badge-primary' scale='badge-xs' indicatorContent=''>
        <Button>XS</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-primary' scale='badge-sm' indicatorContent='5'>
        <Button>SM</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-primary' scale='badge-md' indicatorContent='10'>
        <Button>MD</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-primary' scale='badge-lg' indicatorContent='99+'>
        <Button>LG</Button>
      </IndicatorBadge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all sizes.' }
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
      description: { story: 'Outline style badge.' }
    }
  }
};

export const Soft: Story = {
  args: { kind: 'badge-soft' },
  parameters: {
    docs: {
      description: { story: 'Soft style badge.' }
    }
  }
};

export const AllKinds: Story = {
  render: () => (
    <div className='flex gap-6'>
      <IndicatorBadge color='badge-primary' indicatorContent='1'>
        <Button kind='btn-ghost'>Default</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-primary' kind='badge-outline' indicatorContent='2'>
        <Button kind='btn-ghost'>Outline</Button>
      </IndicatorBadge>
      <IndicatorBadge color='badge-primary' kind='badge-soft' indicatorContent='3'>
        <Button kind='btn-ghost'>Soft</Button>
      </IndicatorBadge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of style variants.' }
    }
  }
};

// =============================================================================
// Positions
// =============================================================================

export const TopEnd: Story = {
  args: {
    placementX: 'indicator-end',
    placementY: 'indicator-top'
  },
  parameters: {
    docs: {
      description: { story: 'Top-right position (default).' }
    }
  }
};

export const BottomEnd: Story = {
  args: {
    placementX: 'indicator-end',
    placementY: 'indicator-bottom'
  },
  parameters: {
    docs: {
      description: { story: 'Bottom-right position.' }
    }
  }
};

export const AllPositions: Story = {
  render: () => (
    <div className='flex gap-8'>
      <IndicatorBadge
        color='badge-error'
        scale='badge-xs'
        indicatorContent=''
        placementX='indicator-start'
        placementY='indicator-top'
      >
        <div className='h-12 w-12 rounded-lg bg-base-300' />
      </IndicatorBadge>
      <IndicatorBadge
        color='badge-error'
        scale='badge-xs'
        indicatorContent=''
        placementX='indicator-end'
        placementY='indicator-top'
      >
        <div className='h-12 w-12 rounded-lg bg-base-300' />
      </IndicatorBadge>
      <IndicatorBadge
        color='badge-error'
        scale='badge-xs'
        indicatorContent=''
        placementX='indicator-start'
        placementY='indicator-bottom'
      >
        <div className='h-12 w-12 rounded-lg bg-base-300' />
      </IndicatorBadge>
      <IndicatorBadge
        color='badge-error'
        scale='badge-xs'
        indicatorContent=''
        placementX='indicator-end'
        placementY='indicator-bottom'
      >
        <div className='h-12 w-12 rounded-lg bg-base-300' />
      </IndicatorBadge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All corner positions.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const NotificationCount: Story = {
  args: {
    color: 'badge-error',
    scale: 'badge-sm',
    indicatorContent: '99+',
    children: <Button kind='btn-ghost'>Notifications</Button>
  },
  parameters: {
    docs: {
      description: { story: 'Notification count on button.' }
    }
  }
};

export const UnreadMessages: Story = {
  args: {
    color: 'badge-primary',
    indicatorContent: '3',
    children: <Button>Messages</Button>
  },
  parameters: {
    docs: {
      description: { story: 'Unread message count.' }
    }
  }
};

export const StatusDot: Story = {
  args: {
    color: 'badge-success',
    scale: 'badge-xs',
    indicatorContent: '',
    children: (
      <div className='avatar placeholder'>
        <div className='w-12 rounded-full bg-neutral text-neutral-content'>
          <span>JD</span>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Online status dot on avatar.' }
    }
  }
};

export const CartCount: Story = {
  args: {
    color: 'badge-secondary',
    scale: 'badge-sm',
    indicatorContent: '2',
    children: <Button kind='btn-ghost'>Cart</Button>
  },
  parameters: {
    docs: {
      description: { story: 'Shopping cart item count.' }
    }
  }
};

export const NewFeature: Story = {
  args: {
    color: 'badge-accent',
    scale: 'badge-sm',
    indicatorContent: 'NEW',
    children: <Button kind='btn-outline'>Features</Button>
  },
  parameters: {
    docs: {
      description: { story: 'New feature indicator.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    color: 'badge-primary',
    indicatorContent: '5',
    children: <Button>Test</Button>
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    const badge = canvas.getByText('5');

    await expect(button).toBeVisible();
    await expect(badge).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies indicator badge is visible.' }
    }
  }
};
