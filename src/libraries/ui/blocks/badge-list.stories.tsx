import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { BadgeList } from './badge-list';

const meta = {
  title: 'Libraries/UI/Blocks/BadgeList',
  component: BadgeList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays a list of items as badges. Useful for tags, categories, or any collection of labeled items that need visual distinction.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    values: {
      description: 'Array of items to display as badges',
      table: {
        category: 'Content',
        type: { summary: 'readonly T[]' }
      }
    },
    itemToKey: {
      description: 'Function to extract a unique key from each item',
      table: {
        category: 'Content',
        type: { summary: '(value: T) => string' }
      }
    },
    itemToString: {
      description: 'Function to convert each item to display text',
      table: {
        category: 'Content',
        type: { summary: '(value: T) => string' }
      }
    },
    color: {
      control: 'select',
      options: [
        undefined,
        'badge-neutral',
        'badge-primary',
        'badge-secondary',
        'badge-accent',
        'badge-info',
        'badge-success',
        'badge-warning',
        'badge-error'
      ],
      description: 'Badge color variant',
      table: {
        category: 'Appearance',
        type: { summary: 'BadgeColor' }
      }
    },
    kind: {
      control: 'select',
      options: [undefined, 'badge-outline', 'badge-dash', 'badge-soft', 'badge-ghost'],
      description: 'Badge style variant',
      table: {
        category: 'Appearance',
        type: { summary: 'BadgeKind' }
      }
    },
    scale: {
      control: 'select',
      options: [undefined, 'badge-xs', 'badge-sm', 'badge-md', 'badge-lg', 'badge-xl'],
      description: 'Badge size variant',
      table: {
        category: 'Appearance',
        type: { summary: 'BadgeScale' }
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the list container',
      table: {
        category: 'Styling',
        type: { summary: 'string' }
      }
    }
  },
  args: {
    values: ['Coastal Flooding', 'Urban Drainage', 'River Basin'],
    itemToKey: (tag: string) => tag,
    itemToString: (tag: string) => tag
  }
} satisfies Meta<typeof BadgeList<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default badge list with no specific styling.'
      }
    }
  }
};

export const SingleItem: Story = {
  args: {
    values: ['Single Tag']
  },
  parameters: {
    docs: {
      description: {
        story: 'A list with only one badge.'
      }
    }
  }
};

export const Empty: Story = {
  args: {
    values: []
  },
  parameters: {
    docs: {
      description: {
        story: 'An empty list renders nothing.'
      }
    }
  }
};

// =============================================================================
// Colors
// =============================================================================

export const Primary: Story = {
  args: {
    color: 'badge-primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary color badges for main categories.'
      }
    }
  }
};

export const Secondary: Story = {
  args: {
    color: 'badge-secondary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary color badges for alternative categories.'
      }
    }
  }
};

export const Success: Story = {
  args: {
    values: ['Validated', 'Approved', 'Complete'],
    color: 'badge-success'
  },
  parameters: {
    docs: {
      description: {
        story: 'Success color badges for positive status indicators.'
      }
    }
  }
};

export const Warning: Story = {
  args: {
    values: ['Pending', 'Review Required', 'Draft'],
    color: 'badge-warning'
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning color badges for attention-required items.'
      }
    }
  }
};

export const ErrorColor: Story = {
  args: {
    values: ['Rejected', 'Failed', 'Expired'],
    color: 'badge-error'
  },
  parameters: {
    docs: {
      description: {
        story: 'Error color badges for negative status indicators.'
      }
    }
  }
};

// =============================================================================
// Kinds
// =============================================================================

export const Ghost: Story = {
  args: {
    kind: 'badge-ghost'
  },
  parameters: {
    docs: {
      description: {
        story: 'Ghost style badges with subtle background.'
      }
    }
  }
};

export const Outline: Story = {
  args: {
    kind: 'badge-outline',
    color: 'badge-primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Outline style badges with border only.'
      }
    }
  }
};

export const Soft: Story = {
  args: {
    kind: 'badge-soft',
    color: 'badge-primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Soft style badges with muted background.'
      }
    }
  }
};

// =============================================================================
// Scales
// =============================================================================

export const ExtraSmall: Story = {
  args: {
    scale: 'badge-xs',
    kind: 'badge-ghost'
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra small badges for compact displays.'
      }
    }
  }
};

export const Small: Story = {
  args: {
    scale: 'badge-sm',
    kind: 'badge-ghost'
  },
  parameters: {
    docs: {
      description: {
        story: 'Small badges for secondary information.'
      }
    }
  }
};

export const Large: Story = {
  args: {
    scale: 'badge-lg',
    color: 'badge-primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Large badges for prominent display.'
      }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const ProjectTags: Story = {
  args: {
    values: ['Coastal Flooding', 'Urban Drainage', 'Climate Adaptation'],
    scale: 'badge-xs',
    kind: 'badge-ghost'
  },
  parameters: {
    docs: {
      description: {
        story: 'Project tags as displayed on project cards.'
      }
    }
  }
};

export const ProjectDetailTags: Story = {
  args: {
    values: ['River Basin', 'Flood Risk', 'Infrastructure'],
    kind: 'badge-ghost'
  },
  parameters: {
    docs: {
      description: {
        story: 'Project tags as displayed on project detail page.'
      }
    }
  }
};

export const Categories: Story = {
  args: {
    values: ['Technology', 'Design', 'Business'],
    color: 'badge-secondary',
    kind: 'badge-soft'
  },
  parameters: {
    docs: {
      description: {
        story: 'Category badges for content classification.'
      }
    }
  }
};

export const Skills: Story = {
  args: {
    values: ['React', 'TypeScript', 'Node.js'],
    color: 'badge-primary',
    kind: 'badge-outline',
    scale: 'badge-sm'
  },
  parameters: {
    docs: {
      description: {
        story: 'Skill badges for profile or job listing.'
      }
    }
  }
};

export const StatusList: Story = {
  args: {
    values: ['Active', 'Published', 'Featured'],
    color: 'badge-success',
    kind: 'badge-soft',
    scale: 'badge-xs'
  },
  parameters: {
    docs: {
      description: {
        story: 'Status badges indicating item states.'
      }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const RenderTest: Story = {
  args: {
    values: ['Tag 1', 'Tag 2', 'Tag 3'],
    kind: 'badge-ghost'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Tag 1')).toBeVisible();
    await expect(canvas.getByText('Tag 2')).toBeVisible();
    await expect(canvas.getByText('Tag 3')).toBeVisible();
  },
  parameters: {
    docs: {
      description: {
        story: 'Verifies that all badges are rendered correctly.'
      }
    }
  }
};

export const EmptyRenderTest: Story = {
  args: {
    values: []
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole('list')).toBeNull();
  },
  parameters: {
    docs: {
      description: {
        story: 'Verifies that an empty list renders nothing.'
      }
    }
  }
};
