import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { SeparatedList } from './separated-list';

const meta = {
  title: 'Libraries/UI/Blocks/SeparatedList',
  component: SeparatedList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays a list of items with a configurable separator between each item. Useful for breadcrumbs, metadata display, or any inline list presentation.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of items to display in the list',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode[]' }
      }
    },
    separator: {
      control: 'text',
      description: 'Separator element displayed between items',
      table: {
        category: 'Appearance',
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '•' }
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
      table: {
        category: 'Styling',
        type: { summary: 'string' }
      }
    }
  },
  args: {
    items: ['Premier', 'Deuxième', 'Troisième'],
    separator: '•'
  }
} satisfies Meta<typeof SeparatedList>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default separated list with bullet separator.'
      }
    }
  }
};

export const SingleItem: Story = {
  args: {
    items: ['Seul élément']
  },
  parameters: {
    docs: {
      description: {
        story: 'A list with only one item displays without any separator.'
      }
    }
  }
};

export const TwoItems: Story = {
  args: {
    items: ['Département 69', '15 janvier 2025']
  },
  parameters: {
    docs: {
      description: {
        story: 'A list with two items displays with one separator between them.'
      }
    }
  }
};

// =============================================================================
// Separators
// =============================================================================

export const DashSeparator: Story = {
  args: {
    items: ['2024', '01', '15'],
    separator: '-'
  },
  parameters: {
    docs: {
      description: {
        story: 'Using a dash as separator, useful for date formatting.'
      }
    }
  }
};

export const PipeSeparator: Story = {
  args: {
    items: ['Paris', 'Lyon', 'Marseille'],
    separator: '|'
  },
  parameters: {
    docs: {
      description: {
        story: 'Using a pipe as separator for distinct visual separation.'
      }
    }
  }
};

export const ArrowSeparator: Story = {
  args: {
    items: ['Home', 'Products', 'Details'],
    separator: '→'
  },
  parameters: {
    docs: {
      description: {
        story: 'Using an arrow as separator, ideal for breadcrumb navigation.'
      }
    }
  }
};

export const SlashSeparator: Story = {
  args: {
    items: ['src', 'components', 'Button.tsx'],
    separator: '/'
  },
  parameters: {
    docs: {
      description: {
        story: 'Using a slash as separator, useful for file paths.'
      }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const Breadcrumb: Story = {
  args: {
    items: ['Accueil', 'Projets', 'Mon projet'],
    separator: '›',
    className: 'text-sm'
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb navigation pattern with chevron separator.'
      }
    }
  }
};

export const Metadata: Story = {
  args: {
    items: ['John Doe', '5 min read', 'Jan 15, 2025'],
    className: 'text-sm text-neutral'
  },
  parameters: {
    docs: {
      description: {
        story: 'Article metadata display with muted styling.'
      }
    }
  }
};

export const Tags: Story = {
  args: {
    items: ['React', 'TypeScript', 'Storybook'],
    separator: '·',
    className: 'text-xs font-medium'
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag list with middle dot separator.'
      }
    }
  }
};

// =============================================================================
// Styling
// =============================================================================

export const Muted: Story = {
  args: {
    items: ['Info 1', 'Info 2', 'Info 3'],
    className: 'text-sm text-neutral'
  },
  parameters: {
    docs: {
      description: {
        story: 'Muted styling for secondary information.'
      }
    }
  }
};

export const Small: Story = {
  args: {
    items: ['Small', 'Text', 'Items'],
    className: 'text-xs'
  },
  parameters: {
    docs: {
      description: {
        story: 'Small text variant for compact displays.'
      }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const RenderTest: Story = {
  args: {
    items: ['Item 1', 'Item 2', 'Item 3'],
    separator: '|'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Item 1')).toBeVisible();
    await expect(canvas.getByText('Item 2')).toBeVisible();
    await expect(canvas.getByText('Item 3')).toBeVisible();
    await expect(canvas.getAllByText('|')).toHaveLength(2);
  },
  parameters: {
    docs: {
      description: {
        story: 'Verifies that all items and separators are rendered correctly.'
      }
    }
  }
};

export const SingleItemRenderTest: Story = {
  args: {
    items: ['Only Item']
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Only Item')).toBeVisible();
    await expect(canvas.queryAllByText('•')).toHaveLength(0);
  },
  parameters: {
    docs: {
      description: {
        story: 'Verifies that a single item renders without any separator.'
      }
    }
  }
};
