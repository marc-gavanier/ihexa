import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiArrowRightLine, RiDownloadLine, RiExternalLinkLine, RiGithubFill, RiHomeLine, RiMailLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { ButtonLink } from './button-link';

const meta = {
  title: 'Libraries/UI/Primitives/ButtonLink',
  component: ButtonLink,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Link styled as a button using Next.js Link component. Supports all button styling options plus icon display modes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Link destination URL',
      table: {
        category: 'Navigation',
        type: { summary: 'string | UrlObject' }
      }
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Link target attribute',
      table: {
        category: 'Navigation',
        type: { summary: 'HTMLAttributeAnchorTarget' }
      }
    },
    color: {
      control: 'select',
      options: [
        'btn-accent',
        'btn-error',
        'btn-info',
        'btn-neutral',
        'btn-primary',
        'btn-secondary',
        'btn-success',
        'btn-warning'
      ],
      description: 'Semantic color of the button',
      table: {
        category: 'Appearance',
        type: { summary: 'Color' }
      }
    },
    kind: {
      control: 'select',
      options: ['btn-dash', 'btn-ghost', 'btn-link', 'btn-outline', 'btn-soft'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        type: { summary: 'Kind' }
      }
    },
    scale: {
      control: 'select',
      options: ['btn-lg', 'btn-md', 'btn-sm', 'btn-xl', 'btn-xs'],
      description: 'Size of the button',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
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
      description: 'Show only the icon (uses children as title)',
      table: {
        category: 'Content',
        type: { summary: 'boolean' }
      }
    },
    children: {
      description: 'Button text content',
      table: { category: 'Content' }
    }
  },
  args: {
    href: '#',
    children: 'Link'
  }
} satisfies Meta<typeof ButtonLink>;

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
  args: { color: 'btn-accent' },
  parameters: {
    docs: {
      description: { story: 'Accent color for special highlights.' }
    }
  }
};

export const ButtonLinkError: Story = {
  args: { color: 'btn-error' },
  parameters: {
    docs: {
      description: { story: 'Error color for destructive navigation.' }
    }
  }
};

export const Info: Story = {
  args: { color: 'btn-info' },
  parameters: {
    docs: {
      description: { story: 'Info color for informational links.' }
    }
  }
};

export const Neutral: Story = {
  args: { color: 'btn-neutral' },
  parameters: {
    docs: {
      description: { story: 'Neutral color for secondary navigation.' }
    }
  }
};

export const Primary: Story = {
  args: { color: 'btn-primary' },
  parameters: {
    docs: {
      description: { story: 'Primary color for main call-to-action.' }
    }
  }
};

export const Secondary: Story = {
  args: { color: 'btn-secondary' },
  parameters: {
    docs: {
      description: { story: 'Secondary color for alternative actions.' }
    }
  }
};

export const Success: Story = {
  args: { color: 'btn-success' },
  parameters: {
    docs: {
      description: { story: 'Success color for positive actions.' }
    }
  }
};

export const Warning: Story = {
  args: { color: 'btn-warning' },
  parameters: {
    docs: {
      description: { story: 'Warning color for cautionary links.' }
    }
  }
};

export const AllColors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <ButtonLink href='#' color='btn-accent'>
        Accent
      </ButtonLink>
      <ButtonLink href='#'>Default</ButtonLink>
      <ButtonLink href='#' color='btn-error'>
        Error
      </ButtonLink>
      <ButtonLink href='#' color='btn-info'>
        Info
      </ButtonLink>
      <ButtonLink href='#' color='btn-neutral'>
        Neutral
      </ButtonLink>
      <ButtonLink href='#' color='btn-primary'>
        Primary
      </ButtonLink>
      <ButtonLink href='#' color='btn-secondary'>
        Secondary
      </ButtonLink>
      <ButtonLink href='#' color='btn-success'>
        Success
      </ButtonLink>
      <ButtonLink href='#' color='btn-warning'>
        Warning
      </ButtonLink>
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
// Scales
// =============================================================================

