import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Loading, type LoadingProps } from './loading';

const meta = {
  title: 'Libraries/UI/Primitives/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Loading spinner component. Shows a loading animation when isLoading is true, otherwise renders children. Supports different animation styles and sizes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Whether to show the loading spinner',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
    style: {
      control: 'select',
      options: ['loading-ball', 'loading-bars', 'loading-infinity'],
      description: 'Animation style',
      table: {
        category: 'Appearance',
        type: { summary: 'Style' }
      }
    },
    scale: {
      control: 'select',
      options: ['loading-lg', 'loading-md', 'loading-sm', 'loading-xl', 'loading-xs'],
      description: 'Size of the loading spinner',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    children: {
      description: 'Content to display when not loading',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    }
  },
  args: {
    isLoading: true
  }
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

export const NotLoading: Story = {
  args: {
    isLoading: false,
    children: <span>Content loaded</span>
  },
  parameters: {
    docs: {
      description: { story: 'Shows children when not loading.' }
    }
  }
};

// =============================================================================
// Styles
// =============================================================================

export const Ball: Story = {
  args: { style: 'loading-ball' },
  parameters: {
    docs: {
      description: { story: 'Ball animation style.' }
    }
  }
};

export const Bars: Story = {
  args: { style: 'loading-bars' },
  parameters: {
    docs: {
      description: { story: 'Bars animation style.' }
    }
  }
};

export const InfinityStyle: Story = {
  args: { style: 'loading-infinity' },
  parameters: {
    docs: {
      description: { story: 'Infinity animation style.' }
    }
  }
};

export const AllStyles: Story = {
  render: () => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col items-center gap-2'>
        <Loading isLoading />
        <span className='text-xs text-base-content/70'>Default</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Loading isLoading style='loading-ball' />
        <span className='text-xs text-base-content/70'>Ball</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Loading isLoading style='loading-bars' />
        <span className='text-xs text-base-content/70'>Bars</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Loading isLoading style='loading-infinity' />
        <span className='text-xs text-base-content/70'>Infinity</span>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all animation styles.' }
    }
  }
};

// =============================================================================
// Scales
// =============================================================================

export const ExtraLarge: Story = {
  args: { scale: 'loading-xl' },
  parameters: {
    docs: {
      description: { story: 'Extra large loading spinner.' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'loading-lg' },
  parameters: {
    docs: {
      description: { story: 'Large loading spinner.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'loading-md' },
  parameters: {
    docs: {
      description: { story: 'Medium loading spinner.' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'loading-sm' },
  parameters: {
    docs: {
      description: { story: 'Small loading spinner.' }
    }
  }
};

export const ExtraSmall: Story = {
  args: { scale: 'loading-xs' },
  parameters: {
    docs: {
      description: { story: 'Extra small loading spinner.' }
    }
  }
};

export const AllScales: Story = {
  render: () => (
    <div className='flex items-end gap-6'>
      <div className='flex flex-col items-center gap-2'>
        <Loading isLoading scale='loading-xl' />
        <span className='text-xs text-base-content/70'>XL</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Loading isLoading scale='loading-lg' />
        <span className='text-xs text-base-content/70'>LG</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Loading isLoading scale='loading-md' />
        <span className='text-xs text-base-content/70'>MD</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Loading isLoading scale='loading-sm' />
        <span className='text-xs text-base-content/70'>SM</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Loading isLoading scale='loading-xs' />
        <span className='text-xs text-base-content/70'>XS</span>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all sizes.' }
    }
  }
};

// =============================================================================
// With Colors (via className)
// =============================================================================

export const WithColors: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Loading isLoading className='text-primary' />
      <Loading isLoading className='text-secondary' />
      <Loading isLoading className='text-accent' />
      <Loading isLoading className='text-success' />
      <Loading isLoading className='text-warning' />
      <Loading isLoading className='text-error' />
      <Loading isLoading className='text-info' />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Loading spinners with different colors via className.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const ContentLoading: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='card card-border w-64 bg-base-100'>
        <div className='card-body items-center'>
          <Loading isLoading>
            <p>Content here</p>
          </Loading>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Loading state in a card.' }
    }
  }
};

export const InlineLoading: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Loading isLoading scale='loading-sm' />
      <span>Loading data...</span>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Inline loading with text.' }
    }
  }
};

export const CenteredLoading: Story = {
  render: () => (
    <div className='flex h-32 w-64 items-center justify-center rounded-lg bg-base-200'>
      <Loading isLoading scale='loading-lg' className='text-primary' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Centered loading in a container.' }
    }
  }
};

export const LoadingOverlay: Story = {
  render: () => (
    <div className='relative h-32 w-64 rounded-lg bg-base-200 p-4'>
      <p>Background content</p>
      <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-base-100/80'>
        <Loading isLoading scale='loading-lg' className='text-primary' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Loading overlay on content.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const styles: Array<LoadingProps['style']> = [undefined, 'loading-ball', 'loading-bars', 'loading-infinity'];
const scales: Array<LoadingProps['scale']> = ['loading-lg', 'loading-md', 'loading-sm', 'loading-xs'];

export const Matrix: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {styles.map((style) => (
        <div key={style ?? 'default-style'}>
          <h3 className='mb-3 font-semibold'>{style?.replace('loading-', '') ?? 'Default (spinner)'}</h3>
          <div className='flex items-end gap-6'>
            {scales.map((scale) => (
              <div key={`${style}-${scale}`} className='flex flex-col items-center gap-2'>
                <Loading isLoading style={style} scale={scale} />
                <span className='text-xs text-base-content/70'>{scale?.replace('loading-', '')}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of style × scale combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const LoadingStateTest: Story = {
  args: { isLoading: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spinner = canvas.getByRole('generic', { hidden: true });

    await expect(spinner).toBeInTheDocument();
    await expect(spinner).toHaveClass('loading');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies loading spinner is visible.' }
    }
  }
};

export const NotLoadingStateTest: Story = {
  args: {
    isLoading: false,
    children: <span data-testid='content'>Loaded content</span>
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const content = canvas.getByTestId('content');

    await expect(content).toBeVisible();
    await expect(content).toHaveTextContent('Loaded content');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies children are shown when not loading.' }
    }
  }
};
