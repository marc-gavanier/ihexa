import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Image from 'next/image';
import { RiCheckLine, RiCloseLine, RiHeartLine, RiShareLine } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardActions, CardBody, CardFigure, type CardProps, CardTitle } from './card';

const meta = {
  title: 'Libraries/UI/Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card component for grouping related content. Supports different sizes, border styles, layouts, and shadows. Includes subcomponents: CardBody, CardTitle, CardActions, and CardFigure.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    scale: {
      control: 'select',
      options: [undefined, 'card-xl', 'card-lg', 'card-md', 'card-sm', 'card-xs'],
      description: 'Size of the card padding and spacing',
      table: {
        category: 'Appearance',
        type: { summary: 'Scale' }
      }
    },
    kind: {
      control: 'select',
      options: [undefined, 'card-border', 'card-dash'],
      description: 'Visual border style',
      table: {
        category: 'Appearance',
        type: { summary: 'Kind' }
      }
    },
    layout: {
      control: 'select',
      options: [undefined, 'card-side'],
      description: 'Card layout direction',
      table: {
        category: 'Layout',
        type: { summary: 'Layout' }
      }
    },
    imageFull: {
      control: 'boolean',
      description: 'Overlay content on full-bleed image',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' }
      }
    },
    shadow: {
      control: 'select',
      options: [undefined, 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl'],
      description: 'Shadow depth',
      table: {
        category: 'Appearance',
        type: { summary: 'Shadow' }
      }
    },
    children: {
      description: 'Card content',
      table: { category: 'Content' }
    },
    className: {
      description: 'Additional CSS classes',
      table: { category: 'Styling' }
    }
  },
  args: {
    shadow: 'shadow-sm',
    children: (
      <CardBody>
        <CardTitle>Card Title</CardTitle>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts.</p>
        <CardActions>
          <Button color='btn-primary'>Buy Now</Button>
        </CardActions>
      </CardBody>
    )
  },
  decorators: [
    (Story) => (
      <div className='w-96'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

export const WithFigure: Story = {
  args: {
    children: (
      <>
        <CardFigure>
          <Image
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt='Shoes'
            width={384}
            height={384}
            unoptimized
          />
        </CardFigure>
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts.</p>
          <CardActions>
            <Button color='btn-primary'>Buy Now</Button>
          </CardActions>
        </CardBody>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with a featured image at the top.' }
    }
  }
};

// =============================================================================
// Scales
// =============================================================================

export const ExtraSmall: Story = {
  args: { scale: 'card-xs' },
  parameters: {
    docs: {
      description: { story: 'Extra small card for tight spaces.' }
    }
  }
};

export const Small: Story = {
  args: { scale: 'card-sm' },
  parameters: {
    docs: {
      description: { story: 'Small card with compact padding.' }
    }
  }
};

export const Medium: Story = {
  args: { scale: 'card-md' },
  parameters: {
    docs: {
      description: { story: 'Medium card size.' }
    }
  }
};

export const Large: Story = {
  args: { scale: 'card-lg' },
  parameters: {
    docs: {
      description: { story: 'Large card size.' }
    }
  }
};

export const ExtraLarge: Story = {
  args: { scale: 'card-xl' },
  parameters: {
    docs: {
      description: { story: 'Extra large card with more padding.' }
    }
  }
};

export const AllScales: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      {(['card-xs', 'card-sm', 'card-md', 'card-lg', 'card-xl'] as const).map((scale) => (
        <Card key={scale} scale={scale} shadow='shadow-sm'>
          <CardBody>
            <CardTitle>{scale}</CardTitle>
            <p>Card content</p>
          </CardBody>
        </Card>
      ))}
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

export const Border: Story = {
  args: { kind: 'card-border', shadow: undefined },
  parameters: {
    docs: {
      description: { story: 'Card with solid border.' }
    }
  }
};

export const Dash: Story = {
  args: { kind: 'card-dash', shadow: undefined },
  parameters: {
    docs: {
      description: { story: 'Card with dashed border.' }
    }
  }
};

export const AllKinds: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Card shadow='shadow-sm'>
        <CardBody>
          <CardTitle>Default (Shadow)</CardTitle>
          <p>No border style, with shadow</p>
        </CardBody>
      </Card>
      <Card kind='card-border'>
        <CardBody>
          <CardTitle>Border</CardTitle>
          <p>Solid border style</p>
        </CardBody>
      </Card>
      <Card kind='card-dash'>
        <CardBody>
          <CardTitle>Dash</CardTitle>
          <p>Dashed border style</p>
        </CardBody>
      </Card>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all border styles.' }
    }
  }
};

// =============================================================================
// Shadows
// =============================================================================

export const ShadowSmall: Story = {
  args: { shadow: 'shadow-sm' },
  parameters: {
    docs: {
      description: { story: 'Card with small shadow.' }
    }
  }
};

