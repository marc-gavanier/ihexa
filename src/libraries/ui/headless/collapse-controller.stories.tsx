import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiArrowDownSLine, RiMenuLine } from 'react-icons/ri';
import { expect, userEvent, within } from 'storybook/test';
import { ICON_LG } from '@/libraries/ui/icons/sizes';
import { Button } from '../primitives/button';
import { CollapseController } from './collapse-controller';

const meta: Meta<typeof CollapseController> = {
  title: 'Libraries/UI/Headless/CollapseController',
  component: CollapseController,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Headless collapse controller using render props pattern. Provides toggle and collapsible props for building accessible expandable/collapsible UI without predefined styling.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-80'>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  render: () => (
    <CollapseController>
      {({ toggle, collapsible }) => (
        <div className='collapse bg-base-200 rounded-lg'>
          <div {...collapsible()}>
            <Button {...toggle} kind='btn-ghost' className='w-full justify-between'>
              Click to expand
              <RiArrowDownSLine className={`transition-transform ${toggle['aria-expanded'] ? 'rotate-180' : ''}`} />
            </Button>
            <div className='collapse-content'>
              <p className='pt-2'>This is the collapsible content that was hidden.</p>
            </div>
          </div>
        </div>
      )}
    </CollapseController>
  ),
  parameters: {
    docs: {
      description: { story: 'Basic collapse with button toggle.' }
    }
  }
};

// =============================================================================
// Use Cases
// =============================================================================

export const AccordionItem: Story = {
  render: () => (
    <CollapseController>
      {({ toggle, collapsible }) => (
        <div {...collapsible({ className: 'collapse collapse-arrow bg-base-200 rounded-lg' })}>
          <button type='button' {...toggle} className='collapse-title font-medium'>
            What is this component?
          </button>
          <div className='collapse-content'>
            <p>
              CollapseController is a headless component that manages expand/collapse state and provides accessible props for
              building custom collapsible UI.
            </p>
          </div>
        </div>
      )}
    </CollapseController>
  ),
  parameters: {
    docs: {
      description: { story: 'Accordion-style collapse using DaisyUI collapse classes.' }
    }
  }
};

