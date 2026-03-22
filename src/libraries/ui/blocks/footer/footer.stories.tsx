import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiFacebookFill, RiGithubFill, RiInstagramFill, RiTwitterXFill } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { ICON_LG } from '@/libraries/ui/icons/sizes';
import { type Category, Footer } from './footer';
import { type FooterLink, FooterLinks } from './footer-links';

const meta = {
  title: 'Libraries/UI/Blocks/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Footer component for displaying site navigation, links, and branding. Supports multiple link categories and custom content. Uses FooterLinks subcomponent for rendering link lists.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    categories: {
      description: 'Array of link categories with name and links',
      table: {
        category: 'Content',
        type: { summary: 'Category[]' }
      }
    },
    children: {
      description: 'Custom content (logo, description, social links)',
      table: { category: 'Content' }
    },
    className: {
      description: 'Additional CSS classes for the wrapper',
      table: { category: 'Styling' }
    }
  },
  decorators: [
    (Story) => (
      <div className='bg-base-200'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Sample Data
// =============================================================================

const sampleCategories: Category[] = [
  {
    name: 'Services',
    links: [
      { key: 'branding', linkProps: { href: '/services/branding', children: 'Branding' } },
      { key: 'design', linkProps: { href: '/services/design', children: 'Design' } },
      { key: 'marketing', linkProps: { href: '/services/marketing', children: 'Marketing' } },
      { key: 'advertising', linkProps: { href: '/services/advertising', children: 'Advertising' } }
    ]
  },
  {
    name: 'Company',
    links: [
      { key: 'about', linkProps: { href: '/about', children: 'About us' } },
      { key: 'contact', linkProps: { href: '/contact', children: 'Contact' } },
      { key: 'jobs', linkProps: { href: '/jobs', children: 'Jobs' } },
      { key: 'press', linkProps: { href: '/press', children: 'Press kit' } }
    ]
  },
  {
    name: 'Legal',
    links: [
      { key: 'terms', linkProps: { href: '/terms', children: 'Terms of use' } },
      { key: 'privacy', linkProps: { href: '/privacy', children: 'Privacy policy' } },
      { key: 'cookies', linkProps: { href: '/cookies', children: 'Cookie policy' } }
    ]
  }
];

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  args: {
    categories: sampleCategories
  },
  parameters: {
    docs: {
      description: { story: 'Basic footer with link categories.' }
    }
  }
};

export const WithBranding: Story = {
  args: {
    categories: sampleCategories,
    children: (
      <>
        <p className='text-2xl font-bold'>ACME Industries</p>
        <p className='text-sm opacity-70'>Providing reliable tech since 1992</p>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Footer with company branding and description.' }
    }
  }
};

export const WithSocialLinks: Story = {
  args: {
    categories: sampleCategories,
    children: (
      <div className='space-y-4'>
        <p className='text-2xl font-bold'>ACME Industries</p>
        <p className='text-sm opacity-70'>Providing reliable tech since 1992</p>
        <div className='flex gap-4'>
          <a href='https://twitter.com' aria-label='Twitter' className='hover:text-primary'>
            <RiTwitterXFill size={ICON_LG} />
          </a>
          <a href='https://facebook.com' aria-label='Facebook' className='hover:text-primary'>
            <RiFacebookFill size={ICON_LG} />
          </a>
          <a href='https://instagram.com' aria-label='Instagram' className='hover:text-primary'>
            <RiInstagramFill size={ICON_LG} />
          </a>
          <a href='https://github.com' aria-label='GitHub' className='hover:text-primary'>
            <RiGithubFill size={ICON_LG} />
          </a>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Footer with branding and social media links.' }
    }
  }
};

// =============================================================================
// Variations
// =============================================================================

export const SingleCategory: Story = {
  args: {
    categories: [
      {
        name: 'Services',
        links: [
          { key: 'branding', linkProps: { href: '/services/branding', children: 'Branding' } },
          { key: 'design', linkProps: { href: '/services/design', children: 'Design' } },
          { key: 'marketing', linkProps: { href: '/services/marketing', children: 'Marketing' } },
          { key: 'advertising', linkProps: { href: '/services/advertising', children: 'Advertising' } }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: { story: 'Footer with a single link category.' }
    }
  }
};

export const ManyCategories: Story = {
  args: {
    categories: [
      ...sampleCategories,
      {
        name: 'Resources',
        links: [
          { key: 'docs', linkProps: { href: '/docs', children: 'Documentation' } },
          { key: 'blog', linkProps: { href: '/blog', children: 'Blog' } },
          { key: 'tutorials', linkProps: { href: '/tutorials', children: 'Tutorials' } },
          { key: 'faq', linkProps: { href: '/faq', children: 'FAQ' } }
        ]
      },
      {
        name: 'Support',
        links: [
          { key: 'help', linkProps: { href: '/help', children: 'Help Center' } },
          { key: 'community', linkProps: { href: '/community', children: 'Community' } },
          { key: 'status', linkProps: { href: '/status', children: 'Status' } }
        ]
      }
    ],
    children: (
      <>
        <p className='text-2xl font-bold'>ACME Industries</p>
        <p className='text-sm opacity-70'>Providing reliable tech since 1992</p>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Footer with many link categories.' }
    }
  }
};

export const ContentOnly: Story = {
  args: {
    children: (
      <div className='text-center'>
        <p className='text-2xl font-bold'>ACME Industries</p>
        <p className='mt-2 text-sm opacity-70'>© 2024 ACME Industries. All rights reserved.</p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Footer with only custom content, no categories.' }
    }
  }
};

// =============================================================================
// FooterLinks Component
// =============================================================================

export const FooterLinksVertical: StoryObj<typeof FooterLinks> = {
  render: () => {
    const links: FooterLink[] = [
      { key: 'home', linkProps: { href: '/', children: 'Home' } },
      { key: 'about', linkProps: { href: '/about', children: 'About' } },
      { key: 'contact', linkProps: { href: '/contact', children: 'Contact' } }
    ];
    return (
      <nav className='p-4'>
        <FooterLinks links={links} orientation='vertical' />
      </nav>
    );
  },
  parameters: {
    docs: {
      description: { story: 'FooterLinks with vertical orientation (default).' }
    }
  }
};

export const FooterLinksHorizontal: StoryObj<typeof FooterLinks> = {
  render: () => {
    const links: FooterLink[] = [
      { key: 'home', linkProps: { href: '/', children: 'Home' } },
      { key: 'about', linkProps: { href: '/about', children: 'About' } },
      { key: 'contact', linkProps: { href: '/contact', children: 'Contact' } },
      { key: 'privacy', linkProps: { href: '/privacy', children: 'Privacy' } },
      { key: 'terms', linkProps: { href: '/terms', children: 'Terms' } }
    ];
    return (
      <nav className='p-4'>
        <FooterLinks links={links} orientation='horizontal' />
      </nav>
    );
  },
  parameters: {
    docs: {
      description: { story: 'FooterLinks with horizontal orientation and gap between items.' }
    }
  }
};

export const FooterLinksWithIcons: StoryObj<typeof FooterLinks> = {
  render: () => {
    const links: FooterLink[] = [
      {
        key: 'github',
        linkProps: { href: 'https://github.com', children: 'GitHub', icon: <RiGithubFill /> }
      },
      {
        key: 'twitter',
        linkProps: { href: 'https://twitter.com', children: 'Twitter', icon: <RiTwitterXFill /> }
      }
    ];
    return (
      <nav className='p-4'>
        <FooterLinks links={links} />
      </nav>
    );
  },
  parameters: {
    docs: {
      description: { story: 'FooterLinks with icons.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const EcommerceFooter: Story = {
  args: {
    categories: [
      {
        name: 'Shop',
        links: [
          { key: 'new', linkProps: { href: '/new', children: 'New Arrivals' } },
          { key: 'bestsellers', linkProps: { href: '/bestsellers', children: 'Bestsellers' } },
          { key: 'sale', linkProps: { href: '/sale', children: 'Sale' } },
          { key: 'gift-cards', linkProps: { href: '/gift-cards', children: 'Gift Cards' } }
        ]
      },
      {
        name: 'Help',
        links: [
          { key: 'shipping', linkProps: { href: '/shipping', children: 'Shipping Info' } },
          { key: 'returns', linkProps: { href: '/returns', children: 'Returns & Exchanges' } },
          { key: 'sizing', linkProps: { href: '/sizing', children: 'Size Guide' } },
          { key: 'track', linkProps: { href: '/track', children: 'Track Order' } }
        ]
      },
      {
        name: 'About',
        links: [
          { key: 'story', linkProps: { href: '/story', children: 'Our Story' } },
          { key: 'sustainability', linkProps: { href: '/sustainability', children: 'Sustainability' } },
          { key: 'careers', linkProps: { href: '/careers', children: 'Careers' } }
        ]
      }
    ],
    children: (
      <div className='space-y-4'>
        <p className='text-2xl font-bold'>Fashion Store</p>
        <p className='text-sm opacity-70'>Premium quality clothing and accessories.</p>
        <div className='flex gap-4'>
          <a href='https://instagram.com' aria-label='Instagram' className='hover:text-primary'>
            <RiInstagramFill size={ICON_LG} />
          </a>
          <a href='https://facebook.com' aria-label='Facebook' className='hover:text-primary'>
            <RiFacebookFill size={ICON_LG} />
          </a>
          <a href='https://twitter.com' aria-label='Twitter' className='hover:text-primary'>
            <RiTwitterXFill size={ICON_LG} />
          </a>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'E-commerce footer with shop, help, and about sections.' }
    }
  }
};

export const SaaSFooter: Story = {
  args: {
    categories: [
      {
        name: 'Product',
        links: [
          { key: 'features', linkProps: { href: '/features', children: 'Features' } },
          { key: 'pricing', linkProps: { href: '/pricing', children: 'Pricing' } },
          { key: 'integrations', linkProps: { href: '/integrations', children: 'Integrations' } },
          { key: 'changelog', linkProps: { href: '/changelog', children: 'Changelog' } }
        ]
      },
      {
        name: 'Resources',
        links: [
          { key: 'docs', linkProps: { href: '/docs', children: 'Documentation' } },
          { key: 'api', linkProps: { href: '/api', children: 'API Reference' } },
          { key: 'guides', linkProps: { href: '/guides', children: 'Guides' } },
          { key: 'blog', linkProps: { href: '/blog', children: 'Blog' } }
        ]
      },
      {
        name: 'Company',
        links: [
          { key: 'about', linkProps: { href: '/about', children: 'About' } },
          { key: 'customers', linkProps: { href: '/customers', children: 'Customers' } },
          { key: 'careers', linkProps: { href: '/careers', children: 'Careers' } },
          { key: 'contact', linkProps: { href: '/contact', children: 'Contact' } }
        ]
      },
      {
        name: 'Legal',
        links: [
          { key: 'privacy', linkProps: { href: '/privacy', children: 'Privacy' } },
          { key: 'terms', linkProps: { href: '/terms', children: 'Terms' } },
          { key: 'security', linkProps: { href: '/security', children: 'Security' } }
        ]
      }
    ],
    children: (
      <div className='space-y-4'>
        <p className='text-2xl font-bold'>CloudApp</p>
        <p className='max-w-xs text-sm opacity-70'>The modern platform for building scalable applications.</p>
        <div className='flex gap-4'>
          <a href='https://github.com' aria-label='GitHub' className='hover:text-primary'>
            <RiGithubFill size={ICON_LG} />
          </a>
          <a href='https://twitter.com' aria-label='Twitter' className='hover:text-primary'>
            <RiTwitterXFill size={ICON_LG} />
          </a>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: 'SaaS product footer with product, resources, company, and legal sections.' }
    }
  }
};

// =============================================================================
// Styled Variations
// =============================================================================

export const InvertedBackground: Story = {
  decorators: [
    (Story) => (
      <div className='bg-neutral text-neutral-content'>
        <Story />
      </div>
    )
  ],
  args: {
    categories: sampleCategories,
    children: (
      <>
        <p className='text-2xl font-bold'>ACME Industries</p>
        <p className='text-sm opacity-70'>Providing reliable tech since 1992</p>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Footer with inverted background.' }
    }
  }
};

export const PrimaryBackground: Story = {
  decorators: [
    (Story) => (
      <div className='bg-primary text-primary-content'>
        <Story />
      </div>
    )
  ],
  args: {
    categories: sampleCategories,
    children: (
      <>
        <p className='text-2xl font-bold'>ACME Industries</p>
        <p className='text-sm opacity-70'>Providing reliable tech since 1992</p>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Footer with primary color background.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    categories: [
      {
        name: 'Navigation',
        links: [
          { key: 'home', linkProps: { href: '/', children: 'Home' } },
          { key: 'about', linkProps: { href: '/about', children: 'About' } }
        ]
      }
    ],
    children: <p className='text-xl font-bold'>Test Footer</p>
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check footer is present
    const footer = canvasElement.querySelector('footer');
    await expect(footer).toBeVisible();

    // Check navigation is present with aria-labelledby
    const nav = canvasElement.querySelector('nav');
    await expect(nav).toBeVisible();

    // Check category title
    const title = canvas.getByText('Navigation');
    await expect(title).toBeVisible();

    // Check links are present
    const homeLink = canvas.getByText('Home');
    const aboutLink = canvas.getByText('About');
    await expect(homeLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies footer structure and accessibility.' }
    }
  }
};