export const ShadowMedium: Story = {
  args: { shadow: 'shadow-md' },
  parameters: {
    docs: {
      description: { story: 'Card with medium shadow.' }
    }
  }
};

export const ShadowLarge: Story = {
  args: { shadow: 'shadow-lg' },
  parameters: {
    docs: {
      description: { story: 'Card with large shadow.' }
    }
  }
};

export const ShadowExtraLarge: Story = {
  args: { shadow: 'shadow-xl' },
  parameters: {
    docs: {
      description: { story: 'Card with extra large shadow.' }
    }
  }
};

export const AllShadows: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {(['shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl'] as const).map((shadow) => (
        <Card key={shadow} shadow={shadow}>
          <CardBody>
            <CardTitle>{shadow}</CardTitle>
            <p>Card content</p>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overview of all shadow depths.' }
    }
  }
};

// =============================================================================
// Layouts
// =============================================================================

export const HorizontalLayout: Story = {
  decorators: [
    (Story) => (
      <div className='w-[500px]'>
        <Story />
      </div>
    )
  ],
  args: {
    layout: 'card-side',
    children: (
      <>
        <CardFigure>
          <Image
            src='https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp'
            alt='Movie'
            width={200}
            height={200}
            unoptimized
          />
        </CardFigure>
        <CardBody>
          <CardTitle>New movie is released!</CardTitle>
          <p>Click the button to watch on Jetflix app.</p>
          <CardActions>
            <Button color='btn-primary'>Watch</Button>
          </CardActions>
        </CardBody>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Horizontal card layout with side image.' }
    }
  }
};

export const ImageFull: Story = {
  args: {
    imageFull: true,
    children: (
      <>
        <CardFigure>
          <Image
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt='Shoes'
            width={384}
            height={384}
            unoptimized
          />
        </CardFigure>
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts.</p>
          <CardActions>
            <Button color='btn-primary'>Buy Now</Button>
          </CardActions>
        </CardBody>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with content overlaid on full-bleed image.' }
    }
  }
};

export const FigureAtBottom: Story = {
  args: {
    children: (
      <>
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts.</p>
        </CardBody>
        <CardFigure>
          <Image
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt='Shoes'
            width={384}
            height={384}
            unoptimized
          />
        </CardFigure>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with image at the bottom.' }
    }
  }
};

export const CenteredFigure: Story = {
  args: {
    children: (
      <>
        <CardFigure className='px-10 pt-10'>
          <Image
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt='Shoes'
            width={304}
            height={304}
            className='rounded-xl'
            unoptimized
          />
        </CardFigure>
        <CardBody className='items-center text-center'>
          <CardTitle>Card Title</CardTitle>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts.</p>
          <CardActions justify='justify-center'>
            <Button color='btn-primary'>Buy Now</Button>
          </CardActions>
        </CardBody>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with centered figure and content.' }
    }
  }
};

// =============================================================================
// Content Variations
// =============================================================================

export const WithBadges: Story = {
  args: {
    children: (
      <>
        <CardFigure>
          <Image
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt='Shoes'
            width={384}
            height={384}
            unoptimized
          />
        </CardFigure>
        <CardBody>
          <CardTitle>
            Card Title
            <Badge color='badge-secondary'>NEW</Badge>
          </CardTitle>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts.</p>
          <CardActions>
            <Badge kind='badge-outline'>Fashion</Badge>
            <Badge kind='badge-outline'>Products</Badge>
          </CardActions>
        </CardBody>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with badges in title and actions.' }
    }
  }
};

export const WithCloseButton: Story = {
  args: {
    children: (
      <CardBody>
        <CardActions>
          <Button scale='btn-sm' modifier='btn-square'>
            <RiCloseLine />
          </Button>
        </CardActions>
        <p>We are using cookies for no reason.</p>
      </CardBody>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with close button.' }
    }
  }
};

export const NoFigure: Story = {
  args: {
    children: (
      <CardBody>
        <CardTitle>Card title!</CardTitle>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts.</p>
        <CardActions>
          <Button color='btn-primary'>Buy Now</Button>
        </CardActions>
      </CardBody>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card without figure, body only.' }
    }
  }
};

// =============================================================================
// Colored Cards
// =============================================================================

export const PrimaryCard: Story = {
  args: {
    className: 'bg-primary text-primary-content',
    shadow: undefined,
    children: (
      <CardBody>
        <CardTitle>Card title!</CardTitle>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts.</p>
        <CardActions>
          <Button>Buy Now</Button>
        </CardActions>
      </CardBody>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with primary background color.' }
    }
  }
};

