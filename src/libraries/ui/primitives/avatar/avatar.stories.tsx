import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Avatar, AvatarGroup } from './avatar';

const demoImages = {
  person1: 'https://img.daisyui.com/images/profile/demo/batperson@192.webp',
  person2: 'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp',
  person3: 'https://img.daisyui.com/images/profile/demo/averagebulk@192.webp',
  person4: 'https://img.daisyui.com/images/profile/demo/wonderperson@192.webp',
  person5: 'https://img.daisyui.com/images/profile/demo/superperson@192.webp'
};

const meta = {
  title: 'Libraries/UI/Primitives/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar component for displaying user profile images or initials. Supports various sizes, shapes, masks, status indicators, and rings.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    alt: {
      control: 'text',
      description: 'Image alt text',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: ['w-8', 'w-12', 'w-16', 'w-20', 'w-24', 'w-32'],
      description: 'Size of the avatar',
      table: {
        category: 'Appearance',
        type: { summary: 'AvatarSize' },
        defaultValue: { summary: 'w-24' }
      }
    },
    shape: {
      control: 'select',
      options: ['rounded', 'rounded-xl', 'rounded-full'],
      description: 'Shape of the avatar',
      table: {
        category: 'Appearance',
        type: { summary: 'AvatarShape' },
        defaultValue: { summary: 'rounded-full' }
      }
    },
    mask: {
      control: 'select',
      options: ['mask-heart', 'mask-squircle', 'mask-hexagon-2'],
      description: 'Mask shape (overrides shape)',
      table: {
        category: 'Appearance',
        type: { summary: 'AvatarMask' }
      }
    },
    status: {
      control: 'select',
      options: ['avatar-online', 'avatar-offline'],
      description: 'Online/offline status indicator',
      table: {
        category: 'State',
        type: { summary: 'AvatarStatus' }
      }
    },
    ring: {
      control: 'select',
      options: ['ring-primary', 'ring-secondary', 'ring-accent', 'ring-neutral'],
      description: 'Ring color around avatar',
      table: {
        category: 'Appearance',
        type: { summary: 'AvatarRing' }
      }
    },
    placeholder: {
      description: 'Placeholder content (initials) when no image',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' }
      }
    }
  },
  args: {
    src: demoImages.person1,
    alt: 'User avatar'
  }
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {};

// =============================================================================
// Sizes
// =============================================================================

export const SizeW8: Story = {
  args: { size: 'w-8' },
  parameters: {
    docs: { description: { story: 'Extra small avatar (32px).' } }
  }
};

export const SizeW12: Story = {
  args: { size: 'w-12' },
  parameters: {
    docs: { description: { story: 'Small avatar (48px).' } }
  }
};

export const SizeW16: Story = {
  args: { size: 'w-16' },
  parameters: {
    docs: { description: { story: 'Medium-small avatar (64px).' } }
  }
};

export const SizeW20: Story = {
  args: { size: 'w-20' },
  parameters: {
    docs: { description: { story: 'Medium avatar (80px).' } }
  }
};

export const SizeW24: Story = {
  args: { size: 'w-24' },
  parameters: {
    docs: { description: { story: 'Large avatar (96px, default).' } }
  }
};

export const SizeW32: Story = {
  args: { size: 'w-32' },
  parameters: {
    docs: { description: { story: 'Extra large avatar (128px).' } }
  }
};

export const AllSizes: Story = {
  render: () => (
    <div className='flex items-end gap-4'>
      <Avatar src={demoImages.person5} size='w-32' />
      <Avatar src={demoImages.person5} size='w-24' />
      <Avatar src={demoImages.person5} size='w-20' />
      <Avatar src={demoImages.person5} size='w-16' />
      <Avatar src={demoImages.person5} size='w-12' />
      <Avatar src={demoImages.person5} size='w-8' />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'All available sizes.' } }
  }
};

// =============================================================================
// Shapes
// =============================================================================

export const Rounded: Story = {
  args: { shape: 'rounded' },
  parameters: {
    docs: { description: { story: 'Slightly rounded corners.' } }
  }
};

export const RoundedXL: Story = {
  args: { shape: 'rounded-xl' },
  parameters: {
    docs: { description: { story: 'More rounded corners.' } }
  }
};

