import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiEyeLine, RiEyeOffLine, RiLockLine, RiMailLine, RiSearchLine, RiUserLine } from 'react-icons/ri';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from './button';
import { Input, type InputProps } from './input';
import { ToggleState } from './toggle-state';

const meta = {
  title: 'Libraries/UI/Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Input component for text entry. Supports semantic colors, sizes, and optional left/right content slots for icons or buttons.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'input-accent',
        'input-error',
        'input-info',
        'input-neutral',
        'input-primary',
        'input-secondary',
        'input-success',
        'input-warning'
      ],
      description: 'Semantic color of the input border',
      table: {
        category: 'Appearance',
        type: { summary: 'Color' }
      }
    },
    kind: {
      control: 'select',
      options: ['input-ghost'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        type: { summary: 'Kind' }
      }
    },
    scale: {
      control: 'select',
      options: ['input-lg', 'input-md', 'input-sm', 'input-xl', 'input-xs'],
      description: 'Size of the input',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
      description: 'Input type',
      table: {
        category: 'Behavior',
        type: { summary: 'string' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
    left: {
      description: 'Content on the left side (icon, text)',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    },
    right: {
      description: 'Content on the right side (icon, button)',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    }
  },
  args: {
    placeholder: 'Type here...'
  },
  decorators: [
    (Story) => (
      <div className='w-72'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Input>;

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
  args: { color: 'input-accent' },
  parameters: {
    docs: {
      description: { story: 'Accent color input.' }
    }
  }
};

export const InputError: Story = {
  args: { color: 'input-error' },
  parameters: {
    docs: {
      description: { story: 'Error color for validation failures.' }
    }
  }
};

export const Info: Story = {
  args: { color: 'input-info' },
  parameters: {
    docs: {
      description: { story: 'Info color input.' }
    }
  }
};

export const Primary: Story = {
  args: { color: 'input-primary' },
  parameters: {
    docs: {
      description: { story: 'Primary color input.' }
    }
  }
};

export const Secondary: Story = {
  args: { color: 'input-secondary' },
  parameters: {
    docs: {
      description: { story: 'Secondary color input.' }
    }
  }
};

export const Success: Story = {
  args: { color: 'input-success' },
  parameters: {
    docs: {
      description: { story: 'Success color for valid input.' }
    }
  }
};

export const Warning: Story = {
  args: { color: 'input-warning' },
  parameters: {
    docs: {
      description: { story: 'Warning color input.' }
    }
  }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      <Input placeholder='Default' />
      <Input color='input-accent' placeholder='Accent' />
      <Input color='input-error' placeholder='Error' />
      <Input color='input-info' placeholder='Info' />
      <Input color='input-primary' placeholder='Primary' />
      <Input color='input-secondary' placeholder='Secondary' />
      <Input color='input-success' placeholder='Success' />
      <Input color='input-warning' placeholder='Warning' />
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
  args: { scale: 'input-xl' },
  parameters: {
    docs: {
      description: { story: 'Extra large input.' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'input-lg' },
  parameters: {
    docs: {
      description: { story: 'Large input.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'input-md' },
  parameters: {
    docs: {
      description: { story: 'Medium input (default).' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'input-sm' },
  parameters: {
    docs: {
      description: { story: 'Small input.' }
    }
  }
};

export const ExtraSmall: Story = {
  args: { scale: 'input-xs' },
  parameters: {
    docs: {
      description: { story: 'Extra small input.' }
    }
  }
};

export const AllScales: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      <Input scale='input-xl' placeholder='Extra Large' />
      <Input scale='input-lg' placeholder='Large' />
      <Input scale='input-md' placeholder='Medium' />
      <Input scale='input-sm' placeholder='Small' />
      <Input scale='input-xs' placeholder='Extra Small' />
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

export const Ghost: Story = {
  args: { kind: 'input-ghost' },
  parameters: {
    docs: {
      description: { story: 'Ghost style with transparent background.' }
    }
  }
};

// =============================================================================
// States
// =============================================================================

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled input' },
  parameters: {
    docs: {
      description: { story: 'Disabled input state.' }
    }
  }
};

export const WithValue: Story = {
  args: { defaultValue: 'Hello World' },
  parameters: {
    docs: {
      description: { story: 'Input with default value.' }
    }
  }
};

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: 'Read only value' },
  parameters: {
    docs: {
      description: { story: 'Read-only input.' }
    }
  }
};

// =============================================================================
// Input Types
// =============================================================================

export const Password: Story = {
  args: { type: 'password', placeholder: 'Enter password' },
  parameters: {
    docs: {
      description: { story: 'Password input type.' }
    }
  }
};

export const Email: Story = {
  args: { type: 'email', placeholder: 'email@example.com' },
  parameters: {
    docs: {
      description: { story: 'Email input type.' }
    }
  }
};

export const NumberInput: Story = {
  args: { type: 'number', placeholder: '0' },
  parameters: {
    docs: {
      description: { story: 'Number input type.' }
    }
  }
};

export const Search: Story = {
  args: { type: 'search', placeholder: 'Search...' },
  parameters: {
    docs: {
      description: { story: 'Search input type.' }
    }
  }
};

// =============================================================================
// With Left/Right Content
// =============================================================================

export const WithLeftIcon: Story = {
  args: {
    left: <RiMailLine className='text-base-content/50' />,
    placeholder: 'Email address'
  },
  parameters: {
    docs: {
      description: { story: 'Input with icon on the left.' }
    }
  }
};

export const WithRightIcon: Story = {
  args: {
    right: <RiSearchLine className='text-base-content/50' />,
    placeholder: 'Search...'
  },
  parameters: {
    docs: {
      description: { story: 'Input with icon on the right.' }
    }
  }
};

export const WithBothIcons: Story = {
  args: {
    left: <RiUserLine className='text-base-content/50' />,
    right: <RiSearchLine className='text-base-content/50' />,
    placeholder: 'Search users...'
  },
  parameters: {
    docs: {
      description: { story: 'Input with icons on both sides.' }
    }
  }
};

export const WithButton: Story = {
  args: {
    right: (
      <Button scale='btn-xs' color='btn-primary'>
        Go
      </Button>
    ),
    placeholder: 'Enter URL...'
  },
  parameters: {
    docs: {
      description: { story: 'Input with action button.' }
    }
  }
};

export const PasswordToggle: Story = {
  render: () => (
    <ToggleState>
      {(isVisible, toggleVisibility) => (
        <Input
          type={isVisible ? 'text' : 'password'}
          left={<RiLockLine className='text-base-content/50' />}
          right={
            <button type='button' className='btn btn-ghost btn-xs' onClick={toggleVisibility}>
              {isVisible ? <RiEyeOffLine /> : <RiEyeLine />}
            </button>
          }
          placeholder='Password'
        />
      )}
    </ToggleState>
  ),
  parameters: {
    docs: {
      description: { story: 'Password input with visibility toggle.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const LoginForm: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <Input left={<RiMailLine className='text-base-content/50' />} type='email' placeholder='Email' />
      <Input left={<RiLockLine className='text-base-content/50' />} type='password' placeholder='Password' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Login form inputs.' }
    }
  }
};

export const SearchBar: Story = {
  args: {
    left: <RiSearchLine className='text-base-content/50' />,
    type: 'search',
    placeholder: 'Search products...',
    scale: 'input-lg'
  },
  parameters: {
    docs: {
      description: { story: 'Search bar with icon.' }
    }
  }
};

export const WithValidation: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div>
        <Input color='input-success' defaultValue='valid@email.com' />
        <p className='mt-1 text-sm text-success'>Email is valid</p>
      </div>
      <div>
        <Input color='input-error' defaultValue='invalid-email' />
        <p className='mt-1 text-sm text-error'>Please enter a valid email</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Input with validation states.' }
    }
  }
};

export const WithLabel: Story = {
  render: () => (
    <div className='form-control'>
      <label htmlFor='username' className='label'>
        <span className='label-text'>Username</span>
      </label>
      <Input id='username' placeholder='Enter username' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Input with label.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const colors: Array<InputProps['color']> = [
  undefined,
  'input-primary',
  'input-secondary',
  'input-accent',
  'input-success',
  'input-warning',
  'input-error'
];
const scales: Array<InputProps['scale']> = [undefined, 'input-lg', 'input-sm', 'input-xs'];

export const Matrix: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {scales.map((scale) => (
        <div key={scale ?? 'default-scale'}>
          <h3 className='mb-2 font-semibold'>{scale ?? 'Default'}</h3>
          <div className='flex flex-col gap-2'>
            {colors.map((color) => (
              <Input
                key={`${scale}-${color}`}
                scale={scale}
                color={color}
                placeholder={color?.replace('input-', '') ?? 'Default'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of scale × color combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const TypeTest: Story = {
  args: { placeholder: 'Type here' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Type here');

    await expect(input).toBeVisible();
    await userEvent.type(input, 'Hello World');
    await expect(input).toHaveValue('Hello World');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies input accepts text.' }
    }
  }
};

export const DisabledTest: Story = {
  args: { disabled: true, placeholder: 'Disabled' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Disabled');

    await expect(input).toBeDisabled();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies disabled state.' }
    }
  }
};
