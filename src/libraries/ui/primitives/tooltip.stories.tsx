import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiInformationLine, RiQuestionLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { Badge } from './badge';
import { Button } from './button';
import { Tooltip } from './tooltip';

const meta = {
  title: 'Libraries/UI/Primitives/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip component for displaying contextual information on hover or focus. Built on Radix UI for accessibility.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content displayed in the tooltip',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    },
    open: {
      control: 'boolean',
      description: 'Controls tooltip visibility',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
    children: {
      description: 'Trigger element',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    }
  },
  args: {
    content: 'Tooltip content',
    open: true,
    children: <Button>Hover me</Button>
  },
  decorators: [
    (Story) => (
      <div className='p-16'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Tooltip>;

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
  args: { open: false },
  parameters: {
    docs: {
      description: { story: 'Tooltip in closed state.' }
    }
  }
};

export const Open: Story = {
  args: { open: true },
  parameters: {
    docs: {
      description: { story: 'Tooltip forced open for demonstration.' }
    }
  }
};

// =============================================================================
// Content Variations
// =============================================================================

export const ShortText: Story = {
  args: {
    content: 'Save',
    children: <Button color='btn-primary'>Save</Button>
  },
  parameters: {
    docs: {
      description: { story: 'Tooltip with short text content.' }
    }
  }
};

export const LongText: Story = {
  args: {
    content: 'This action will permanently delete your account and all associated data.',
    children: <Button color='btn-error'>Delete Account</Button>
  },
  parameters: {
    docs: {
      description: { story: 'Tooltip with longer descriptive text.' }
    }
  }
};

export const WithMarkup: Story = {
  args: {
    content: (
      <div className='flex flex-col gap-1 pb-2'>
        <span className='font-semibold'>Keyboard shortcut</span>
        <kbd className='kbd kbd-sm text-base-content'>Ctrl + S</kbd>
      </div>
    ),
    children: <Button color='btn-primary'>Save</Button>
  },
  parameters: {
    docs: {
      description: { story: 'Tooltip with rich content including markup.' }
    }
  }
};

// =============================================================================
// Trigger Variations
// =============================================================================

export const OnButton: Story = {
  args: {
    content: 'Click to submit the form',
    children: <Button color='btn-primary'>Submit</Button>
  },
  parameters: {
    docs: {
      description: { story: 'Tooltip on a button trigger.' }
    }
  }
};

export const OnIconButton: Story = {
  args: {
    content: 'More information',
    children: (
      <Button modifier='btn-circle' kind='btn-ghost' scale='btn-sm'>
        <RiQuestionLine />
      </Button>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Tooltip on an icon button.' }
    }
  }
};

export const OnBadge: Story = {
  args: {
    content: '5 unread notifications',
    children: <Badge color='badge-primary'>5</Badge>
  },
  parameters: {
    docs: {
      description: { story: 'Tooltip on a badge element.' }
    }
  }
};

export const OnText: Story = {
  args: {
    content: 'Click to learn more about this feature',
    children: <span className='cursor-help border-b border-dashed border-current'>What is this?</span>
  },
  parameters: {
    docs: {
      description: { story: 'Tooltip on inline text.' }
    }
  }
};

export const OnIcon: Story = {
  args: {
    content: 'Additional information available',
    children: (
      <span className='cursor-help text-info'>
        <RiInformationLine size={20} />
      </span>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Tooltip on a standalone icon.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const DisabledButtonExplanation: Story = {
  args: {
    content: 'Please fill in all required fields to continue',
    children: (
      <span>
        <Button disabled>Continue</Button>
      </span>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Explaining why a button is disabled.' }
    }
  }
};

export const TruncatedText: Story = {
  args: {
    content: 'this-is-a-very-long-filename-that-gets-truncated-in-the-ui.pdf',
    children: (
      <span className='inline-block max-w-32 truncate'>this-is-a-very-long-filename-that-gets-truncated-in-the-ui.pdf</span>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Showing full text for truncated content.' }
    }
  }
};

export const ActionConfirmation: Story = {
  args: {
    content: 'This will permanently delete the item',
    children: (
      <Button color='btn-error' kind='btn-outline'>
        Delete
      </Button>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Warning tooltip on destructive action.' }
    }
  }
};

export const FeatureHint: Story = {
  args: {
    content: (
      <div className='flex flex-col gap-1 pb-1'>
        <span className='font-semibold'>Pro tip</span>
        <span>Double-click to edit inline</span>
      </div>
    ),
    children: <span className='cursor-pointer text-primary underline'>Edit</span>
  },
  parameters: {
    docs: {
      description: { story: 'Feature discovery hint.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    content: 'Accessible tooltip',
    open: true,
    children: <Button>Trigger</Button>
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');

    await expect(trigger).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies tooltip trigger is accessible.' }
    }
  }
};
