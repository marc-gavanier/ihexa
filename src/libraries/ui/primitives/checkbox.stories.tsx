import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Checkbox, type CheckboxProps } from './checkbox';

const meta = {
  title: 'Libraries/UI/Primitives/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox component for boolean input. Supports semantic colors and multiple sizes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'checkbox-accent',
        'checkbox-error',
        'checkbox-info',
        'checkbox-neutral',
        'checkbox-primary',
        'checkbox-secondary',
        'checkbox-success',
        'checkbox-warning'
      ],
      description: 'Semantic color of the checkbox',
      table: {
        category: 'Appearance',
        type: { summary: 'Color' }
      }
    },
    scale: {
      control: 'select',
      options: ['checkbox-lg', 'checkbox-md', 'checkbox-sm', 'checkbox-xl', 'checkbox-xs'],
      description: 'Size of the checkbox',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    }
  }
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Checkbox in checked state.' }
    }
  }
};

export const Unchecked: Story = {
  args: { defaultChecked: false },
  parameters: {
    docs: {
      description: { story: 'Checkbox in unchecked state.' }
    }
  }
};

// =============================================================================
// Colors
// =============================================================================

export const Accent: Story = {
  args: { color: 'checkbox-accent', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Accent color checkbox.' }
    }
  }
};

export const CheckboxError: Story = {
  args: { color: 'checkbox-error', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Error color for validation failures.' }
    }
  }
};

export const Info: Story = {
  args: { color: 'checkbox-info', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Info color checkbox.' }
    }
  }
};

export const Neutral: Story = {
  args: { color: 'checkbox-neutral', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Neutral color checkbox.' }
    }
  }
};

export const Primary: Story = {
  args: { color: 'checkbox-primary', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Primary color checkbox.' }
    }
  }
};

export const Secondary: Story = {
  args: { color: 'checkbox-secondary', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Secondary color checkbox.' }
    }
  }
};

export const Success: Story = {
  args: { color: 'checkbox-success', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Success color checkbox.' }
    }
  }
};

export const Warning: Story = {
  args: { color: 'checkbox-warning', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Warning color checkbox.' }
    }
  }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Checkbox color='checkbox-accent' defaultChecked />
      <Checkbox defaultChecked />
      <Checkbox color='checkbox-error' defaultChecked />
      <Checkbox color='checkbox-info' defaultChecked />
      <Checkbox color='checkbox-neutral' defaultChecked />
      <Checkbox color='checkbox-primary' defaultChecked />
      <Checkbox color='checkbox-secondary' defaultChecked />
      <Checkbox color='checkbox-success' defaultChecked />
      <Checkbox color='checkbox-warning' defaultChecked />
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
  args: { scale: 'checkbox-xl', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Extra large checkbox.' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'checkbox-lg', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Large checkbox.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'checkbox-md', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Medium checkbox (default).' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'checkbox-sm', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Small checkbox.' }
    }
  }
};

export const ExtraSmall: Story = {
  args: { scale: 'checkbox-xs', defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Extra small checkbox.' }
    }
  }
};

export const AllScales: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Checkbox scale='checkbox-xl' defaultChecked />
      <Checkbox scale='checkbox-lg' defaultChecked />
      <Checkbox scale='checkbox-md' defaultChecked />
      <Checkbox scale='checkbox-sm' defaultChecked />
      <Checkbox scale='checkbox-xs' defaultChecked />
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
// States
// =============================================================================

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: { story: 'Disabled checkbox.' }
    }
  }
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
  parameters: {
    docs: {
      description: { story: 'Disabled checkbox in checked state.' }
    }
  }
};

export const AllStates: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Checkbox />
      <Checkbox defaultChecked />
      <Checkbox disabled />
      <Checkbox disabled defaultChecked />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of checkbox states.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const WithLabel: Story = {
  render: () => (
    <label htmlFor='terms' className='flex cursor-pointer items-center gap-2'>
      <Checkbox id='terms' color='checkbox-primary' />
      <span>Accept terms and conditions</span>
    </label>
  ),
  parameters: {
    docs: {
      description: { story: 'Checkbox with clickable label.' }
    }
  }
};

export const CheckboxList: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      <label htmlFor='email' className='flex cursor-pointer items-center gap-2'>
        <Checkbox id='email' color='checkbox-primary' defaultChecked />
        <span>Email notifications</span>
      </label>
      <label htmlFor='push' className='flex cursor-pointer items-center gap-2'>
        <Checkbox id='push' color='checkbox-primary' defaultChecked />
        <span>Push notifications</span>
      </label>
      <label htmlFor='sms' className='flex cursor-pointer items-center gap-2'>
        <Checkbox id='sms' color='checkbox-primary' />
        <span>SMS notifications</span>
      </label>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'List of checkbox options.' }
    }
  }
};

export const FormField: Story = {
  render: () => (
    <div className='form-control'>
      <label htmlFor='remember' className='label cursor-pointer justify-start gap-2'>
        <Checkbox id='remember' color='checkbox-primary' />
        <span className='label-text'>Remember me</span>
      </label>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Checkbox in form control context.' }
    }
  }
};

export const SelectAll: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      <label htmlFor='select-all' className='flex cursor-pointer items-center gap-2 font-semibold'>
        <Checkbox id='select-all' color='checkbox-primary' />
        <span>Select all</span>
      </label>
      <div className='ml-6 flex flex-col gap-1'>
        <label htmlFor='item-1' className='flex cursor-pointer items-center gap-2'>
          <Checkbox id='item-1' color='checkbox-primary' scale='checkbox-sm' defaultChecked />
          <span className='text-sm'>Item 1</span>
        </label>
        <label htmlFor='item-2' className='flex cursor-pointer items-center gap-2'>
          <Checkbox id='item-2' color='checkbox-primary' scale='checkbox-sm' defaultChecked />
          <span className='text-sm'>Item 2</span>
        </label>
        <label htmlFor='item-3' className='flex cursor-pointer items-center gap-2'>
          <Checkbox id='item-3' color='checkbox-primary' scale='checkbox-sm' />
          <span className='text-sm'>Item 3</span>
        </label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Select all with nested checkboxes.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const colors: Array<CheckboxProps['color']> = [
  'checkbox-accent',
  undefined,
  'checkbox-error',
  'checkbox-info',
  'checkbox-neutral',
  'checkbox-primary',
  'checkbox-secondary',
  'checkbox-success',
  'checkbox-warning'
];
const scales: Array<CheckboxProps['scale']> = [undefined, 'checkbox-lg', 'checkbox-md', 'checkbox-sm', 'checkbox-xs'];

export const Matrix: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {scales.map((scale) => (
        <div key={scale ?? 'default-scale'}>
          <h3 className='mb-2 font-semibold'>{scale ?? 'Default'}</h3>
          <div className='flex flex-wrap gap-4'>
            {colors.map((color) => (
              <Checkbox key={`${scale}-${color}`} scale={scale} color={color} defaultChecked />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of all scale × color combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const ClickTest: Story = {
  args: { color: 'checkbox-primary' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies checkbox can be toggled.' }
    }
  }
};

export const DisabledTest: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toBeDisabled();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies disabled state.' }
    }
  }
};