export const RoundedFull: Story = {
  args: { shape: 'rounded-full' },
  parameters: {
    docs: { description: { story: 'Circular avatar (default).' } }
  }
};

export const AllShapes: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Avatar src={demoImages.person1} shape='rounded' />
      <Avatar src={demoImages.person1} shape='rounded-xl' />
      <Avatar src={demoImages.person1} shape='rounded-full' />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'All available shapes.' } }
  }
};

// =============================================================================
// Masks
// =============================================================================

export const MaskHeart: Story = {
  args: { mask: 'mask-heart' },
  parameters: {
    docs: { description: { story: 'Heart-shaped mask.' } }
  }
};

export const MaskSquircle: Story = {
  args: { mask: 'mask-squircle' },
  parameters: {
    docs: { description: { story: 'Squircle mask.' } }
  }
};

export const MaskHexagon: Story = {
  args: { mask: 'mask-hexagon-2' },
  parameters: {
    docs: { description: { story: 'Hexagon mask.' } }
  }
};

export const AllMasks: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Avatar src={demoImages.person2} mask='mask-heart' />
      <Avatar src={demoImages.person3} mask='mask-squircle' />
      <Avatar src={demoImages.person4} mask='mask-hexagon-2' />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'All available masks.' } }
  }
};

// =============================================================================
// Status Indicators
// =============================================================================

export const Online: Story = {
  args: { status: 'avatar-online' },
  parameters: {
    docs: { description: { story: 'Online status indicator.' } }
  }
};

export const Offline: Story = {
  args: { status: 'avatar-offline' },
  parameters: {
    docs: { description: { story: 'Offline status indicator.' } }
  }
};

export const AllStatuses: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Avatar src={demoImages.person1} status='avatar-online' />
      <Avatar src={demoImages.person2} status='avatar-offline' />
      <Avatar src={demoImages.person3} />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Online, offline, and no status.' } }
  }
};

// =============================================================================
// Ring
// =============================================================================

export const RingPrimary: Story = {
  args: { ring: 'ring-primary' },
  parameters: {
    docs: { description: { story: 'Primary color ring.' } }
  }
};

export const RingSecondary: Story = {
  args: { ring: 'ring-secondary' },
  parameters: {
    docs: { description: { story: 'Secondary color ring.' } }
  }
};

export const AllRings: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Avatar src={demoImages.person1} ring='ring-primary' />
      <Avatar src={demoImages.person2} ring='ring-secondary' />
      <Avatar src={demoImages.person3} ring='ring-accent' />
      <Avatar src={demoImages.person4} ring='ring-neutral' />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'All ring colors.' } }
  }
};

// =============================================================================
// Placeholder (Initials)
// =============================================================================

export const PlaceholderLarge: Story = {
  args: {
    src: undefined,
    placeholder: <span className='text-3xl'>D</span>,
    size: 'w-24'
  },
  parameters: {
    docs: { description: { story: 'Large placeholder with single initial.' } }
  }
};

export const PlaceholderMedium: Story = {
  args: {
    src: undefined,
    placeholder: <span className='text-xl'>AI</span>,
    size: 'w-16'
  },
  parameters: {
    docs: { description: { story: 'Medium placeholder with two initials.' } }
  }
};

export const PlaceholderSmall: Story = {
  args: {
    src: undefined,
    placeholder: <span>SY</span>,
    size: 'w-12'
  },
  parameters: {
    docs: { description: { story: 'Small placeholder with initials.' } }
  }
};

export const PlaceholderExtraSmall: Story = {
  args: {
    src: undefined,
    placeholder: <span className='text-xs'>UI</span>,
    size: 'w-8'
  },
  parameters: {
    docs: { description: { story: 'Extra small placeholder.' } }
  }
};

export const PlaceholderWithStatus: Story = {
  args: {
    src: undefined,
    placeholder: <span className='text-xl'>AI</span>,
    size: 'w-16',
    status: 'avatar-online'
  },
  parameters: {
    docs: { description: { story: 'Placeholder with online status.' } }
  }
};

