import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiAddLine, RiDeleteBinLine, RiDownloadLine, RiHeartLine, RiSearchLine } from 'react-icons/ri';
import { expect, userEvent, within } from 'storybook/test';
import { Button, type ButtonProps } from './button';

const meta = {
  title: 'Libraries/UI/Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button component for user interactions. Supports semantic colors, style variants, sizes, and shape modifiers.'
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
      description: 'Semantic color of the button',
      table: {
        category: 'Appearance',
        type: { summary: 'Color' }
      }
    },
    kind: {
      control: 'select',
      options: ['btn-dash', 'btn-ghost', 'btn-link', 'btn-outline', 'btn-soft'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        type: { summary: 'Kind' }
      }
    },
    scale: {
      control: 'select',
      options: ['btn-lg', 'btn-md', 'btn-sm', 'btn-xl', 'btn-xs'],
      description: 'Size of the button',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    behavior: {
      control: 'select',
      options: ['btn-active', 'btn-disabled'],
      description: 'Forced state appearance',
      table: {
        category: 'State',
        type: { summary: 'Behavior' }
      }
    },
    modifier: {
      control: 'select',
      options: ['btn-block', 'btn-circle', 'btn-square', 'btn-wide'],
      description: 'Shape or width modifier',
      table: {
        category: 'Layout',
        type: { summary: 'Modifier' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
    children: {
      description: 'Button content',
      table: { category: 'Content' }
    },
    className: {
      description: 'Additional CSS classes',
      table: { category: 'Styling' }
    }
  },
  args: {
    children: 'Button'
  }
} satisfies Meta<typeof Button>;

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
  args: { color: 'btn-accent' },
  parameters: {
    docs: {
      description: { story: 'Accent color for special highlights.' }
    }
  }
};

export const ButtonError: Story = {
  args: { color: 'btn-error' },
  parameters: {
    docs: {
      description: { story: 'Error color for destructive actions.' }
    }
  }
};

export const Info: Story = {
  args: { color: 'btn-info' },
  parameters: {
    docs: {
      description: { story: 'Info color for informational actions.' }
    }
  }
};

export const Neutral: Story = {
  args: { color: 'btn-neutral' },
  parameters: {
    docs: {
      description: { story: 'Neutral color for secondary actions.' }
    }
  }
};

export const Primary: Story = {
  args: { color: 'btn-primary' },
  parameters: {
    docs: {
      description: { story: 'Primary color for main call-to-action.' }
    }
  }
};

export const Secondary: Story = {
  args: { color: 'btn-secondary' },
  parameters: {
    docs: {
      description: { story: 'Secondary color for alternative actions.' }
    }
  }
};

export const Success: Story = {
  args: { color: 'btn-success' },
  parameters: {
    docs: {
      description: { story: 'Success color for positive actions.' }
    }
  }
};

export const Warning: Story = {
  args: { color: 'btn-warning' },
  parameters: {
    docs: {
      description: { story: 'Warning color for cautionary actions.' }
    }
  }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Button color='btn-accent'>Accent</Button>
      <Button>Default</Button>
      <Button color='btn-error'>Error</Button>
      <Button color='btn-info'>Info</Button>
      <Button color='btn-neutral'>Neutral</Button>
      <Button color='btn-primary'>Primary</Button>
      <Button color='btn-secondary'>Secondary</Button>
      <Button color='btn-success'>Success</Button>
      <Button color='btn-warning'>Warning</Button>
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
  args: { scale: 'btn-xl' },
  parameters: {
    docs: {
      description: { story: 'Extra large button for prominent actions.' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'btn-lg' },
  parameters: {
    docs: {
      description: { story: 'Large button size.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'btn-md' },
  parameters: {
    docs: {
      description: { story: 'Medium button size (default).' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'btn-sm' },
  parameters: {
    docs: {
      description: { story: 'Small button for compact spaces.' }
    }
  }
};

export const ExtraSmall: Story = {
  args: { scale: 'btn-xs' },
  parameters: {
    docs: {
      description: { story: 'Extra small button for minimal footprint.' }
    }
  }
};

export const AllScales: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Button scale='btn-xl'>XL</Button>
      <Button scale='btn-lg'>LG</Button>
      <Button scale='btn-md'>MD</Button>
      <Button scale='btn-sm'>SM</Button>
      <Button scale='btn-xs'>XS</Button>
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

export const Dash: Story = {
  args: { kind: 'btn-dash' },
  parameters: {
    docs: {
      description: { story: 'Button with dashed border.' }
    }
  }
};

export const Ghost: Story = {
  args: { kind: 'btn-ghost' },
  parameters: {
    docs: {
      description: { story: 'Transparent button with hover effect.' }
    }
  }
};

export const Link: Story = {
  args: { kind: 'btn-link' },
  parameters: {
    docs: {
      description: { story: 'Button styled as a link.' }
    }
  }
};

export const Outline: Story = {
  args: { kind: 'btn-outline' },
  parameters: {
    docs: {
      description: { story: 'Button with outline border.' }
    }
  }
};

export const Soft: Story = {
  args: { kind: 'btn-soft' },
  parameters: {
    docs: {
      description: { story: 'Button with muted background.' }
    }
  }
};

export const AllKinds: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Button kind='btn-dash'>Dash</Button>
      <Button>Default</Button>
      <Button kind='btn-ghost'>Ghost</Button>
      <Button kind='btn-link'>Link</Button>
      <Button kind='btn-outline'>Outline</Button>
      <Button kind='btn-soft'>Soft</Button>
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
// Modifiers
// =============================================================================

export const Block: Story = {
  args: { modifier: 'btn-block' },
  decorators: [
    (Story) => (
      <div className='w-64'>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: { story: 'Full-width button.' }
    }
  }
};

export const Circle: Story = {
  args: { modifier: 'btn-circle', children: <RiAddLine size={20} /> },
  parameters: {
    docs: {
      description: { story: 'Circular button for icon-only actions.' }
    }
  }
};

export const Square: Story = {
  args: { modifier: 'btn-square', children: <RiSearchLine size={20} /> },
  parameters: {
    docs: {
      description: { story: 'Square button for icon-only actions.' }
    }
  }
};

export const Wide: Story = {
  args: { modifier: 'btn-wide' },
  parameters: {
    docs: {
      description: { story: 'Extra wide button.' }
    }
  }
};

export const AllModifiers: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <Button modifier='btn-circle'>
        <RiAddLine size={20} />
      </Button>
      <Button modifier='btn-square'>
        <RiSearchLine size={20} />
      </Button>
      <Button modifier='btn-wide'>Wide</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of shape modifiers.' }
    }
  }
};

// =============================================================================
// States
// =============================================================================

export const Active: Story = {
  args: { behavior: 'btn-active' },
  parameters: {
    docs: {
      description: { story: 'Forced active/pressed appearance.' }
    }
  }
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: { story: 'Disabled button state.' }
    }
  }
};

export const DisabledAppearance: Story = {
  args: { behavior: 'btn-disabled' },
  parameters: {
    docs: {
      description: { story: 'Disabled appearance without disabling interaction.' }
    }
  }
};

export const AllStates: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Button behavior='btn-active'>Active</Button>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of button states.' }
    }
  }
};

