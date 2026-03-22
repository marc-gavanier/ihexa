import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiExternalLinkLine, RiGithubLine, RiHomeLine, RiMailLine, RiSettingsLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { Link, type LinkProps } from './link';

const meta = {
  title: 'Libraries/UI/Primitives/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Link component built on Next.js Link. Supports semantic colors, hover styles, and optional icons. Automatically adds rel="noopener noreferrer" for external links.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'link-accent',
        'link-error',
        'link-info',
        'link-neutral',
        'link-primary',
        'link-secondary',
        'link-success',
        'link-warning',
        'none'
      ],
      description: 'Semantic color of the link',
      table: {
        category: 'Appearance',
        type: { summary: 'Color' },
        defaultValue: { summary: 'link-primary' }
      }
    },
    kind: {
      control: 'select',
      options: ['link-hover', 'none'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        type: { summary: 'Kind' },
        defaultValue: { summary: 'link-hover' }
      }
    },
    icon: {
      description: 'Icon element to display',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    },
    iconOnly: {
      control: 'boolean',
      description: 'Show only the icon (children used as title)',
      table: {
        category: 'Content',
        type: { summary: 'boolean' }
      }
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Link target attribute',
      table: {
        category: 'Behavior',
        type: { summary: 'HTMLAttributeAnchorTarget' }
      }
    },
    href: {
      control: 'text',
      description: 'URL to navigate to',
      table: {
        category: 'Navigation',
        type: { summary: 'string | UrlObject' }
      }
    },
    children: {
      description: 'Link text content',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    }
  },
  args: {
    href: '#',
    children: 'Click here'
  }
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

// =============================================================================
// Colors
// =============================================================================

export const Accent: Story = {
  args: { color: 'link-accent' },
  parameters: {
    docs: {
      description: { story: 'Accent color link.' }
    }
  }
};

export const LinkError: Story = {
  args: { color: 'link-error' },
  parameters: {
    docs: {
      description: { story: 'Error color link.' }
    }
  }
};

export const Info: Story = {
  args: { color: 'link-info' },
  parameters: {
    docs: {
      description: { story: 'Info color link.' }
    }
  }
};

export const Neutral: Story = {
  args: { color: 'link-neutral' },
  parameters: {
    docs: {
      description: { story: 'Neutral color link.' }
    }
  }
};

export const Primary: Story = {
  args: { color: 'link-primary' },
  parameters: {
    docs: {
      description: { story: 'Primary color link (default).' }
    }
  }
};

export const Secondary: Story = {
  args: { color: 'link-secondary' },
  parameters: {
    docs: {
      description: { story: 'Secondary color link.' }
    }
  }
};

export const Success: Story = {
  args: { color: 'link-success' },
  parameters: {
    docs: {
      description: { story: 'Success color link.' }
    }
  }
};

export const Warning: Story = {
  args: { color: 'link-warning' },
  parameters: {
    docs: {
      description: { story: 'Warning color link.' }
    }
  }
};

export const NoColor: Story = {
  args: { color: 'none' },
  parameters: {
    docs: {
      description: { story: 'Link without color styling.' }
    }
  }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Link href='#' color='link-accent'>
        Accent
      </Link>
      <Link href='#' color='link-error'>
        Error
      </Link>
      <Link href='#' color='link-info'>
        Info
      </Link>
      <Link href='#' color='link-neutral'>
        Neutral
      </Link>
      <Link href='#' color='link-primary'>
        Primary
      </Link>
      <Link href='#' color='link-secondary'>
        Secondary
      </Link>
      <Link href='#' color='link-success'>
        Success
      </Link>
      <Link href='#' color='link-warning'>
        Warning
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all available colors.' }
    }
  }
};

// =============================================================================
// Styles (Kind)
// =============================================================================

export const Hover: Story = {
  args: { kind: 'link-hover' },
  parameters: {
    docs: {
      description: { story: 'Underline appears on hover (default).' }
    }
  }
};

export const NoHover: Story = {
  args: { kind: 'none' },
  parameters: {
    docs: {
      description: { story: 'Always underlined, no hover effect.' }
    }
  }
};

export const AllKinds: Story = {
  render: () => (
    <div className='flex gap-6'>
      <Link href='#' kind='link-hover'>
        Hover style
      </Link>
      <Link href='#' kind='none'>
        Always underlined
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Comparison of link styles.' }
    }
  }
};

// =============================================================================
// With Icons
// =============================================================================

export const WithIcon: Story = {
  args: {
    icon: <RiExternalLinkLine size={16} />,
    children: 'External link'
  },
  parameters: {
    docs: {
      description: { story: 'Link with icon.' }
    }
  }
};

export const IconOnly: Story = {
  args: {
    icon: <RiSettingsLine />,
    iconOnly: true,
    children: 'Settings'
  },
  parameters: {
    docs: {
      description: { story: 'Icon-only link with title for accessibility.' }
    }
  }
};

