import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { ButtonLink } from '../../primitives/button-link';
import { NextPageLink, PageLink, PreviousPageLink } from './page-link';
import { Pagination } from './pagination';

const meta: Meta = {
  title: 'Libraries/UI/Blocks/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pagination component for navigating through pages of content. Uses render props pattern for flexible page link rendering. Supports configurable siblings, boundaries, and navigation controls.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  render: () => (
    <Pagination itemsCount={100} pageSize={10} currentPage={1} href='/products'>
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Basic pagination with page links.' }
    }
  }
};

// =============================================================================
// With Navigation
// =============================================================================

export const WithNavigation: Story = {
  render: () => (
    <Pagination
      itemsCount={100}
      pageSize={10}
      currentPage={5}
      href='/products'
      nav={{
        previous: (props) => <PreviousPageLink {...props} />,
        next: (props) => <NextPageLink {...props} />
      }}
    >
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Pagination with previous/next navigation arrows.' }
    }
  }
};

// =============================================================================
// Current Page Variations
// =============================================================================

export const FirstPage: Story = {
  render: () => (
    <Pagination
      itemsCount={100}
      pageSize={10}
      currentPage={1}
      href='/items'
      nav={{
        previous: (props) => <PreviousPageLink {...props} />,
        next: (props) => <NextPageLink {...props} />
      }}
    >
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Pagination on first page (previous disabled).' }
    }
  }
};

export const MiddlePage: Story = {
  render: () => (
    <Pagination
      itemsCount={100}
      pageSize={10}
      currentPage={5}
      href='/items'
      nav={{
        previous: (props) => <PreviousPageLink {...props} />,
        next: (props) => <NextPageLink {...props} />
      }}
    >
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Pagination in the middle with ellipsis on both sides.' }
    }
  }
};

export const LastPage: Story = {
  render: () => (
    <Pagination
      itemsCount={100}
      pageSize={10}
      currentPage={10}
      href='/items'
      nav={{
        previous: (props) => <PreviousPageLink {...props} />,
        next: (props) => <NextPageLink {...props} />
      }}
    >
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Pagination on last page (next disabled).' }
    }
  }
};

// =============================================================================
// Different Sizes
// =============================================================================

export const FewPages: Story = {
  render: () => (
    <Pagination
      itemsCount={30}
      pageSize={10}
      currentPage={2}
      href='/items'
      nav={{
        previous: (props) => <PreviousPageLink {...props} />,
        next: (props) => <NextPageLink {...props} />
      }}
    >
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Pagination with only 3 pages (no ellipsis).' }
    }
  }
};

export const ManyPages: Story = {
  render: () => (
    <Pagination
      itemsCount={500}
      pageSize={10}
      currentPage={25}
      href='/items'
      nav={{
        previous: (props) => <PreviousPageLink {...props} />,
        next: (props) => <NextPageLink {...props} />
      }}
    >
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Pagination with 50 pages.' }
    }
  }
};

export const SinglePage: Story = {
  render: () => (
    <Pagination
      itemsCount={5}
      pageSize={10}
      currentPage={1}
      href='/items'
      nav={{
        previous: (props) => <PreviousPageLink {...props} />,
        next: (props) => <NextPageLink {...props} />
      }}
    >
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Single page (both navigation disabled).' }
    }
  }
};

// =============================================================================
// Configuration
// =============================================================================

export const CustomSiblingCount: Story = {
  render: () => (
    <Pagination
      itemsCount={200}
      pageSize={10}
      currentPage={10}
      siblingCount={1}
      href='/items'
      nav={{
        previous: (props) => <PreviousPageLink {...props} />,
        next: (props) => <NextPageLink {...props} />
      }}
    >
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Pagination with siblingCount=1 (fewer pages around current).' }
    }
  }
};

export const CustomBoundaryCount: Story = {
  render: () => (
    <Pagination
      itemsCount={200}
      pageSize={10}
      currentPage={10}
      boundaryCount={2}
      href='/items'
      nav={{
        previous: (props) => <PreviousPageLink {...props} />,
        next: (props) => <NextPageLink {...props} />
      }}
    >
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Pagination with boundaryCount=2 (more pages at start/end).' }
    }
  }
};

// =============================================================================
// Custom Rendering
// =============================================================================

export const CustomPageLinks: Story = {
  render: () => (
    <Pagination itemsCount={50} pageSize={10} currentPage={3} href='/items'>
      {({ number, isCurrent, href }) => (
        <ButtonLink
          href={href}
          className='join-item'
          color={isCurrent ? 'btn-secondary' : undefined}
          kind={isCurrent ? undefined : 'btn-outline'}
          scale='btn-sm'
        >
          {number}
        </ButtonLink>
      )}
    </Pagination>
  ),
  parameters: {
    docs: {
      description: { story: 'Custom page link rendering with different styling.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const ProductList: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='text-sm text-base-content/70'>Showing 41-50 of 156 products</div>
      <Pagination
        itemsCount={156}
        pageSize={10}
        currentPage={5}
        href='/products?category=electronics'
        nav={{
          previous: (props) => <PreviousPageLink {...props} />,
          next: (props) => <NextPageLink {...props} />
        }}
      >
        {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
      </Pagination>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Product list pagination with item count.' }
    }
  }
};

export const BlogPosts: Story = {
  render: () => (
    <div className='flex justify-center'>
      <Pagination
        itemsCount={87}
        pageSize={5}
        currentPage={3}
        href='/blog'
        nav={{
          previous: (props) => <PreviousPageLink {...props} />,
          next: (props) => <NextPageLink {...props} />
        }}
      >
        {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
      </Pagination>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Blog posts pagination centered.' }
    }
  }
};

export const SearchResults: Story = {
  render: () => (
    <div className='w-full max-w-2xl'>
      <div className='mb-4 text-sm text-base-content/70'>Found 1,234 results for "react components"</div>
      <Pagination
        itemsCount={1234}
        pageSize={20}
        currentPage={1}
        href='/search?q=react+components'
        nav={{
          previous: (props) => <PreviousPageLink {...props} />,
          next: (props) => <NextPageLink {...props} />
        }}
      >
        {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
      </Pagination>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Search results pagination.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  render: () => (
    <Pagination
      itemsCount={50}
      pageSize={10}
      currentPage={3}
      href='/test'
      nav={{
        previous: (props) => <PreviousPageLink {...props} />,
        next: (props) => <NextPageLink {...props} />
      }}
    >
      {({ number, isCurrent, href }) => <PageLink number={number} isCurrent={isCurrent} href={href} />}
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check page links are present
    const page3 = canvas.getByTitle('Page 3');
    await expect(page3).toBeVisible();

    // Check navigation buttons
    const prevButton = canvas.getByTitle('Page précédente');
    const nextButton = canvas.getByTitle('Page suivante');
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies pagination links and navigation.' }
    }
  }
};
