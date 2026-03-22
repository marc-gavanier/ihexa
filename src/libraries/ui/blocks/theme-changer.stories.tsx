import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { ThemeChanger } from './theme-changer';

const meta = {
  title: 'Libraries/UI/Blocks/ThemeChanger',
  component: ThemeChanger,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Theme switcher component using next-themes. Allows users to switch between system, light, and dark themes. Displays as a compact button group with icons.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ThemeChanger>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: 'Default theme changer with system, light, and dark options.' }
    }
  }
};

// =============================================================================
// Context Examples
// =============================================================================

export const InNavbar: Story = {
  render: () => (
    <nav className='flex w-96 items-center justify-between rounded-lg bg-base-200 p-4'>
      <span className='font-semibold'>My App</span>
      <ThemeChanger />
    </nav>
  ),
  parameters: {
    docs: {
      description: { story: 'Theme changer in a navigation bar.' }
    }
  }
};

export const InHeader: Story = {
  render: () => (
    <header className='flex w-full max-w-2xl items-center justify-between border-b border-base-300 pb-4'>
      <div>
        <h1 className='text-xl font-bold'>Dashboard</h1>
        <p className='text-sm text-base-content/70'>Welcome back</p>
      </div>
      <ThemeChanger />
    </header>
  ),
  parameters: {
    docs: {
      description: { story: 'Theme changer in a page header.' }
    }
  }
};

export const InSettingsPanel: Story = {
  render: () => (
    <div className='w-72 rounded-lg bg-base-200 p-4'>
      <h3 className='mb-4 font-semibold'>Settings</h3>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Theme</span>
          <ThemeChanger />
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Notifications</span>
          <input type='checkbox' className='toggle toggle-primary' defaultChecked />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Theme changer in a settings panel.' }
    }
  }
};

export const InFooter: Story = {
  render: () => (
    <footer className='flex w-full max-w-2xl items-center justify-between border-t border-base-300 pt-4 text-sm text-base-content/70'>
      <span>© 2024 My App</span>
      <div className='flex items-center gap-4'>
        <span>Theme:</span>
        <ThemeChanger />
      </div>
    </footer>
  ),
  parameters: {
    docs: {
      description: { story: 'Theme changer in a footer.' }
    }
  }
};

export const InDropdown: Story = {
  render: () => (
    <div className='dropdown dropdown-end'>
      <div className='rounded-lg bg-base-100 p-4 shadow-lg'>
        <div className='mb-3 border-b border-base-300 pb-3'>
          <p className='font-medium'>John Doe</p>
          <p className='text-sm text-base-content/70'>john@example.com</p>
        </div>
        <div className='flex items-center justify-between py-2'>
          <span className='text-sm'>Appearance</span>
          <ThemeChanger />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Theme changer in a user dropdown menu.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioGroup = canvas.getByRole('radiogroup');

    await expect(radioGroup).toBeVisible();

    const buttons = canvas.getAllByRole('button');
    await expect(buttons).toHaveLength(3);
  },
  parameters: {
    docs: {
      description: { story: 'Verifies theme changer has proper accessibility structure.' }
    }
  }
};
