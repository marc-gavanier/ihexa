import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Avatar, getAvatarGradient, getInitials } from '../../primitives/avatar';
import { ItemCard, ItemCardContent, ItemCardFooter, ItemCardHeader } from './item-card';

const meta = {
  title: 'Libraries/UI/Blocks/ItemCard',
  component: ItemCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible card component for displaying items in a list or grid. Supports optional header, content, and footer slots. Can be interactive (with href) or static.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'If provided, the card becomes a link with hover effects',
      table: {
        category: 'Behavior',
        type: { summary: 'string' }
      }
    },
    children: {
      description: 'Card content using ItemCardHeader, ItemCardContent, and ItemCardFooter slots',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    }
  }
} satisfies Meta<typeof ItemCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  args: {
    children: (
      <>
        <ItemCardHeader>
          <Avatar
            size='w-8'
            shape='rounded-full'
            background={getAvatarGradient('Example Project')}
            text='text-white'
            placeholder={getInitials('Example Project')}
          />
          <h3 className='font-semibold'>Example Project</h3>
        </ItemCardHeader>
        <ItemCardContent>
          <p className='mt-3 line-clamp-4 text-sm text-neutral'>
            This is a description of the project. It can span multiple lines and will be truncated if too long.
          </p>
        </ItemCardContent>
        <ItemCardFooter>
          <span className='text-xs text-neutral'>Created on January 28, 2026</span>
        </ItemCardFooter>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Default static card without link behavior.' }
    }
  }
};

// =============================================================================
// Interactive (with href)
// =============================================================================

export const Interactive: Story = {
  args: {
    href: '/projects/123',
    children: (
      <>
        <ItemCardHeader>
          <Avatar
            size='w-8'
            shape='rounded-full'
            background={getAvatarGradient('Interactive Card')}
            text='text-white'
            placeholder={getInitials('Interactive Card')}
          />
          <h3 className='font-semibold'>Interactive Card</h3>
        </ItemCardHeader>
        <ItemCardContent>
          <p className='mt-3 line-clamp-4 text-sm text-neutral'>
            This card is interactive. Hover to see the arrow indicator and border highlight.
          </p>
        </ItemCardContent>
        <ItemCardFooter>
          <span className='text-xs text-neutral'>Click to navigate</span>
        </ItemCardFooter>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Interactive card with href. Shows arrow on hover and has hover effects.' }
    }
  }
};

// =============================================================================
// Slot Variations
// =============================================================================

export const HeaderOnly: Story = {
  args: {
    href: '/items/1',
    children: (
      <ItemCardHeader>
        <Avatar
          size='w-8'
          shape='rounded-full'
          background={getAvatarGradient('Simple Item')}
          text='text-white'
          placeholder={getInitials('Simple Item')}
        />
        <h3 className='font-semibold'>Simple Item</h3>
      </ItemCardHeader>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with only a header slot.' }
    }
  }
};

export const HeaderAndContent: Story = {
  args: {
    children: (
      <>
        <ItemCardHeader>
          <Avatar
            size='w-8'
            shape='rounded-full'
            background={getAvatarGradient('With Content')}
            text='text-white'
            placeholder={getInitials('With Content')}
          />
          <h3 className='font-semibold'>With Content</h3>
        </ItemCardHeader>
        <ItemCardContent>
          <p className='mt-3 line-clamp-4 text-sm text-neutral'>This card has a header and content, but no footer.</p>
        </ItemCardContent>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with header and content, no footer.' }
    }
  }
};

export const HeaderAndFooter: Story = {
  args: {
    href: '/items/2',
    children: (
      <>
        <ItemCardHeader>
          <Avatar
            size='w-8'
            shape='rounded-full'
            background={getAvatarGradient('No Description')}
            text='text-white'
            placeholder={getInitials('No Description')}
          />
          <h3 className='font-semibold'>No Description</h3>
        </ItemCardHeader>
        <ItemCardContent />
        <ItemCardFooter>
          <span className='text-xs text-neutral'>Updated 2 hours ago</span>
        </ItemCardFooter>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with header and footer, empty content for spacing.' }
    }
  }
};

