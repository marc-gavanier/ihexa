import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Status, type StatusClass } from './status';

const meta = {
  title: 'Libraries/UI/Primitives/Status',
  component: Status,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Status indicator component for showing state or availability. Supports different sizes, colors, and animations including a ping effect for attention-grabbing indicators.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    scale: {
      control: 'select',
      options: [undefined, 'status-xs', 'status-sm', 'status-md', 'status-lg', 'status-xl'],
      description: 'Size of the status indicator',
      table: {
        category: 'Appearance',
        type: { summary: 'StatusScale' }
      }
    },
    color: {
      control: 'select',
      options: [
        undefined,
        'status-primary',
        'status-secondary',
        'status-accent',
        'status-neutral',
        'status-info',
        'status-success',
        'status-warning',
        'status-error'
      ],
      description: 'Color of the status indicator',
      table: {
        category: 'Appearance',
        type: { summary: 'StatusColor' }
      }
    },
    animation: {
      control: 'select',
      options: [undefined, 'animate-ping', 'animate-bounce'],
      description: 'Animation effect',
      table: {
        category: 'Appearance',
        type: { summary: 'StatusAnimation' }
      }
    },
    ping: {
      control: 'boolean',
      description: 'Show ping effect with overlay (combines static and animated status)',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' }
      }
    }
  }
} satisfies Meta<typeof Status>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: 'Basic status indicator.' }
    }
  }
};

// =============================================================================
// Scales
// =============================================================================

export const ExtraSmall: Story = {
  args: { scale: 'status-xs' },
  parameters: {
    docs: {
      description: { story: 'Extra small status indicator.' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'status-sm' },
  parameters: {
    docs: {
      description: { story: 'Small status indicator.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'status-md' },
  parameters: {
    docs: {
      description: { story: 'Medium status indicator.' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'status-lg' },
  parameters: {
    docs: {
      description: { story: 'Large status indicator.' }
    }
  }
};

export const ExtraLarge: Story = {
  args: { scale: 'status-xl' },
  parameters: {
    docs: {
      description: { story: 'Extra large status indicator.' }
    }
  }
};

export const AllScales: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      {(['status-xs', 'status-sm', 'status-md', 'status-lg', 'status-xl'] as const).map((scale) => (
        <div key={scale} className='flex flex-col items-center gap-2'>
          <Status scale={scale} color='status-primary' />
          <span className='text-xs'>{scale.replace('status-', '')}</span>
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
// Colors
// =============================================================================

export const Primary: Story = {
  args: { color: 'status-primary' },
  parameters: {
    docs: {
      description: { story: 'Primary color status.' }
    }
  }
};

export const Secondary: Story = {
  args: { color: 'status-secondary' },
  parameters: {
    docs: {
      description: { story: 'Secondary color status.' }
    }
  }
};

export const Accent: Story = {
  args: { color: 'status-accent' },
  parameters: {
    docs: {
      description: { story: 'Accent color status.' }
    }
  }
};

export const Neutral: Story = {
  args: { color: 'status-neutral' },
  parameters: {
    docs: {
      description: { story: 'Neutral color status.' }
    }
  }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      {(['status-primary', 'status-secondary', 'status-accent', 'status-neutral'] as const).map((color) => (
        <div key={color} className='flex flex-col items-center gap-2'>
          <Status color={color} scale='status-md' />
          <span className='text-xs'>{color.replace('status-', '')}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all base colors.' }
    }
  }
};

// =============================================================================
// Semantic Colors
// =============================================================================

export const Info: Story = {
  args: { color: 'status-info' },
  parameters: {
    docs: {
      description: { story: 'Info status for informational states.' }
    }
  }
};

export const Success: Story = {
  args: { color: 'status-success' },
  parameters: {
    docs: {
      description: { story: 'Success status for positive states.' }
    }
  }
};

export const Warning: Story = {
  args: { color: 'status-warning' },
  parameters: {
    docs: {
      description: { story: 'Warning status for cautionary states.' }
    }
  }
};

export const StatusError: Story = {
  args: { color: 'status-error' },
  parameters: {
    docs: {
      description: { story: 'Error status for negative states.' }
    }
  }
};

export const AllSemanticColors: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      {(['status-info', 'status-success', 'status-warning', 'status-error'] as const).map((color) => (
        <div key={color} className='flex flex-col items-center gap-2'>
          <Status color={color} scale='status-md' />
          <span className='text-xs'>{color.replace('status-', '')}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all semantic colors.' }
    }
  }
};

// =============================================================================
// Animations
// =============================================================================

export const Bounce: Story = {
  args: { color: 'status-info', animation: 'animate-bounce' },
  parameters: {
    docs: {
      description: { story: 'Status with bounce animation.' }
    }
  }
};

export const Ping: Story = {
  args: { color: 'status-error', ping: true },
  parameters: {
    docs: {
      description: { story: 'Status with ping effect (overlayed static and animated).' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const OnlineStatus: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Status color='status-success' scale='status-sm' />
      <span>Online</span>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'User online status indicator.' }
    }
  }
};

export const OfflineStatus: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Status color='status-neutral' scale='status-sm' />
      <span>Offline</span>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'User offline status indicator.' }
    }
  }
};

export const ServerDown: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Status color='status-error' ping />
      <span>Server is down</span>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Server down alert with ping animation.' }
    }
  }
};

export const UnreadMessages: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Status color='status-info' animation='animate-bounce' />
      <span>Unread messages</span>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Unread messages indicator with bounce animation.' }
    }
  }
};

export const ConnectionStates: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <Status color='status-success' scale='status-sm' />
        <span>Connected</span>
      </div>
      <div className='flex items-center gap-2'>
        <Status color='status-warning' scale='status-sm' ping />
        <span>Connecting...</span>
      </div>
      <div className='flex items-center gap-2'>
        <Status color='status-error' scale='status-sm' />
        <span>Disconnected</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Various connection states.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const scales: Array<StatusClass['scale']> = ['status-xs', 'status-sm', 'status-md', 'status-lg', 'status-xl'];
const colors: Array<StatusClass['color']> = [
  'status-primary',
  'status-secondary',
  'status-accent',
  'status-neutral',
  'status-info',
  'status-success',
  'status-warning',
  'status-error'
];

export const Matrix: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      {colors.map((color) => (
        <div key={color} className='flex items-center gap-4'>
          <span className='w-24 text-xs'>{color?.replace('status-', '')}</span>
          {scales.map((scale) => (
            <Status key={`${color}-${scale}`} color={color} scale={scale} />
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of all color × scale combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    color: 'status-success',
    'aria-label': 'Online status'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByLabelText('Online status');
    await expect(status).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies status accessibility with aria-label.' }
    }
  }
};
