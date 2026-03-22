import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiSaveLine, RiSendPlaneLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { LoadingButton } from './loading-button';

const meta = {
  title: 'Libraries/UI/Primitives/LoadingButton',
  component: LoadingButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button with built-in loading state. Automatically shows a spinner and disables the button when loading. Inherits all Button styling options.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
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
    children: {
      description: 'Button content when not loading',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    }
  },
  args: {
    isLoading: false,
    children: 'Submit'
  }
} satisfies Meta<typeof LoadingButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
  parameters: {
    docs: {
      description: { story: 'Button in loading state.' }
    }
  }
};

export const NotLoading: Story = {
  args: { isLoading: false },
  parameters: {
    docs: {
      description: { story: 'Button in normal state.' }
    }
  }
};

// =============================================================================
// Colors
// =============================================================================

export const Primary: Story = {
  args: { color: 'btn-primary', isLoading: true },
  parameters: {
    docs: {
      description: { story: 'Primary color loading button.' }
    }
  }
};

export const Secondary: Story = {
  args: { color: 'btn-secondary', isLoading: true },
  parameters: {
    docs: {
      description: { story: 'Secondary color loading button.' }
    }
  }
};

export const Accent: Story = {
  args: { color: 'btn-accent', isLoading: true },
  parameters: {
    docs: {
      description: { story: 'Accent color loading button.' }
    }
  }
};

export const AllColorsLoading: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <LoadingButton isLoading color='btn-primary'>
        Primary
      </LoadingButton>
      <LoadingButton isLoading color='btn-secondary'>
        Secondary
      </LoadingButton>
      <LoadingButton isLoading color='btn-accent'>
        Accent
      </LoadingButton>
      <LoadingButton isLoading color='btn-success'>
        Success
      </LoadingButton>
      <LoadingButton isLoading color='btn-warning'>
        Warning
      </LoadingButton>
      <LoadingButton isLoading color='btn-error'>
        Error
      </LoadingButton>
      <LoadingButton isLoading color='btn-info'>
        Info
      </LoadingButton>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All colors in loading state.' }
    }
  }
};

// =============================================================================
// Scales
// =============================================================================

export const ExtraLarge: Story = {
  args: { scale: 'btn-xl', isLoading: true, color: 'btn-primary' },
  parameters: {
    docs: {
      description: { story: 'Extra large loading button.' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'btn-lg', isLoading: true, color: 'btn-primary' },
  parameters: {
    docs: {
      description: { story: 'Large loading button.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'btn-md', isLoading: true, color: 'btn-primary' },
  parameters: {
    docs: {
      description: { story: 'Medium loading button.' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'btn-sm', isLoading: true, color: 'btn-primary' },
  parameters: {
    docs: {
      description: { story: 'Small loading button.' }
    }
  }
};

export const ExtraSmall: Story = {
  args: { scale: 'btn-xs', isLoading: true, color: 'btn-primary' },
  parameters: {
    docs: {
      description: { story: 'Extra small loading button.' }
    }
  }
};

export const AllScalesLoading: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <LoadingButton isLoading scale='btn-xl' color='btn-primary'>
        XL
      </LoadingButton>
      <LoadingButton isLoading scale='btn-lg' color='btn-primary'>
        LG
      </LoadingButton>
      <LoadingButton isLoading scale='btn-md' color='btn-primary'>
        MD
      </LoadingButton>
      <LoadingButton isLoading scale='btn-sm' color='btn-primary'>
        SM
      </LoadingButton>
      <LoadingButton isLoading scale='btn-xs' color='btn-primary'>
        XS
      </LoadingButton>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All sizes in loading state.' }
    }
  }
};

// =============================================================================
// Styles (Kind)
// =============================================================================

export const Outline: Story = {
  args: { kind: 'btn-outline', color: 'btn-primary', isLoading: true },
  parameters: {
    docs: {
      description: { story: 'Outline style loading button.' }
    }
  }
};

export const Soft: Story = {
  args: { kind: 'btn-soft', color: 'btn-primary', isLoading: true },
  parameters: {
    docs: {
      description: { story: 'Soft style loading button.' }
    }
  }
};

export const Ghost: Story = {
  args: { kind: 'btn-ghost', isLoading: true },
  parameters: {
    docs: {
      description: { story: 'Ghost style loading button.' }
    }
  }
};

export const AllKindsLoading: Story = {
  render: () => (
    <div className='flex gap-2'>
      <LoadingButton isLoading color='btn-primary'>
        Default
      </LoadingButton>
      <LoadingButton isLoading kind='btn-outline' color='btn-primary'>
        Outline
      </LoadingButton>
      <LoadingButton isLoading kind='btn-soft' color='btn-primary'>
        Soft
      </LoadingButton>
      <LoadingButton isLoading kind='btn-ghost'>
        Ghost
      </LoadingButton>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All styles in loading state.' }
    }
  }
};

// =============================================================================
// State Comparison
// =============================================================================

export const StateComparison: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-4'>
        <LoadingButton isLoading={false} color='btn-primary'>
          Submit
        </LoadingButton>
        <span className='text-sm text-base-content/70'>Normal state</span>
      </div>
      <div className='flex items-center gap-4'>
        <LoadingButton isLoading color='btn-primary'>
          Submit
        </LoadingButton>
        <span className='text-sm text-base-content/70'>Loading state (disabled)</span>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Comparison between normal and loading states.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const SubmitForm: Story = {
  args: {
    isLoading: true,
    color: 'btn-primary',
    children: 'Submit'
  },
  parameters: {
    docs: {
      description: { story: 'Form submit button in loading state.' }
    }
  }
};

export const SaveButton: Story = {
  render: () => (
    <LoadingButton isLoading color='btn-success'>
      <RiSaveLine />
      Save
    </LoadingButton>
  ),
  parameters: {
    docs: {
      description: { story: 'Save button with icon (icon hidden when loading).' }
    }
  }
};

export const SendButton: Story = {
  render: () => (
    <LoadingButton isLoading color='btn-primary'>
      <RiSendPlaneLine />
      Send
    </LoadingButton>
  ),
  parameters: {
    docs: {
      description: { story: 'Send button with icon.' }
    }
  }
};

export const FormActions: Story = {
  render: () => (
    <div className='flex gap-2'>
      <LoadingButton isLoading={false} kind='btn-ghost'>
        Cancel
      </LoadingButton>
      <LoadingButton isLoading color='btn-primary'>
        Save Changes
      </LoadingButton>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Form action buttons with one in loading state.' }
    }
  }
};

export const DeleteConfirmation: Story = {
  render: () => (
    <div className='flex gap-2'>
      <LoadingButton isLoading={false} kind='btn-outline'>
        Cancel
      </LoadingButton>
      <LoadingButton isLoading color='btn-error'>
        Deleting...
      </LoadingButton>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Delete confirmation with loading state.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const LoadingDisabledTest: Story = {
  args: { isLoading: true, color: 'btn-primary', children: 'Submit' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await expect(button).toBeDisabled();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies button is disabled when loading.' }
    }
  }
};

export const NotLoadingEnabledTest: Story = {
  args: { isLoading: false, color: 'btn-primary', children: 'Submit' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await expect(button).toBeEnabled();
    await expect(button).toHaveTextContent('Submit');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies button is enabled when not loading.' }
    }
  }
};
