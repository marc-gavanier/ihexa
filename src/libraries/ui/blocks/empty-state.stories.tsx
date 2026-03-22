import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiFileTextLine, RiFolderOpenLine, RiImageLine, RiInboxLine, RiTeamLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { ICON_2XL } from '../icons/sizes';
import { Button } from '../primitives/button';
import { EmptyState } from './empty-state';

const meta = {
  title: 'Libraries/UI/Blocks/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Empty state component for displaying when a list or collection has no items. Features a prominent icon, customizable content, and a call-to-action.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'The main icon displayed in the center',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    },
    children: {
      description: 'Content below the icon (message and action button)',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    }
  }
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  args: {
    icon: <RiFolderOpenLine className='text-primary' size={ICON_2XL} />,
    children: (
      <>
        <p className='mb-6 max-w-sm text-neutral'>No items yet. Create your first one to get started.</p>
        <Button scale='btn-lg' color='btn-primary'>
          Create New
        </Button>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Default empty state with icon, message, and action button.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const NoProjects: Story = {
  args: {
    icon: <RiFolderOpenLine className='text-primary' size={ICON_2XL} />,
    children: (
      <>
        <p className='mb-6 max-w-sm text-neutral'>
          You don't have any projects yet. Create your first project to start organizing your work.
        </p>
        <Button scale='btn-lg' color='btn-primary'>
          Create Project
        </Button>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Empty state for a projects list.' }
    }
  }
};

export const NoDocuments: Story = {
  args: {
    icon: <RiFileTextLine className='text-primary' size={ICON_2XL} />,
    children: (
      <>
        <p className='mb-6 max-w-sm text-neutral'>No documents found. Upload or create a new document to get started.</p>
        <Button scale='btn-lg' color='btn-primary'>
          Add Document
        </Button>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Empty state for a documents list.' }
    }
  }
};

export const NoTeamMembers: Story = {
  args: {
    icon: <RiTeamLine className='text-primary' size={ICON_2XL} />,
    children: (
      <>
        <p className='mb-6 max-w-sm text-neutral'>Your team is empty. Invite colleagues to collaborate on projects together.</p>
        <Button scale='btn-lg' color='btn-primary'>
          Invite Members
        </Button>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Empty state for a team members list.' }
    }
  }
};

export const NoImages: Story = {
  args: {
    icon: <RiImageLine className='text-primary' size={ICON_2XL} />,
    children: (
      <>
        <p className='mb-6 max-w-sm text-neutral'>No images in this gallery. Upload your first image to begin.</p>
        <Button scale='btn-lg' color='btn-primary'>
          Upload Image
        </Button>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Empty state for an image gallery.' }
    }
  }
};

export const EmptyInbox: Story = {
  args: {
    icon: <RiInboxLine className='text-primary' size={ICON_2XL} />,
    children: (
      <>
        <p className='mb-6 max-w-sm text-neutral'>Your inbox is empty. All caught up!</p>
        <Button scale='btn-lg' color='btn-primary' kind='btn-soft'>
          Refresh
        </Button>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Empty inbox state with a softer action.' }
    }
  }
};

// =============================================================================
// Variations
// =============================================================================

export const WithMultipleActions: Story = {
  args: {
    icon: <RiFolderOpenLine className='text-primary' size={ICON_2XL} />,
    children: (
      <>
        <p className='mb-6 max-w-sm text-neutral'>No projects yet. Create a new one or import from a template.</p>
        <div className='flex gap-3'>
          <Button scale='btn-lg' color='btn-primary' kind='btn-soft'>
            Use Template
          </Button>
          <Button scale='btn-lg' color='btn-primary'>
            Create New
          </Button>
        </div>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Empty state with multiple action buttons.' }
    }
  }
};

export const MessageOnly: Story = {
  args: {
    icon: <RiInboxLine className='text-primary' size={ICON_2XL} />,
    children: <p className='max-w-sm text-neutral'>No notifications at the moment.</p>
  },
  parameters: {
    docs: {
      description: { story: 'Empty state with message only, no action button.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    icon: <RiFolderOpenLine className='text-primary' size={ICON_2XL} />,
    children: (
      <>
        <p className='mb-6 max-w-sm text-neutral'>Test message for empty state.</p>
        <Button scale='btn-lg' color='btn-primary'>
          Test Action
        </Button>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const message = canvas.getByText('Test message for empty state.');
    await expect(message).toBeVisible();

    const button = canvas.getByRole('button', { name: 'Test Action' });
    await expect(button).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies content and button accessibility.' }
    }
  }
};