// =============================================================================
// Combinations
// =============================================================================

export const PrimaryOutline: Story = {
  args: {
    color: 'btn-primary',
    kind: 'btn-outline'
  },
  parameters: {
    docs: {
      description: { story: 'Primary color with outline style.' }
    }
  }
};

export const ErrorSoft: Story = {
  args: {
    color: 'btn-error',
    kind: 'btn-soft'
  },
  parameters: {
    docs: {
      description: { story: 'Error color with soft style.' }
    }
  }
};

export const SuccessSmall: Story = {
  args: {
    color: 'btn-success',
    scale: 'btn-sm'
  },
  parameters: {
    docs: {
      description: { story: 'Small success button.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const WithIcon: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Button color='btn-primary'>
        <RiDownloadLine />
        Download
      </Button>
      <Button color='btn-error' kind='btn-outline'>
        <RiDeleteBinLine />
        Delete
      </Button>
      <Button kind='btn-ghost'>
        <RiHeartLine />
        Like
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Buttons with leading icons.' }
    }
  }
};

export const IconOnly: Story = {
  render: () => (
    <div className='flex gap-2'>
      <Button modifier='btn-circle' color='btn-primary'>
        <RiAddLine size={20} />
      </Button>
      <Button modifier='btn-square' kind='btn-outline'>
        <RiSearchLine size={20} />
      </Button>
      <Button modifier='btn-circle' kind='btn-ghost'>
        <RiHeartLine size={20} />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Icon-only buttons.' }
    }
  }
};

export const ButtonGroup: Story = {
  render: () => (
    <div className='join'>
      <Button className='join-item'>Left</Button>
      <Button className='join-item'>Center</Button>
      <Button className='join-item'>Right</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Grouped buttons using join.' }
    }
  }
};

export const ActionButtons: Story = {
  render: () => (
    <div className='flex gap-2'>
      <Button kind='btn-ghost'>Cancel</Button>
      <Button color='btn-primary'>Save Changes</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Common action button pairing.' }
    }
  }
};

export const Loading: Story = {
  render: () => (
    <Button color='btn-primary'>
      <span className='loading loading-spinner loading-sm' />
      Loading
    </Button>
  ),
  parameters: {
    docs: {
      description: { story: 'Button with loading indicator.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const colors: Array<ButtonProps['color']> = [
  'btn-accent',
  undefined,
  'btn-error',
  'btn-info',
  'btn-neutral',
  'btn-primary',
  'btn-secondary',
  'btn-success',
  'btn-warning'
];
const kinds: Array<ButtonProps['kind']> = [undefined, 'btn-dash', 'btn-ghost', 'btn-outline', 'btn-soft'];

export const Matrix: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {kinds.map((kind) => (
        <div key={kind ?? 'default-kind'}>
          <h3 className='mb-2 font-semibold'>{kind ?? 'Default'}</h3>
          <div className='flex flex-wrap gap-2'>
            {colors.map((color) => (
              <Button key={`${kind}-${color}`} color={color} kind={kind}>
                {color?.replace('btn-', '') ?? 'Default'}
              </Button>
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

export const ClickTest: Story = {
  args: {
    color: 'btn-primary',
    children: 'Click me'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await userEvent.click(button);
  },
  parameters: {
    docs: {
      description: { story: 'Verifies button is clickable.' }
    }
  }
};

export const DisabledTest: Story = {
  args: {
    disabled: true,
    children: 'Disabled'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies disabled state works correctly.' }
    }
  }
};
