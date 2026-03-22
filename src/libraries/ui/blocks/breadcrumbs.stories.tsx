import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Breadcrumbs } from './breadcrumbs';

const meta = {
  title: 'Libraries/UI/Blocks/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumb navigation component. Displays a trail of links showing the current page location. The last item without href is treated as the current page.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of breadcrumb items with label and optional href',
      table: {
        category: 'Content',
        type: { summary: '{ label: string; href?: string }[]' }
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Styling',
        type: { summary: 'string' }
      }
    }
  }
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones' }
    ]
  },
  parameters: {
    docs: {
      description: { story: 'Default breadcrumb with multiple levels.' }
    }
  }
};

// =============================================================================
// Variations
// =============================================================================

export const TwoLevels: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'About' }]
  },
  parameters: {
    docs: {
      description: { story: 'Simple two-level breadcrumb.' }
    }
  }
};

export const ThreeLevels: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Article Title' }]
  },
  parameters: {
    docs: {
      description: { story: 'Three-level breadcrumb.' }
    }
  }
};

export const ManyLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/sub' },
      { label: 'Section', href: '/category/sub/section' },
      { label: 'Subsection', href: '/category/sub/section/subsection' },
      { label: 'Current Page' }
    ]
  },
  parameters: {
    docs: {
      description: { story: 'Deep breadcrumb with many levels.' }
    }
  }
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }]
  },
  parameters: {
    docs: {
      description: { story: 'Single item breadcrumb (current page only).' }
    }
  }
};

export const Empty: Story = {
  args: {
    items: []
  },
  parameters: {
    docs: {
      description: { story: 'Empty items array renders nothing.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const ECommerce: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Electronics', href: '/electronics' },
      { label: 'Computers', href: '/electronics/computers' },
      { label: 'Laptops', href: '/electronics/computers/laptops' },
      { label: 'MacBook Pro 14"' }
    ]
  },
  parameters: {
    docs: {
      description: { story: 'E-commerce product page breadcrumb.' }
    }
  }
};

export const Blog: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Technology', href: '/blog/technology' },
      { label: 'How to Build a React App' }
    ]
  },
  parameters: {
    docs: {
      description: { story: 'Blog article breadcrumb.' }
    }
  }
};

export const Documentation: Story = {
  args: {
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Navigation', href: '/docs/components/navigation' },
      { label: 'Breadcrumbs' }
    ]
  },
  parameters: {
    docs: {
      description: { story: 'Documentation page breadcrumb.' }
    }
  }
};

export const Dashboard: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings', href: '/dashboard/settings' },
      { label: 'Profile' }
    ]
  },
  parameters: {
    docs: {
      description: { story: 'Dashboard settings breadcrumb.' }
    }
  }
};

export const FileSystem: Story = {
  args: {
    items: [
      { label: 'Root', href: '/files' },
      { label: 'Documents', href: '/files/documents' },
      { label: 'Projects', href: '/files/documents/projects' },
      { label: '2024', href: '/files/documents/projects/2024' },
      { label: 'report.pdf' }
    ]
  },
  parameters: {
    docs: {
      description: { story: 'File browser breadcrumb.' }
    }
  }
};

// =============================================================================
// In Context
// =============================================================================

export const InPageHeader: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Product Details' }]
  },
  render: (args) => (
    <div className='w-full max-w-2xl space-y-2'>
      <Breadcrumbs {...args} />
      <h1 className='text-2xl font-bold'>Product Details</h1>
      <p className='text-base-content/70'>View and manage product information.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Breadcrumb in a page header context.' }
    }
  }
};

export const InCard: Story = {
  args: {
    items: [{ label: 'Settings', href: '/settings' }, { label: 'Account', href: '/settings/account' }, { label: 'Security' }]
  },
  render: (args) => (
    <div className='card card-border bg-base-100 w-96'>
      <div className='card-body'>
        <Breadcrumbs {...args} />
        <h2 className='card-title mt-2'>Security Settings</h2>
        <p className='text-sm text-base-content/70'>Manage your account security preferences.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Breadcrumb inside a card component.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current' }]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check links are present
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    const productsLink = canvas.getByRole('link', { name: 'Products' });

    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '/');
    await expect(productsLink).toBeVisible();
    await expect(productsLink).toHaveAttribute('href', '/products');

    // Current page should not be a link
    const currentPage = canvas.getByText('Current');
    await expect(currentPage).toBeVisible();
    await expect(currentPage.tagName).not.toBe('A');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies links and current page rendering.' }
    }
  }
};

export const EmptyTest: Story = {
  args: {
    items: []
  },
  play: async ({ canvasElement }) => {
    // Should render nothing
    await expect(canvasElement.querySelector('.breadcrumbs')).toBeNull();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies empty state renders nothing.' }
    }
  }
};