export const ExtraLarge: Story = {
  args: { scale: 'btn-xl' },
  parameters: {
    docs: {
      description: { story: 'Extra large button link.' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'btn-lg' },
  parameters: {
    docs: {
      description: { story: 'Large button link size.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'btn-md' },
  parameters: {
    docs: {
      description: { story: 'Medium button link size (default).' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'btn-sm' },
  parameters: {
    docs: {
      description: { story: 'Small button link.' }
    }
  }
};

export const ExtraSmall: Story = {
  args: { scale: 'btn-xs' },
  parameters: {
    docs: {
      description: { story: 'Extra small button link.' }
    }
  }
};

export const AllScales: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <ButtonLink href='#' scale='btn-xl'>
        XL
      </ButtonLink>
      <ButtonLink href='#' scale='btn-lg'>
        LG
      </ButtonLink>
      <ButtonLink href='#' scale='btn-md'>
        MD
      </ButtonLink>
      <ButtonLink href='#' scale='btn-sm'>
        SM
      </ButtonLink>
      <ButtonLink href='#' scale='btn-xs'>
        XS
      </ButtonLink>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all available sizes.' }
    }
  }
};

// =============================================================================
// Styles (Kind)
// =============================================================================

export const Dash: Story = {
  args: { kind: 'btn-dash' },
  parameters: {
    docs: {
      description: { story: 'Button link with dashed border.' }
    }
  }
};

export const Ghost: Story = {
  args: { kind: 'btn-ghost' },
  parameters: {
    docs: {
      description: { story: 'Transparent button link with hover effect.' }
    }
  }
};

export const Link: Story = {
  args: { kind: 'btn-link' },
  parameters: {
    docs: {
      description: { story: 'Button styled as a text link.' }
    }
  }
};

export const Outline: Story = {
  args: { kind: 'btn-outline' },
  parameters: {
    docs: {
      description: { story: 'Button link with outline border.' }
    }
  }
};

export const Soft: Story = {
  args: { kind: 'btn-soft' },
  parameters: {
    docs: {
      description: { story: 'Button link with muted background.' }
    }
  }
};

export const AllKinds: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <ButtonLink href='#' kind='btn-dash'>
        Dash
      </ButtonLink>
      <ButtonLink href='#'>Default</ButtonLink>
      <ButtonLink href='#' kind='btn-ghost'>
        Ghost
      </ButtonLink>
      <ButtonLink href='#' kind='btn-link'>
        Link
      </ButtonLink>
      <ButtonLink href='#' kind='btn-outline'>
        Outline
      </ButtonLink>
      <ButtonLink href='#' kind='btn-soft'>
        Soft
      </ButtonLink>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all style variants.' }
    }
  }
};

// =============================================================================
// With Icons
// =============================================================================

export const WithIcon: Story = {
  args: {
    color: 'btn-primary',
    icon: <RiArrowRightLine />,
    children: 'Continue'
  },
  parameters: {
    docs: {
      description: { story: 'Button link with leading icon.' }
    }
  }
};

export const IconOnly: Story = {
  args: {
    icon: <RiHomeLine size={20} />,
    iconOnly: true,
    children: 'Home',
    modifier: 'btn-circle'
  },
  parameters: {
    docs: {
      description: { story: 'Icon-only button link (children used as title).' }
    }
  }
};

export const AllIconVariants: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <ButtonLink href='#' color='btn-primary' icon={<RiDownloadLine />}>
        Download
      </ButtonLink>
      <ButtonLink href='#' kind='btn-outline' icon={<RiMailLine />}>
        Contact
      </ButtonLink>
      <ButtonLink href='#' modifier='btn-circle' icon={<RiHomeLine size={20} />} iconOnly>
        Home
      </ButtonLink>
      <ButtonLink href='#' modifier='btn-square' icon={<RiGithubFill size={20} />} iconOnly>
        GitHub
      </ButtonLink>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Various icon configurations.' }
    }
  }
};

// =============================================================================
// External Links
// =============================================================================

export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    icon: <RiExternalLinkLine />,
    children: 'Open External'
  },
  parameters: {
    docs: {
      description: { story: 'External link opening in new tab (adds rel="noopener noreferrer").' }
    }
  }
};

export const ExternalLinkVariants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <ButtonLink href='https://github.com' target='_blank' color='btn-neutral' icon={<RiGithubFill />}>
        GitHub
      </ButtonLink>
      <ButtonLink href='https://example.com' target='_blank' kind='btn-outline' icon={<RiExternalLinkLine />}>
        Documentation
      </ButtonLink>
      <ButtonLink href='https://example.com' target='_blank' kind='btn-link'>
        Learn more <RiExternalLinkLine size={14} />
      </ButtonLink>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Various external link styles.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const NavigationLinks: Story = {
  render: () => (
    <nav className='flex gap-2'>
      <ButtonLink href='#' kind='btn-ghost'>
        Home
      </ButtonLink>
      <ButtonLink href='#' kind='btn-ghost'>
        Products
      </ButtonLink>
      <ButtonLink href='#' kind='btn-ghost'>
        About
      </ButtonLink>
      <ButtonLink href='#' kind='btn-ghost'>
        Contact
      </ButtonLink>
    </nav>
  ),
  parameters: {
    docs: {
      description: { story: 'Navigation menu links.' }
    }
  }
};

export const CallToAction: Story = {
  render: () => (
    <div className='flex gap-2'>
      <ButtonLink href='#' color='btn-primary' icon={<RiArrowRightLine />}>
        Get Started
      </ButtonLink>
      <ButtonLink href='#' kind='btn-ghost'>
        Learn more
      </ButtonLink>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Common CTA button pairing.' }
    }
  }
};

export const DownloadLink: Story = {
  args: {
    href: '/file.pdf',
    color: 'btn-success',
    icon: <RiDownloadLine />,
    children: 'Download PDF'
  },
  parameters: {
    docs: {
      description: { story: 'Download action link.' }
    }
  }
};

export const BackLink: Story = {
  render: () => (
    <ButtonLink href='#' kind='btn-ghost' scale='btn-sm'>
      ← Back to list
    </ButtonLink>
  ),
  parameters: {
    docs: {
      description: { story: 'Back navigation link.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    href: '/test',
    color: 'btn-primary',
    children: 'Navigate'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/test');
    await expect(link).toHaveTextContent('Navigate');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies button link is accessible.' }
    }
  }
};

export const ExternalLinkTest: Story = {
  args: {
    href: 'https://example.com',
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
