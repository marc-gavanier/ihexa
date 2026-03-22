import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Button } from './button';
import { Indicator } from './indicator';

const meta = {
  title: 'Libraries/UI/Primitives/Indicator',
  component: Indicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Indicator component for displaying a badge or marker on top of another element. Supports horizontal and vertical positioning.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    displayIndicator: {
      control: 'boolean',
      description: 'Whether to show the indicator',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    indicatorContent: {
      description: 'Content to display in the indicator',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    },
    placementX: {
      control: 'select',
      options: ['indicator-start', 'indicator-center', 'indicator-end'],
      description: 'Horizontal position of the indicator',
      table: {
        category: 'Position',
        type: { summary: 'PlacementX' }
      }
    },
    placementY: {
      control: 'select',
      options: ['indicator-top', 'indicator-bottom'],
      description: 'Vertical position of the indicator',
      table: {
        category: 'Position',
        type: { summary: 'PlacementY' }
      }
    },
    className: {
      description: 'CSS classes for the indicator item',
      table: { category: 'Styling' }
    },
    children: {
      description: 'Element to attach the indicator to',
      table: { category: 'Content' }
    }
  },
  args: {
    indicatorContent: <span className='badge badge-primary'>New</span>,
    children: <Button>Inbox</Button>
  }
} satisfies Meta<typeof Indicator>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

// =============================================================================
// Display State
// =============================================================================

export const Hidden: Story = {
  args: { displayIndicator: false },
  parameters: {
    docs: {
      description: { story: 'Indicator hidden.' }
    }
  }
};

export const Visible: Story = {
  args: { displayIndicator: true },
  parameters: {
    docs: {
      description: { story: 'Indicator visible (default).' }
    }
  }
};

// =============================================================================
// Horizontal Position (X)
// =============================================================================

export const Start: Story = {
  args: { placementX: 'indicator-start' },
  parameters: {
    docs: {
      description: { story: 'Indicator positioned at the start (left).' }
    }
  }
};

export const Center: Story = {
  args: { placementX: 'indicator-center' },
  parameters: {
    docs: {
      description: { story: 'Indicator positioned at the center.' }
    }
  }
};

export const End: Story = {
  args: { placementX: 'indicator-end' },
  parameters: {
    docs: {
      description: { story: 'Indicator positioned at the end (right, default).' }
    }
  }
};

export const AllHorizontalPositions: Story = {
  render: () => (
    <div className='flex gap-8'>
      <Indicator placementX='indicator-start' indicatorContent={<span className='badge badge-secondary'>1</span>}>
        <Button>Start</Button>
      </Indicator>
      <Indicator placementX='indicator-center' indicatorContent={<span className='badge badge-secondary'>2</span>}>
        <Button>Center</Button>
      </Indicator>
      <Indicator placementX='indicator-end' indicatorContent={<span className='badge badge-secondary'>3</span>}>
        <Button>End</Button>
      </Indicator>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of horizontal positions.' }
    }
  }
};

// =============================================================================
// Vertical Position (Y)
// =============================================================================

export const Top: Story = {
  args: { placementY: 'indicator-top' },
  parameters: {
    docs: {
      description: { story: 'Indicator positioned at the top (default).' }
    }
  }
};

export const Bottom: Story = {
  args: { placementY: 'indicator-bottom' },
  parameters: {
    docs: {
      description: { story: 'Indicator positioned at the bottom.' }
    }
  }
};

export const AllVerticalPositions: Story = {
  render: () => (
    <div className='flex gap-8'>
      <Indicator placementY='indicator-top' indicatorContent={<span className='badge badge-accent'>Top</span>}>
        <div className='h-20 w-32 rounded-lg bg-base-300' />
      </Indicator>
      <Indicator placementY='indicator-bottom' indicatorContent={<span className='badge badge-accent'>Bottom</span>}>
        <div className='h-20 w-32 rounded-lg bg-base-300' />
      </Indicator>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of vertical positions.' }
    }
  }
};

// =============================================================================
// Combined Positions
// =============================================================================

