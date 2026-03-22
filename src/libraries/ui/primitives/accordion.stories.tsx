import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Accordion, AccordionDetailsItem, AccordionItem } from './accordion';

const meta = {
  title: 'Libraries/UI/Primitives/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accordion component for expandable/collapsible content sections. Only one item can be open at a time within the same group (using radio inputs). Supports arrow and plus indicators.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-96'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem name='accordion-default' title='How do I create an account?' defaultOpen>
        Click the "Sign Up" button in the top right corner and follow the registration process.
      </AccordionItem>
      <AccordionItem name='accordion-default' title='I forgot my password. What should I do?'>
        Click on "Forgot Password" on the login page and follow the instructions sent to your email.
      </AccordionItem>
      <AccordionItem name='accordion-default' title='How do I update my profile information?'>
        Go to "My Account" settings and select "Edit Profile" to make changes.
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Basic accordion with no indicator.' }
    }
  }
};

// =============================================================================
// Indicators
// =============================================================================

export const WithArrow: Story = {
  render: () => (
    <Accordion>
      <AccordionItem name='accordion-arrow' title='How do I create an account?' indicator='collapse-arrow' defaultOpen>
        Click the "Sign Up" button in the top right corner and follow the registration process.
      </AccordionItem>
      <AccordionItem name='accordion-arrow' title='I forgot my password. What should I do?' indicator='collapse-arrow'>
        Click on "Forgot Password" on the login page and follow the instructions sent to your email.
      </AccordionItem>
      <AccordionItem name='accordion-arrow' title='How do I update my profile information?' indicator='collapse-arrow'>
        Go to "My Account" settings and select "Edit Profile" to make changes.
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Accordion with arrow indicator.' }
    }
  }
};

export const WithPlus: Story = {
  render: () => (
    <Accordion>
      <AccordionItem name='accordion-plus' title='How do I create an account?' indicator='collapse-plus' defaultOpen>
        Click the "Sign Up" button in the top right corner and follow the registration process.
      </AccordionItem>
      <AccordionItem name='accordion-plus' title='I forgot my password. What should I do?' indicator='collapse-plus'>
        Click on "Forgot Password" on the login page and follow the instructions sent to your email.
      </AccordionItem>
      <AccordionItem name='accordion-plus' title='How do I update my profile information?' indicator='collapse-plus'>
        Go to "My Account" settings and select "Edit Profile" to make changes.
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Accordion with plus/minus indicator.' }
    }
  }
};

// =============================================================================
// Joined
// =============================================================================

export const Joined: Story = {
  render: () => (
    <Accordion joined>
      <AccordionItem name='accordion-joined' title='How do I create an account?' indicator='collapse-arrow' joined defaultOpen>
        Click the "Sign Up" button in the top right corner and follow the registration process.
      </AccordionItem>
      <AccordionItem name='accordion-joined' title='I forgot my password. What should I do?' indicator='collapse-arrow' joined>
        Click on "Forgot Password" on the login page and follow the instructions sent to your email.
      </AccordionItem>
      <AccordionItem name='accordion-joined' title='How do I update my profile information?' indicator='collapse-arrow' joined>
        Go to "My Account" settings and select "Edit Profile" to make changes.
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Joined accordion with connected borders.' }
    }
  }
};

// =============================================================================
// Details/Summary (Native HTML)
// =============================================================================

export const DetailsVariant: Story = {
  render: () => (
    <Accordion>
      <AccordionDetailsItem name='accordion-details' title='How do I create an account?' defaultOpen>
        Click the "Sign Up" button in the top right corner and follow the registration process.
      </AccordionDetailsItem>
      <AccordionDetailsItem name='accordion-details' title='I forgot my password. What should I do?'>
        Click on "Forgot Password" on the login page and follow the instructions sent to your email.
      </AccordionDetailsItem>
      <AccordionDetailsItem name='accordion-details' title='How do I update my profile information?'>
        Go to "My Account" settings and select "Edit Profile" to make changes.
      </AccordionDetailsItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Native HTML details/summary accordion.' }
    }
  }
};

export const DetailsWithArrow: Story = {
  render: () => (
    <Accordion>
      <AccordionDetailsItem
        name='accordion-details-arrow'
        title='How do I create an account?'
        indicator='collapse-arrow'
        defaultOpen
      >
        Click the "Sign Up" button in the top right corner and follow the registration process.
      </AccordionDetailsItem>
      <AccordionDetailsItem
        name='accordion-details-arrow'
        title='I forgot my password. What should I do?'
        indicator='collapse-arrow'
      >
        Click on "Forgot Password" on the login page and follow the instructions sent to your email.
      </AccordionDetailsItem>
      <AccordionDetailsItem
        name='accordion-details-arrow'
        title='How do I update my profile information?'
        indicator='collapse-arrow'
      >
        Go to "My Account" settings and select "Edit Profile" to make changes.
      </AccordionDetailsItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Details accordion with arrow indicator.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const FAQ: Story = {
  render: () => (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Frequently Asked Questions</h2>
      <Accordion joined>
        <AccordionItem name='faq' title='What payment methods do you accept?' indicator='collapse-arrow' joined defaultOpen>
          We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise
          customers.
        </AccordionItem>
        <AccordionItem name='faq' title='How long does shipping take?' indicator='collapse-arrow' joined>
          Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery.
        </AccordionItem>
        <AccordionItem name='faq' title='What is your return policy?' indicator='collapse-arrow' joined>
          We offer a 30-day money-back guarantee. Items must be unused and in original packaging.
        </AccordionItem>
        <AccordionItem name='faq' title='Do you offer international shipping?' indicator='collapse-arrow' joined>
          Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'FAQ section with joined accordion.' }
    }
  }
};