export const MobileMenu: Story = {
  render: () => (
    <CollapseController>
      {({ toggle, collapsible }) => (
        <div className='bg-base-100 rounded-lg border border-base-300'>
          <div className='flex items-center justify-between p-4'>
            <span className='font-bold'>My App</span>
            <Button {...toggle} kind='btn-ghost' scale='btn-sm'>
              <RiMenuLine size={ICON_LG} />
            </Button>
          </div>
          <nav {...collapsible({ className: 'overflow-hidden transition-all' })}>
            <ul className={`menu p-2 ${toggle['aria-expanded'] ? '' : 'hidden'}`}>
              <li>
                <span>Home</span>
              </li>
              <li>
                <span>Products</span>
              </li>
              <li>
                <span>About</span>
              </li>
              <li>
                <span>Contact</span>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </CollapseController>
  ),
  parameters: {
    docs: {
      description: { story: 'Mobile navigation menu toggle.' }
    }
  }
};

export const FAQItem: Story = {
  render: () => (
    <CollapseController>
      {({ toggle, collapsible }) => (
        <div className='border-b border-base-300'>
          <button type='button' {...toggle} className='flex w-full items-center justify-between py-4 text-left font-medium'>
            <span>How do I use this component?</span>
            <RiArrowDownSLine className={`transition-transform ${toggle['aria-expanded'] ? 'rotate-180' : ''}`} />
          </button>
          <div {...collapsible({ className: 'overflow-hidden transition-all' })}>
            <p className={`pb-4 text-base-content/70 ${toggle['aria-expanded'] ? '' : 'hidden'}`}>
              Import CollapseController and use the render props pattern. The component provides toggle props for your button
              and collapsible props for your content container.
            </p>
          </div>
        </div>
      )}
    </CollapseController>
  ),
  parameters: {
    docs: {
      description: { story: 'FAQ-style expandable item.' }
    }
  }
};

export const DetailsPanel: Story = {
  render: () => (
    <CollapseController>
      {({ toggle, collapsible }) => (
        <div className='card card-border bg-base-100'>
          <div className='card-body p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='card-title text-base'>Order #12345</h3>
              <Button {...toggle} kind='btn-ghost' scale='btn-xs'>
                {toggle['aria-expanded'] ? 'Hide details' : 'Show details'}
              </Button>
            </div>
            <p className='text-sm text-base-content/70'>Shipped on Jan 15, 2024</p>
            <div {...collapsible()}>
              {toggle['aria-expanded'] && (
                <div className='mt-4 space-y-2 border-t border-base-300 pt-4'>
                  <p className='text-sm'>
                    <span className='font-medium'>Items:</span> 3 products
                  </p>
                  <p className='text-sm'>
                    <span className='font-medium'>Total:</span> $149.99
                  </p>
                  <p className='text-sm'>
                    <span className='font-medium'>Tracking:</span> 1Z999AA10123456784
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </CollapseController>
  ),
  parameters: {
    docs: {
      description: { story: 'Expandable details panel in a card.' }
    }
  }
};

export const FilterSection: Story = {
  render: () => (
    <CollapseController>
      {({ toggle, collapsible }) => (
        <div className='w-full'>
          <button type='button' {...toggle} className='flex w-full items-center justify-between py-2 font-medium'>
            <span>Price Range</span>
            <RiArrowDownSLine className={`transition-transform ${toggle['aria-expanded'] ? 'rotate-180' : ''}`} />
          </button>
          <div {...collapsible()}>
            {toggle['aria-expanded'] && (
              <div className='space-y-2 py-2'>
                <label className='flex cursor-pointer items-center gap-2'>
                  <input type='checkbox' className='checkbox checkbox-sm checkbox-primary' />
                  <span className='text-sm'>Under $25</span>
                </label>
                <label className='flex cursor-pointer items-center gap-2'>
                  <input type='checkbox' className='checkbox checkbox-sm checkbox-primary' />
                  <span className='text-sm'>$25 - $50</span>
                </label>
                <label className='flex cursor-pointer items-center gap-2'>
                  <input type='checkbox' className='checkbox checkbox-sm checkbox-primary' />
                  <span className='text-sm'>$50 - $100</span>
                </label>
                <label className='flex cursor-pointer items-center gap-2'>
                  <input type='checkbox' className='checkbox checkbox-sm checkbox-primary' />
                  <span className='text-sm'>Over $100</span>
                </label>
              </div>
            )}
          </div>
        </div>
      )}
    </CollapseController>
  ),
  parameters: {
    docs: {
      description: { story: 'Collapsible filter section for e-commerce.' }
    }
  }
};

export const MultipleCollapse: Story = {
  render: () => (
    <div className='space-y-2'>
      <CollapseController>
        {({ toggle, collapsible }) => (
          <div {...collapsible({ className: 'collapse collapse-arrow bg-base-200 rounded-lg' })}>
            <button type='button' {...toggle} className='collapse-title font-medium'>
              Section 1
            </button>
            <div className='collapse-content'>
              <p>Content for section 1</p>
            </div>
          </div>
        )}
      </CollapseController>
      <CollapseController>
        {({ toggle, collapsible }) => (
          <div {...collapsible({ className: 'collapse collapse-arrow bg-base-200 rounded-lg' })}>
            <button type='button' {...toggle} className='collapse-title font-medium'>
              Section 2
            </button>
            <div className='collapse-content'>
              <p>Content for section 2</p>
            </div>
          </div>
        )}
      </CollapseController>
      <CollapseController>
        {({ toggle, collapsible }) => (
          <div {...collapsible({ className: 'collapse collapse-arrow bg-base-200 rounded-lg' })}>
            <button type='button' {...toggle} className='collapse-title font-medium'>
              Section 3
            </button>
            <div className='collapse-content'>
              <p>Content for section 3</p>
            </div>
          </div>
        )}
      </CollapseController>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Multiple independent collapse sections (not exclusive like accordion).' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const ToggleTest: Story = {
  render: () => (
    <CollapseController>
      {({ toggle, collapsible }) => (
        <div>
          <Button {...toggle} data-testid='toggle-button'>
            {toggle['aria-expanded'] ? 'Close' : 'Open'}
          </Button>
          <div {...collapsible()} data-testid='content'>
            {toggle['aria-expanded'] && <p data-testid='hidden-content'>Visible content</p>}
          </div>
        </div>
      )}
    </CollapseController>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('toggle-button');

    // Initially closed
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toHaveTextContent('Open');

    // Click to open
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(button).toHaveTextContent('Close');
    await expect(canvas.getByTestId('hidden-content')).toBeVisible();

    // Click to close
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toHaveTextContent('Open');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies toggle state changes and accessibility attributes.' }
    }
  }
};

export const AccessibilityTest: Story = {
  render: () => (
    <CollapseController>
      {({ toggle, collapsible }) => (
        <div>
          <button type='button' {...toggle} data-testid='a11y-button'>
            Toggle
          </button>
          <div {...collapsible()} data-testid='a11y-content'>
            Content
          </div>
        </div>
      )}
    </CollapseController>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('a11y-button');
    const content = canvas.getByTestId('a11y-content');

    // Check aria-controls links to content id
    const controlsId = button.getAttribute('aria-controls');
    await expect(content).toHaveAttribute('id', controlsId);

    // Check aria-label changes
    await expect(button).toHaveAttribute('aria-label', 'Ouvrir le menu');
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-label', 'Fermer le menu');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies accessibility attributes are correctly set.' }
    }
  }
};