export const TopStart: Story = {
  args: {
    placementX: 'indicator-start',
    placementY: 'indicator-top'
  },
  parameters: {
    docs: {
      description: { story: 'Top-left corner.' }
    }
  }
};

export const TopEnd: Story = {
  args: {
    placementX: 'indicator-end',
    placementY: 'indicator-top'
  },
  parameters: {
    docs: {
      description: { story: 'Top-right corner (default).' }
    }
  }
};

export const BottomStart: Story = {
  args: {
    placementX: 'indicator-start',
    placementY: 'indicator-bottom'
  },
  parameters: {
    docs: {
      description: { story: 'Bottom-left corner.' }
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
      description: { story: 'Bottom-right corner.' }
    }
  }
};

export const AllPositions: Story = {
  render: () => (
    <div className='grid grid-cols-3 gap-4'>
      <Indicator
        placementX='indicator-start'
        placementY='indicator-top'
        indicatorContent={<span className='badge badge-xs badge-primary' />}
      >
        <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-base-300 text-xs'>TL</div>
      </Indicator>
      <Indicator
        placementX='indicator-center'
        placementY='indicator-top'
        indicatorContent={<span className='badge badge-xs badge-primary' />}
      >
        <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-base-300 text-xs'>TC</div>
      </Indicator>
      <Indicator
        placementX='indicator-end'
        placementY='indicator-top'
        indicatorContent={<span className='badge badge-xs badge-primary' />}
      >
        <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-base-300 text-xs'>TR</div>
      </Indicator>
      <Indicator
        placementX='indicator-start'
        placementY='indicator-bottom'
        indicatorContent={<span className='badge badge-xs badge-primary' />}
      >
        <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-base-300 text-xs'>BL</div>
      </Indicator>
      <Indicator
        placementX='indicator-center'
        placementY='indicator-bottom'
        indicatorContent={<span className='badge badge-xs badge-primary' />}
      >
        <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-base-300 text-xs'>BC</div>
      </Indicator>
      <Indicator
        placementX='indicator-end'
        placementY='indicator-bottom'
        indicatorContent={<span className='badge badge-xs badge-primary' />}
      >
        <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-base-300 text-xs'>BR</div>
      </Indicator>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All 6 position combinations.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const NotificationBadge: Story = {
  args: {
    indicatorContent: <span className='badge badge-sm badge-error'>99+</span>,
    children: <Button kind='btn-ghost'>Notifications</Button>
  },
  parameters: {
    docs: {
      description: { story: 'Notification count indicator.' }
    }
  }
};

export const StatusDot: Story = {
  args: {
    indicatorContent: <span className='badge badge-xs badge-success' />,
    children: (
      <div className='avatar placeholder'>
        <div className='w-12 rounded-full bg-neutral text-neutral-content flex items-center justify-center font-bold'>JD</div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Online status indicator on avatar.' }
    }
  }
};

export const NewFeatureBadge: Story = {
  args: {
    indicatorContent: <span className='badge badge-xs badge-accent'>NEW</span>,
    children: <Button kind='btn-outline'>Features</Button>
  },
  parameters: {
    docs: {
      description: { story: 'New feature indicator.' }
    }
  }
};

export const OnImage: Story = {
  render: () => (
    <Indicator indicatorContent={<span className='badge badge-primary'>Sale</span>}>
      <div className='flex h-32 w-32 items-center justify-center rounded-lg bg-base-300 text-base-content/50'>Image</div>
    </Indicator>
  ),
  parameters: {
    docs: {
      description: { story: 'Sale indicator on product image.' }
    }
  }
};

export const OnCard: Story = {
  render: () => (
    <Indicator indicatorContent={<span className='badge badge-secondary'>Featured</span>}>
      <div className='card card-border w-48 bg-base-100'>
        <div className='card-body'>
          <h3 className='card-title text-sm'>Product</h3>
          <p className='text-xs'>Description here</p>
        </div>
      </div>
    </Indicator>
  ),
  parameters: {
    docs: {
      description: { story: 'Featured indicator on card.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    indicatorContent: <span className='badge badge-primary'>5</span>,
    children: <Button>Messages</Button>
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
      description: { story: 'Verifies indicator and content are visible.' }
    }
  }
};