export const AllIconVariants: Story = {
  render: () => (
    <div className='flex items-center gap-6'>
      <Link href='#' icon={<RiHomeLine size={16} />}>
        Home
      </Link>
      <Link href='#' icon={<RiMailLine size={16} />}>
        Contact
      </Link>
      <Link href='#' icon={<RiGithubLine />} iconOnly>
        GitHub
      </Link>
      <Link href='#' icon={<RiSettingsLine />} iconOnly>
        Settings
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Links with icons and icon-only variants.' }
    }
  }
};

// =============================================================================
// Target
// =============================================================================

export const ExternalLink: Story = {
  args: {
    target: '_blank',
    icon: <RiExternalLinkLine size={16} />,
    children: 'Open in new tab'
  },
  parameters: {
    docs: {
      description: { story: 'External link with target="_blank" (auto-adds rel="noopener noreferrer").' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const InlineLink: Story = {
  render: () => (
    <p className='max-w-md text-base-content'>
      Please read our{' '}
      <Link href='#' color='link-primary'>
        terms of service
      </Link>{' '}
      and{' '}
      <Link href='#' color='link-primary'>
        privacy policy
      </Link>{' '}
      before continuing.
    </p>
  ),
  parameters: {
    docs: {
      description: { story: 'Links within paragraph text.' }
    }
  }
};

export const NavigationLinks: Story = {
  render: () => (
    <nav className='flex gap-4'>
      <Link href='#' color='link-neutral' icon={<RiHomeLine size={16} />}>
        Home
      </Link>
      <Link href='#' color='link-neutral'>
        Products
      </Link>
      <Link href='#' color='link-neutral'>
        About
      </Link>
      <Link href='#' color='link-neutral'>
        Contact
      </Link>
    </nav>
  ),
  parameters: {
    docs: {
      description: { story: 'Navigation bar with links.' }
    }
  }
};

export const FooterLinks: Story = {
  render: () => (
    <footer className='flex flex-col gap-2 text-sm'>
      <Link href='#' color='link-neutral' kind='link-hover'>
        Privacy Policy
      </Link>
      <Link href='#' color='link-neutral' kind='link-hover'>
        Terms of Service
      </Link>
      <Link href='#' color='link-neutral' kind='link-hover'>
        Cookie Settings
      </Link>
      <Link href='#' color='link-neutral' kind='link-hover' target='_blank' icon={<RiExternalLinkLine size={14} />}>
        Documentation
      </Link>
    </footer>
  ),
  parameters: {
    docs: {
      description: { story: 'Footer link list.' }
    }
  }
};

export const SocialLinks: Story = {
  render: () => (
    <div className='flex gap-3'>
      <Link href='#' icon={<RiGithubLine size={20} />} iconOnly color='link-neutral'>
        GitHub
      </Link>
      <Link href='#' icon={<RiMailLine size={20} />} iconOnly color='link-neutral'>
        Email
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Social media icon links.' }
    }
  }
};

export const BreadcrumbLinks: Story = {
  render: () => (
    <div className='flex items-center gap-2 text-sm'>
      <Link href='#' color='link-neutral'>
        Home
      </Link>
      <span className='text-base-content/50'>/</span>
      <Link href='#' color='link-neutral'>
        Products
      </Link>
      <span className='text-base-content/50'>/</span>
      <span className='text-base-content'>Current Page</span>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Breadcrumb navigation with links.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const colors: Array<LinkProps['color']> = [
  'link-accent',
  'link-error',
  'link-info',
  'link-neutral',
  'link-primary',
  'link-secondary',
  'link-success',
  'link-warning'
];
const kinds: Array<LinkProps['kind']> = ['link-hover', 'none'];

export const Matrix: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {kinds.map((kind) => (
        <div key={kind ?? 'default-kind'}>
          <h3 className='mb-2 font-semibold'>{kind ?? 'Default'}</h3>
          <div className='flex flex-wrap gap-4'>
            {colors.map((color) => (
              <Link key={`${kind}-${color}`} href='#' kind={kind} color={color}>
                {color?.replace('link-', '') ?? 'Default'}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of kind × color combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    href: '#test',
    children: 'Test Link'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '#test');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies link is accessible.' }
    }
  }
};

export const ExternalLinkTest: Story = {
  args: {
    href: '#external',
    target: '_blank',
    children: 'External'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies external link has proper rel attribute.' }
    }
  }
};

export const IconOnlyTest: Story = {
  args: {
    href: '#',
    icon: <RiSettingsLine />,
    iconOnly: true,
    children: 'Settings'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    await expect(link).toHaveAttribute('title', 'Settings');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies icon-only link has title attribute.' }
    }
  }
};
