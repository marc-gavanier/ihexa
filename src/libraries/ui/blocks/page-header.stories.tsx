import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiAddLine, RiFolderOpenLine, RiSettings3Line, RiTeamLine, RiUserLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { ICON_LG } from '../icons/sizes';
import { Button } from '../primitives/button';
import { PageHeader } from './page-header';

const meta = {
  title: 'Libraries/UI/Blocks/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Page header component with title, optional icon, and optional action slot. Used at the top of pages to provide context and primary actions.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The page title',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    icon: {
      description: 'Optional icon displayed before the title',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    },
    children: {
      description: 'Optional action buttons or content on the right side',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    }
  }
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  args: {
    title: 'Page Title'
  },
  parameters: {
    docs: {
      description: { story: 'Basic page header with title only.' }
    }
  }
};

// =============================================================================
// Variations
// =============================================================================

export const WithIcon: Story = {
  args: {
    title: 'Projects',
    icon: <RiFolderOpenLine size={ICON_LG} />
  },
  parameters: {
    docs: {
      description: { story: 'Page header with an icon.' }
    }
  }
};

export const WithAction: Story = {
  args: {
    title: 'Projects',
    children: (
      <Button color='btn-primary'>
        <RiAddLine /> New Project
      </Button>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Page header with an action button.' }
    }
  }
};

export const WithIconAndAction: Story = {
  args: {
    title: 'Projects',
    icon: <RiFolderOpenLine size={ICON_LG} />,
    children: (
      <Button color='btn-primary'>
        <RiAddLine /> New Project
      </Button>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Page header with both icon and action button.' }
    }
  }
};

export const WithMultipleActions: Story = {
  args: {
    title: 'Team Members',
    icon: <RiTeamLine size={ICON_LG} />,
    children: (
      <span className='flex gap-2'>
        <Button color='btn-primary' kind='btn-soft'>
          Export
        </Button>
        <Button color='btn-primary'>
          <RiAddLine /> Invite
        </Button>
      </span>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Page header with multiple action buttons.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const SettingsPage: Story = {
  args: {
    title: 'Settings',
    icon: <RiSettings3Line size={ICON_LG} />
  },
  parameters: {
    docs: {
      description: { story: 'Settings page header.' }
    }
  }
};

export const ProfilePage: Story = {
  args: {
    title: 'My Profile',
    icon: <RiUserLine size={ICON_LG} />,
    children: <Button color='btn-primary'>Edit Profile</Button>
  },
  parameters: {
    docs: {
      description: { story: 'Profile page header with edit action.' }
    }
  }
};

export const LongTitle: Story = {
  args: {
    title: 'User Management and Access Control Settings',
    icon: <RiTeamLine size={ICON_LG} />,
    children: <Button color='btn-primary'>Save Changes</Button>
  },
  parameters: {
    docs: {
      description: { story: 'Page header with a long title.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    title: 'Test Page',
    icon: <RiFolderOpenLine size={ICON_LG} />,
    children: <Button color='btn-primary'>Action</Button>
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const heading = canvas.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveTextContent('Test Page');

    const button = canvas.getByRole('button', { name: 'Action' });
    await expect(button).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies heading and button accessibility.' }
    }
  }
};