export const ProductDetails: Story = {
  render: () => (
    <Accordion>
      <AccordionItem name='product' title='Description' indicator='collapse-plus' defaultOpen>
        <p>
          This premium wireless headphone delivers exceptional sound quality with active noise cancellation. Features include
          30-hour battery life, comfortable over-ear design, and seamless Bluetooth connectivity.
        </p>
      </AccordionItem>
      <AccordionItem name='product' title='Specifications' indicator='collapse-plus'>
        <ul className='list-disc pl-4 space-y-1'>
          <li>Driver size: 40mm</li>
          <li>Frequency response: 20Hz - 20kHz</li>
          <li>Battery life: 30 hours</li>
          <li>Weight: 250g</li>
        </ul>
      </AccordionItem>
      <AccordionItem name='product' title='Reviews (24)' indicator='collapse-plus'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <span className='font-medium'>4.8</span>
            <span className='text-warning'>★★★★★</span>
          </div>
          <p>Based on 24 customer reviews</p>
        </div>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Product details with plus indicator.' }
    }
  }
};

export const SettingsPanel: Story = {
  render: () => (
    <Accordion joined>
      <AccordionItem name='settings' title='Account Settings' indicator='collapse-arrow' joined defaultOpen>
        <div className='space-y-2'>
          <label className='flex items-center justify-between'>
            <span>Email notifications</span>
            <input type='checkbox' className='toggle toggle-primary' defaultChecked />
          </label>
          <label className='flex items-center justify-between'>
            <span>Two-factor authentication</span>
            <input type='checkbox' className='toggle toggle-primary' />
          </label>
        </div>
      </AccordionItem>
      <AccordionItem name='settings' title='Privacy Settings' indicator='collapse-arrow' joined>
        <div className='space-y-2'>
          <label className='flex items-center justify-between'>
            <span>Profile visibility</span>
            <select className='select select-bordered select-sm'>
              <option>Public</option>
              <option>Private</option>
            </select>
          </label>
        </div>
      </AccordionItem>
      <AccordionItem name='settings' title='Notification Preferences' indicator='collapse-arrow' joined>
        <div className='space-y-2'>
          <label className='flex items-center justify-between'>
            <span>Push notifications</span>
            <input type='checkbox' className='toggle toggle-primary' defaultChecked />
          </label>
        </div>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Settings panel with toggle controls.' }
    }
  }
};

export const DocumentationSidebar: Story = {
  render: () => (
    <Accordion>
      <AccordionItem name='docs' title='Getting Started' indicator='collapse-arrow' defaultOpen>
        <ul className='menu'>
          <li>
            <span>Installation</span>
          </li>
          <li>
            <span>Quick Start</span>
          </li>
          <li>
            <span>Configuration</span>
          </li>
        </ul>
      </AccordionItem>
      <AccordionItem name='docs' title='Components' indicator='collapse-arrow'>
        <ul className='menu'>
          <li>
            <span>Button</span>
          </li>
          <li>
            <span>Input</span>
          </li>
          <li>
            <span>Card</span>
          </li>
          <li>
            <span>Modal</span>
          </li>
        </ul>
      </AccordionItem>
      <AccordionItem name='docs' title='API Reference' indicator='collapse-arrow'>
        <ul className='menu'>
          <li>
            <span>Hooks</span>
          </li>
          <li>
            <span>Utilities</span>
          </li>
        </ul>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Documentation sidebar navigation.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const ToggleTest: Story = {
  render: () => (
    <Accordion>
      <AccordionItem name='test-toggle' title='First Item' indicator='collapse-arrow' defaultOpen>
        Content of first item
      </AccordionItem>
      <AccordionItem name='test-toggle' title='Second Item' indicator='collapse-arrow'>
        Content of second item
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First item should be open by default
    const firstRadio = canvasElement.querySelector('input[type="radio"]:checked');
    await expect(firstRadio).not.toBeNull();

    // Click on second item
    const secondTitle = canvas.getByText('Second Item');
    await userEvent.click(secondTitle);

    // Now second radio should be checked
    const radios = canvasElement.querySelectorAll('input[type="radio"]');
    await expect(radios[1]).toBeChecked();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies accordion toggle behavior.' }
    }
  }
};

export const AccessibilityTest: Story = {
  render: () => (
    <Accordion>
      <AccordionItem name='test-a11y' title='Accessible Item' indicator='collapse-arrow' defaultOpen>
        Accessible content
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that title and content are visible
    const title = canvas.getByText('Accessible Item');
    const content = canvas.getByText('Accessible content');

    await expect(title).toBeVisible();
    await expect(content).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies accordion accessibility.' }
    }
  }
};
