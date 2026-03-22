import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiAlertLine, RiInformationLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { ICON_LG } from '../icons/sizes';
import { Alert, type AlertProps } from './alert';
import { Button } from './button';

const meta = {
  title: 'Libraries/UI/Primitives/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Alert component for displaying user feedback messages. Supports semantic colors (info, success, warning, error), border styles, and orientations.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['alert-info', 'alert-success', 'alert-warning', 'alert-error'],
      description: 'Semantic color indicating the message type',
      table: {
        category: 'Appearance',
        type: { summary: 'StatusColor' }
      }
    },
    kind: {
      control: 'select',
      options: ['alert-outline', 'alert-dash', 'alert-soft'],
      description: 'Visual border style',
      table: {
        category: 'Appearance',
        type: { summary: 'BlockKind' }
      }
    },
    direction: {
      control: 'select',
      options: ['alert-vertical', 'alert-horizontal'],
      description: 'Content orientation',
      table: {
        category: 'Layout',
        type: { summary: 'Direction' }
      }
    },
    children: {
      description: 'Alert content',
      table: { category: 'Content' }
    },
    className: {
      description: 'Additional CSS classes',
      table: { category: 'Styling' }
    }
  },
  args: {
    children: 'This is an alert message.'
  },
  decorators: [
    (Story) => (
      <div className='w-96'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

// =============================================================================
// Colors
// =============================================================================

export const Info: Story = {
  args: { color: 'alert-info' },
  parameters: {
    docs: {
      description: { story: 'For neutral informational messages.' }
    }
  }
};

export const Success: Story = {
  args: { color: 'alert-success' },
  parameters: {
    docs: {
      description: { story: 'To confirm a successful action.' }
    }
  }
};

export const Warning: Story = {
  args: { color: 'alert-warning' },
  parameters: {
    docs: {
      description: { story: 'To draw attention to an important point.' }
    }
  }
};

export const AlertError: Story = {
  args: { color: 'alert-error' },
  parameters: {
    docs: {
      description: { story: 'To signal an error or critical issue.' }
    }
  }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Alert>Default alert</Alert>
      <Alert color='alert-info'>Info alert</Alert>
      <Alert color='alert-success'>Success alert</Alert>
      <Alert color='alert-warning'>Warning alert</Alert>
      <Alert color='alert-error'>Error alert</Alert>
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
// Styles (Kind)
// =============================================================================

export const Outline: Story = {
  args: { kind: 'alert-outline' },
  parameters: {
    docs: {
      description: { story: 'Style with solid border.' }
    }
  }
};

export const Dash: Story = {
  args: { kind: 'alert-dash' },
  parameters: {
    docs: {
      description: { story: 'Style with dashed border.' }
    }
  }
};

export const Soft: Story = {
  args: { kind: 'alert-soft' },
  parameters: {
    docs: {
      description: { story: 'Style with muted background.' }
    }
  }
};

export const AllKinds: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Alert>Default</Alert>
      <Alert kind='alert-outline'>Outline</Alert>
      <Alert kind='alert-dash'>Dash</Alert>
      <Alert kind='alert-soft'>Soft</Alert>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all border styles.' }
    }
  }
};

// =============================================================================
// Direction
// =============================================================================

export const Vertical: Story = {
  args: { direction: 'alert-vertical' },
  parameters: {
    docs: {
      description: { story: 'Content stacked vertically.' }
    }
  }
};

export const Horizontal: Story = {
  args: { direction: 'alert-horizontal' },
  parameters: {
    docs: {
      description: { story: 'Content aligned horizontally (default).' }
    }
  }
};

// =============================================================================
// Combinations
// =============================================================================

export const InfoSoft: Story = {
  args: {
    color: 'alert-info',
    kind: 'alert-soft'
  },
  parameters: {
    docs: {
      description: { story: 'Info + soft combination for a subtle style.' }
    }
  }
};

export const ErrorOutline: Story = {
  args: {
    color: 'alert-error',
    kind: 'alert-outline'
  },
  parameters: {
    docs: {
      description: { story: 'Error + outline combination for a prominent alert.' }
    }
  }
};

export const SuccessDash: Story = {
  args: {
    color: 'alert-success',
    kind: 'alert-dash'
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const WithIcon: Story = {
  args: {
    color: 'alert-info'
  },
  render: (args) => (
    <Alert {...args}>
      <RiInformationLine size={ICON_LG} />
      New update available!
    </Alert>
  ),
  parameters: {
    docs: {
      description: { story: 'Alert with an icon to reinforce the message.' }
    }
  }
};

export const WithActions: Story = {
  args: {
    color: 'alert-warning'
  },
  render: (args) => (
    <Alert {...args}>
      <RiAlertLine size={ICON_LG} />
      Your session expires in 5 minutes.
      <div className='flex gap-1'>
        <Button scale='btn-sm'>Dismiss</Button>
        <Button scale='btn-sm' color='btn-primary'>
          Extend
        </Button>
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: { story: 'Alert with action buttons for user interaction.' }
    }
  }
};

export const LongContent: Story = {
  args: {
    color: 'alert-info',
    kind: 'alert-soft',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
  },
  parameters: {
    docs: {
      description: { story: 'Behavior with long text content.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const colors: Array<AlertProps['color']> = [undefined, 'alert-info', 'alert-success', 'alert-warning', 'alert-error'];
const kinds: Array<AlertProps['kind']> = [undefined, 'alert-outline', 'alert-dash', 'alert-soft'];

export const Matrix: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {kinds.map((kind) => (
        <div key={kind ?? 'default-kind'} className='flex flex-col gap-2'>
          <h3 className='font-semibold text-sm'>{kind ?? 'Default'}</h3>
          <div className='flex flex-col gap-2'>
            {colors.map((color) => (
              <Alert key={`${kind}-${color}`} color={color} kind={kind}>
                {color ?? 'Default'} + {kind ?? 'Default'}
              </Alert>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of all color × style combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    color: 'alert-error',
    children: 'Critical error detected'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');

    await expect(alert).toBeVisible();
    await expect(alert).toHaveTextContent('Critical error detected');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies the alert is accessible with the correct ARIA role.' }
    }
  }
};