export const AllPlaceholders: Story = {
  render: () => (
    <div className='flex items-end gap-4'>
      <Avatar placeholder={<span className='text-3xl'>D</span>} size='w-24' />
      <Avatar placeholder={<span className='text-xl'>AI</span>} size='w-16' status='avatar-online' />
      <Avatar placeholder={<span>SY</span>} size='w-12' />
      <Avatar placeholder={<span className='text-xs'>UI</span>} size='w-8' />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Placeholder avatars with different sizes.' } }
  }
};

// =============================================================================
// Avatar Group
// =============================================================================

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar src={demoImages.person1} size='w-12' />
      <Avatar src={demoImages.person2} size='w-12' />
      <Avatar src={demoImages.person3} size='w-12' />
      <Avatar src={demoImages.person4} size='w-12' />
    </AvatarGroup>
  ),
  parameters: {
    docs: { description: { story: 'Group of overlapping avatars.' } }
  }
};

export const GroupWithCounter: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar src={demoImages.person1} size='w-12' />
      <Avatar src={demoImages.person2} size='w-12' />
      <Avatar src={demoImages.person3} size='w-12' />
      <Avatar placeholder={<span>+99</span>} size='w-12' />
    </AvatarGroup>
  ),
  parameters: {
    docs: { description: { story: 'Group with counter for additional members.' } }
  }
};

export const GroupSpacings: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <AvatarGroup spacing='-space-x-4'>
        <Avatar src={demoImages.person1} size='w-12' />
        <Avatar src={demoImages.person2} size='w-12' />
        <Avatar src={demoImages.person3} size='w-12' />
      </AvatarGroup>
      <AvatarGroup spacing='-space-x-6'>
        <Avatar src={demoImages.person1} size='w-12' />
        <Avatar src={demoImages.person2} size='w-12' />
        <Avatar src={demoImages.person3} size='w-12' />
      </AvatarGroup>
      <AvatarGroup spacing='-space-x-8'>
        <Avatar src={demoImages.person1} size='w-12' />
        <Avatar src={demoImages.person2} size='w-12' />
        <Avatar src={demoImages.person3} size='w-12' />
      </AvatarGroup>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Different overlap spacings.' } }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const UserProfile: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar src={demoImages.person1} size='w-16' status='avatar-online' />
      <div>
        <p className='font-semibold'>John Doe</p>
        <p className='text-sm text-base-content/70'>Online</p>
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'User profile with avatar and info.' } }
  }
};

export const CommentAuthor: Story = {
  render: () => (
    <div className='flex gap-3'>
      <Avatar src={demoImages.person2} size='w-12' />
      <div className='flex-1'>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Jane Smith</span>
          <span className='text-xs text-base-content/50'>2 hours ago</span>
        </div>
        <p className='text-sm'>This is a great article! Thanks for sharing.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Comment with author avatar.' } }
  }
};

export const TeamMembers: Story = {
  render: () => (
    <div className='space-y-2'>
      <p className='text-sm font-medium'>Team Members</p>
      <AvatarGroup>
        <Avatar src={demoImages.person1} size='w-12' />
        <Avatar src={demoImages.person2} size='w-12' />
        <Avatar src={demoImages.person3} size='w-12' />
        <Avatar src={demoImages.person4} size='w-12' />
        <Avatar placeholder={<span className='text-xs'>+5</span>} size='w-12' />
      </AvatarGroup>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Team members list with counter.' } }
  }
};

export const ChatHeader: Story = {
  render: () => (
    <div className='flex items-center justify-between rounded-lg bg-base-200 p-4'>
      <div className='flex items-center gap-3'>
        <Avatar src={demoImages.person5} size='w-12' status='avatar-online' ring='ring-primary' />
        <div>
          <p className='font-semibold'>Support Team</p>
          <p className='text-xs text-success'>Online</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Chat header with online avatar.' } }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    src: demoImages.person1,
    alt: 'Test user avatar'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole('img');

    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('alt', 'Test user avatar');
  },
  parameters: {
    docs: { description: { story: 'Verifies image has alt text.' } }
  }
};

export const PlaceholderTest: Story = {
  args: {
    src: undefined,
    placeholder: <span data-testid='initials'>JD</span>
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const initials = canvas.getByTestId('initials');

    await expect(initials).toBeVisible();
    await expect(initials).toHaveTextContent('JD');
  },
  parameters: {
    docs: { description: { story: 'Verifies placeholder renders correctly.' } }
  }
};
