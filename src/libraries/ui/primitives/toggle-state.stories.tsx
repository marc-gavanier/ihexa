import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiArrowDownSLine, RiEyeLine, RiEyeOffLine, RiMoonLine, RiSunLine } from 'react-icons/ri';
import { expect, userEvent, within } from 'storybook/test';
import { Badge } from './badge';
import { Button } from './button';
import { ToggleState } from './toggle-state';

const meta: Meta<typeof ToggleState> = {
  title: 'Libraries/UI/Primitives/ToggleState',
  component: ToggleState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Headless toggle state component using render props pattern. Provides boolean state and toggle function without any UI, allowing full control over rendering.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  render: () => (
    <ToggleState>
      {(isActive, toggleActive) => (
        <Button onClick={toggleActive} color={isActive ? 'btn-primary' : undefined}>
          {isActive ? 'Active' : 'Inactive'}
        </Button>
      )}
    </ToggleState>
  ),
  parameters: {
    docs: {
      description: { story: 'Basic toggle state with button.' }
    }
  }
};

// =============================================================================
// Use Cases
// =============================================================================

export const VisibilityToggle: Story = {
  render: () => (
    <ToggleState>
      {(isVisible, toggleVisibility) => (
        <div className='flex items-center gap-3'>
          <Button onClick={toggleVisibility} kind='btn-ghost' scale='btn-sm'>
            {isVisible ? <RiEyeOffLine /> : <RiEyeLine />}
          </Button>
          <span className='text-sm'>{isVisible ? 'Content is visible' : 'Content is hidden'}</span>
        </div>
      )}
    </ToggleState>
  ),
  parameters: {
    docs: {
      description: { story: 'Toggle visibility state.' }
    }
  }
};

export const ExpandCollapse: Story = {
  render: () => (
    <ToggleState>
      {(isExpanded, toggleExpanded) => (
        <div className='w-64'>
          <Button onClick={toggleExpanded} kind='btn-ghost' className='w-full justify-between'>
            <span>Details</span>
            <RiArrowDownSLine className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
          {isExpanded && (
            <div className='mt-2 rounded-lg bg-base-200 p-3 text-sm'>This is the expanded content that was hidden before.</div>
          )}
        </div>
      )}
    </ToggleState>
  ),
  parameters: {
    docs: {
      description: { story: 'Expand/collapse toggle.' }
    }
  }
};

export const OnOffSwitch: Story = {
  render: () => (
    <ToggleState>
      {(isOn, toggle) => (
        <div className='flex items-center gap-3'>
          <span className='text-sm'>Notifications</span>
          <button
            type='button'
            onClick={toggle}
            className={`relative h-6 w-11 rounded-full transition-colors ${isOn ? 'bg-primary' : 'bg-base-300'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${isOn ? 'translate-x-5' : ''}`}
            />
          </button>
          <Badge color={isOn ? 'badge-success' : 'badge-neutral'} scale='badge-sm'>
            {isOn ? 'ON' : 'OFF'}
          </Badge>
        </div>
      )}
    </ToggleState>
  ),
  parameters: {
    docs: {
      description: { story: 'Custom switch UI.' }
    }
  }
};

export const ThemeToggle: Story = {
  render: () => (
    <ToggleState>
      {(isDark, toggleTheme) => (
        <Button onClick={toggleTheme} kind='btn-ghost' className='gap-2'>
          {isDark ? <RiSunLine /> : <RiMoonLine />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </Button>
      )}
    </ToggleState>
  ),
  parameters: {
    docs: {
      description: { story: 'Theme toggle button.' }
    }
  }
};

export const FavoriteToggle: Story = {
  render: () => (
    <ToggleState>
      {(isFavorite, toggleFavorite) => (
        <button type='button' onClick={toggleFavorite} className='text-2xl transition-transform hover:scale-110'>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      )}
    </ToggleState>
  ),
  parameters: {
    docs: {
      description: { story: 'Favorite/like toggle.' }
    }
  }
};

export const MenuToggle: Story = {
  render: () => (
    <ToggleState>
      {(isOpen, toggleMenu) => (
        <div className='relative'>
          <Button onClick={toggleMenu} kind='btn-outline' className='gap-1'>
            Menu
            <RiArrowDownSLine className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
          {isOpen && (
            <ul className='menu bg-base-100 rounded-box absolute top-full left-0 z-10 mt-1 w-40 shadow-lg'>
              <li>
                <span>Profile</span>
              </li>
              <li>
                <span>Settings</span>
              </li>
              <li>
                <span>Logout</span>
              </li>
            </ul>
          )}
        </div>
      )}
    </ToggleState>
  ),
  parameters: {
    docs: {
      description: { story: 'Dropdown menu toggle.' }
    }
  }
};

export const PasswordVisibility: Story = {
  render: () => (
    <ToggleState>
      {(isVisible, toggleVisibility) => (
        <div className='relative w-64'>
          <input
            type={isVisible ? 'text' : 'password'}
            className='input input-bordered w-full pr-10'
            placeholder='Password'
            defaultValue='secret123'
          />
          <button
            type='button'
            onClick={toggleVisibility}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-base-content/50 hover:text-base-content'
          >
            {isVisible ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        </div>
      )}
    </ToggleState>
  ),
  parameters: {
    docs: {
      description: { story: 'Password visibility toggle.' }
    }
  }
};

export const AccordionItem: Story = {
  render: () => (
    <div className='w-72 space-y-2'>
      <ToggleState>
        {(isOpen, toggle) => (
          <div className='rounded-lg border border-base-300'>
            <button type='button' onClick={toggle} className='flex w-full items-center justify-between p-3 text-left'>
              <span className='font-medium'>Section 1</span>
              <RiArrowDownSLine className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className='border-t border-base-300 p-3 text-sm'>Content for section 1</div>}
          </div>
        )}
      </ToggleState>
      <ToggleState>
        {(isOpen, toggle) => (
          <div className='rounded-lg border border-base-300'>
            <button type='button' onClick={toggle} className='flex w-full items-center justify-between p-3 text-left'>
              <span className='font-medium'>Section 2</span>
              <RiArrowDownSLine className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className='border-t border-base-300 p-3 text-sm'>Content for section 2</div>}
          </div>
        )}
      </ToggleState>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Multiple independent accordion items.' }
    }
  }
};

export const EditMode: Story = {
  render: () => (
    <ToggleState>
      {(isEditing, toggleEdit) => (
        <div className='w-64 space-y-2'>
          {isEditing ? (
            <input type='text' className='input input-bordered w-full' defaultValue='Editable text' />
          ) : (
            <p className='p-2'>Editable text</p>
          )}
          <Button onClick={toggleEdit} scale='btn-sm' color={isEditing ? 'btn-success' : 'btn-primary'}>
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>
      )}
    </ToggleState>
  ),
  parameters: {
    docs: {
      description: { story: 'Toggle between view and edit mode.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const ToggleTest: Story = {
  render: () => (
    <ToggleState>
      {(isActive, toggleActive) => (
        <Button onClick={toggleActive} data-testid='toggle-button'>
          {isActive ? 'ON' : 'OFF'}
        </Button>
      )}
    </ToggleState>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('toggle-button');

    await expect(button).toHaveTextContent('OFF');

    await userEvent.click(button);
    await expect(button).toHaveTextContent('ON');

    await userEvent.click(button);
    await expect(button).toHaveTextContent('OFF');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies toggle state changes on click.' }
    }
  }
};