// =============================================================================
// Grid Layout
// =============================================================================

export const InGrid: Story = {
  render: () => (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {['Alpha Project', 'Beta Feature', 'Gamma Release'].map((title) => (
        <ItemCard key={title} href={`/projects/${title.toLowerCase().replace(' ', '-')}`}>
          <ItemCardHeader>
            <Avatar
              size='w-8'
              shape='rounded-full'
              background={getAvatarGradient(title)}
              text='text-white'
              placeholder={getInitials(title)}
            />
            <h3 className='font-semibold'>{title}</h3>
          </ItemCardHeader>
          <ItemCardContent>
            <p className='mt-3 line-clamp-4 text-sm text-neutral'>
              Description for {title}. This demonstrates how cards align in a grid layout.
            </p>
          </ItemCardContent>
          <ItemCardFooter>
            <span className='text-xs text-neutral'>Created recently</span>
          </ItemCardFooter>
        </ItemCard>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Multiple cards displayed in a responsive grid layout.' }
    }
  }
};

export const MixedContentLengths: Story = {
  render: () => (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      <ItemCard href='/projects/1'>
        <ItemCardHeader>
          <Avatar
            size='w-8'
            shape='rounded-full'
            background={getAvatarGradient('Short')}
            text='text-white'
            placeholder={getInitials('Short')}
          />
          <h3 className='font-semibold'>Short Description</h3>
        </ItemCardHeader>
        <ItemCardContent>
          <p className='mt-3 line-clamp-4 text-sm text-neutral'>Brief text.</p>
        </ItemCardContent>
        <ItemCardFooter>
          <span className='text-xs text-neutral'>Jan 1, 2026</span>
        </ItemCardFooter>
      </ItemCard>
      <ItemCard href='/projects/2'>
        <ItemCardHeader>
          <Avatar
            size='w-8'
            shape='rounded-full'
            background={getAvatarGradient('Long Description')}
            text='text-white'
            placeholder={getInitials('Long Description')}
          />
          <h3 className='font-semibold'>Long Description</h3>
        </ItemCardHeader>
        <ItemCardContent>
          <p className='mt-3 line-clamp-4 text-sm text-neutral'>
            This is a much longer description that spans multiple lines. It demonstrates how the card handles varying content
            lengths while maintaining consistent footer alignment across all cards in the grid.
          </p>
        </ItemCardContent>
        <ItemCardFooter>
          <span className='text-xs text-neutral'>Jan 15, 2026</span>
        </ItemCardFooter>
      </ItemCard>
      <ItemCard href='/projects/3'>
        <ItemCardHeader>
          <Avatar
            size='w-8'
            shape='rounded-full'
            background={getAvatarGradient('No Content')}
            text='text-white'
            placeholder={getInitials('No Content')}
          />
          <h3 className='font-semibold'>No Content</h3>
        </ItemCardHeader>
        <ItemCardContent />
        <ItemCardFooter>
          <span className='text-xs text-neutral'>Jan 28, 2026</span>
        </ItemCardFooter>
      </ItemCard>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Cards with different content lengths showing footer alignment.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    href: '/test',
    children: (
      <>
        <ItemCardHeader>
          <h3 className='font-semibold'>Test Card</h3>
        </ItemCardHeader>
        <ItemCardContent>
          <p className='mt-3 text-sm text-neutral'>Test content</p>
        </ItemCardContent>
        <ItemCardFooter>
          <span className='text-xs text-neutral'>Test footer</span>
        </ItemCardFooter>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/test');

    const title = canvas.getByText('Test Card');
    await expect(title).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies card is accessible as a link.' }
    }
  }
};