export const NeutralCard: Story = {
  args: {
    className: 'bg-neutral text-neutral-content',
    shadow: undefined,
    children: (
      <CardBody className='items-center text-center'>
        <CardTitle>Cookies!</CardTitle>
        <p>We are using cookies for no reason.</p>
        <CardActions justify='justify-center'>
          <Button color='btn-primary'>Accept</Button>
          <Button kind='btn-ghost'>Deny</Button>
        </CardActions>
      </CardBody>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Card with neutral background color.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const PricingCard: Story = {
  args: {
    children: (
      <CardBody>
        <Badge scale='badge-xs' color='badge-warning'>
          Most Popular
        </Badge>
        <div className='flex justify-between'>
          <CardTitle className='text-3xl font-bold'>Premium</CardTitle>
          <span className='text-xl'>$29/mo</span>
        </div>
        <ul className='mt-6 flex flex-col gap-2 text-xs'>
          <li>
            <RiCheckLine className='me-2 inline-block size-4 text-success' />
            <span>High-resolution image generation</span>
          </li>
          <li>
            <RiCheckLine className='me-2 inline-block size-4 text-success' />
            <span>Customizable style templates</span>
          </li>
          <li>
            <RiCheckLine className='me-2 inline-block size-4 text-success' />
            <span>Batch processing capabilities</span>
          </li>
          <li>
            <RiCheckLine className='me-2 inline-block size-4 text-success' />
            <span>AI-driven image enhancements</span>
          </li>
          <li className='opacity-50'>
            <RiCheckLine className='me-2 inline-block size-4 text-base-content/50' />
            <span className='line-through'>Seamless cloud integration</span>
          </li>
          <li className='opacity-50'>
            <RiCheckLine className='me-2 inline-block size-4 text-base-content/50' />
            <span className='line-through'>Real-time collaboration tools</span>
          </li>
        </ul>
        <div className='mt-6'>
          <Button color='btn-primary' className='btn-block'>
            Subscribe
          </Button>
        </div>
      </CardBody>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Pricing card with feature list.' }
    }
  }
};

export const ProductCard: Story = {
  args: {
    children: (
      <>
        <CardFigure>
          <Image
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt='Shoes'
            width={384}
            height={384}
            unoptimized
          />
        </CardFigure>
        <CardBody>
          <CardTitle>Product Name</CardTitle>
          <p>A brief description of this amazing product.</p>
          <CardActions>
            <Button scale='btn-sm' kind='btn-ghost'>
              <RiHeartLine />
            </Button>
            <Button scale='btn-sm' kind='btn-ghost'>
              <RiShareLine />
            </Button>
            <Button scale='btn-sm' color='btn-primary'>
              Buy Now
            </Button>
          </CardActions>
        </CardBody>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'E-commerce product card with actions.' }
    }
  }
};

export const AlbumCard: Story = {
  decorators: [
    (Story) => (
      <div className='w-[500px]'>
        <Story />
      </div>
    )
  ],
  args: {
    layout: 'card-side',
    children: (
      <>
        <CardFigure>
          <Image
            src='https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp'
            alt='Album'
            width={200}
            height={200}
            unoptimized
          />
        </CardFigure>
        <CardBody>
          <CardTitle>New album is released!</CardTitle>
          <p>Click the button to listen on Spotiwhy app.</p>
          <CardActions>
            <Button color='btn-primary'>Listen</Button>
          </CardActions>
        </CardBody>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Album card with horizontal layout.' }
    }
  }
};

// =============================================================================
// Complete Matrix
// =============================================================================

const scales: Array<CardProps['scale']> = [undefined, 'card-xs', 'card-sm', 'card-md', 'card-lg', 'card-xl'];
const kinds: Array<CardProps['kind']> = [undefined, 'card-border', 'card-dash'];

export const Matrix: Story = {
  decorators: [
    (Story) => (
      <div className='w-full max-w-4xl'>
        <Story />
      </div>
    )
  ],
  render: () => (
    <div className='flex flex-col gap-8'>
      {kinds.map((kind) => (
        <div key={kind ?? 'default-kind'}>
          <h3 className='mb-4 font-semibold'>{kind ?? 'Default (shadow)'}</h3>
          <div className='grid grid-cols-3 gap-4'>
            {scales.map((scale) => (
              <Card key={`${kind}-${scale}`} scale={scale} kind={kind} shadow={kind ? undefined : 'shadow-sm'}>
                <CardBody>
                  <CardTitle className='text-sm'>{scale ?? 'Default'}</CardTitle>
                  <p className='text-xs'>Content</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete matrix of all scale × kind combinations.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    kind: 'card-border',
    shadow: undefined
  },
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardTitle>Accessible Card</CardTitle>
        <p>This card has proper semantic structure.</p>
      </CardBody>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole('heading', { level: 2 });

    await expect(title).toBeVisible();
    await expect(title).toHaveTextContent('Accessible Card');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies card has proper heading structure.' }
    }
  }
};
