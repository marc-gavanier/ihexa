import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiHeartLine, RiPlayFill } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { Avatar } from './avatar';
import { Button } from './button';
import { List, ListColGrow, ListColWrap, ListHeader, ListRow } from './list';

const meta = {
  title: 'Libraries/UI/Primitives/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'List component for displaying rows of content. Supports headers, growing columns, and wrapped text. Includes subcomponents: ListRow, ListHeader, ListColGrow, and ListColWrap.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes',
      table: { category: 'Styling' }
    },
    children: {
      description: 'List content (ListRow, ListHeader)',
      table: { category: 'Content' }
    }
  },
  decorators: [
    (Story) => (
      <div className='w-[400px]'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  args: {
    className: 'shadow-md',
    children: (
      <>
        <ListHeader>Most played songs this week</ListHeader>
        <ListRow>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/1@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <div>
            <div>Dio Lupa</div>
            <div className='text-xs font-semibold uppercase opacity-60'>Remaining Reason</div>
          </div>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiPlayFill className='size-5' />
          </Button>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiHeartLine className='size-5' />
          </Button>
        </ListRow>
        <ListRow>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/4@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <div>
            <div>Ellie Beilish</div>
            <div className='text-xs font-semibold uppercase opacity-60'>Bears of a fever</div>
          </div>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiPlayFill className='size-5' />
          </Button>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiHeartLine className='size-5' />
          </Button>
        </ListRow>
        <ListRow>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/3@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <div>
            <div>Sabrino Gardener</div>
            <div className='text-xs font-semibold uppercase opacity-60'>Cappuccino</div>
          </div>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiPlayFill className='size-5' />
          </Button>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiHeartLine className='size-5' />
          </Button>
        </ListRow>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Basic list with header and rows.' }
    }
  }
};

// =============================================================================
// With Numbered Rows
// =============================================================================

export const WithNumbers: Story = {
  args: {
    className: 'shadow-md',
    children: (
      <>
        <ListHeader>Most played songs this week</ListHeader>
        <ListRow>
          <div className='text-4xl font-thin tabular-nums opacity-30'>01</div>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/1@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <ListColGrow>
            <div>Dio Lupa</div>
            <div className='text-xs font-semibold uppercase opacity-60'>Remaining Reason</div>
          </ListColGrow>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiPlayFill className='size-5' />
          </Button>
        </ListRow>
        <ListRow>
          <div className='text-4xl font-thin tabular-nums opacity-30'>02</div>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/4@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <ListColGrow>
            <div>Ellie Beilish</div>
            <div className='text-xs font-semibold uppercase opacity-60'>Bears of a fever</div>
          </ListColGrow>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiPlayFill className='size-5' />
          </Button>
        </ListRow>
        <ListRow>
          <div className='text-4xl font-thin tabular-nums opacity-30'>03</div>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/3@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <ListColGrow>
            <div>Sabrino Gardener</div>
            <div className='text-xs font-semibold uppercase opacity-60'>Cappuccino</div>
          </ListColGrow>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiPlayFill className='size-5' />
          </Button>
        </ListRow>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'List with numbered rows and growing column.' }
    }
  }
};

// =============================================================================
// With Wrapped Text
// =============================================================================

export const WithWrappedText: Story = {
  args: {
    className: 'shadow-md',
    children: (
      <>
        <ListHeader>Most played songs this week</ListHeader>
        <ListRow>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/1@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <div>
            <div>Dio Lupa</div>
            <div className='text-xs font-semibold uppercase opacity-60'>Remaining Reason</div>
          </div>
          <ListColWrap>
            "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance
            brought it widespread recognition.
          </ListColWrap>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiPlayFill className='size-5' />
          </Button>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiHeartLine className='size-5' />
          </Button>
        </ListRow>
        <ListRow>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/4@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <div>
            <div>Ellie Beilish</div>
            <div className='text-xs font-semibold uppercase opacity-60'>Bears of a fever</div>
          </div>
          <ListColWrap>
            "Bears of a Fever" captivated audiences with its intense energy and mysterious lyrics. Its popularity skyrocketed
            after fans shared it widely online.
          </ListColWrap>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiPlayFill className='size-5' />
          </Button>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiHeartLine className='size-5' />
          </Button>
        </ListRow>
        <ListRow>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/3@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <div>
            <div>Sabrino Gardener</div>
            <div className='text-xs font-semibold uppercase opacity-60'>Cappuccino</div>
          </div>
          <ListColWrap>
            "Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song's success propelled
            Sabrino into the spotlight.
          </ListColWrap>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiPlayFill className='size-5' />
          </Button>
          <Button modifier='btn-square' kind='btn-ghost'>
            <RiHeartLine className='size-5' />
          </Button>
        </ListRow>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'List with wrapped text descriptions.' }
    }
  }
};

// =============================================================================
// Simple List
// =============================================================================

export const Simple: Story = {
  args: {
    className: 'shadow-md',
    children: (
      <>
        <ListRow>
          <div>Item 1</div>
        </ListRow>
        <ListRow>
          <div>Item 2</div>
        </ListRow>
        <ListRow>
          <div>Item 3</div>
        </ListRow>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Simple list without header or avatars.' }
    }
  }
};

// =============================================================================
// Without Shadow
// =============================================================================

export const WithoutShadow: Story = {
  args: {
    children: (
      <>
        <ListHeader>Items</ListHeader>
        <ListRow>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/1@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <div>
            <div>First Item</div>
            <div className='text-xs opacity-60'>Description</div>
          </div>
        </ListRow>
        <ListRow>
          <div>
            <Avatar src='https://img.daisyui.com/images/profile/demo/4@94.webp' size='w-12' shape='rounded-xl' />
          </div>
          <div>
            <div>Second Item</div>
            <div className='text-xs opacity-60'>Description</div>
          </div>
        </ListRow>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'List without shadow.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const ContactList: Story = {
  args: {
    className: 'shadow-md',
    children: (
      <>
        <ListHeader>Contacts</ListHeader>
        <ListRow>
          <div>
            <Avatar placeholder='JD' size='w-12' shape='rounded-full' />
          </div>
          <ListColGrow>
            <div>John Doe</div>
            <div className='text-xs opacity-60'>john.doe@email.com</div>
          </ListColGrow>
        </ListRow>
        <ListRow>
          <div>
            <Avatar placeholder='JS' size='w-12' shape='rounded-full' />
          </div>
          <ListColGrow>
            <div>Jane Smith</div>
            <div className='text-xs opacity-60'>jane.smith@email.com</div>
          </ListColGrow>
        </ListRow>
        <ListRow>
          <div>
            <Avatar placeholder='RJ' size='w-12' shape='rounded-full' />
          </div>
          <ListColGrow>
            <div>Robert Johnson</div>
            <div className='text-xs opacity-60'>robert.j@email.com</div>
          </ListColGrow>
        </ListRow>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Contact list with placeholder avatars.' }
    }
  }
};

export const NotificationList: Story = {
  args: {
    className: 'shadow-md',
    children: (
      <>
        <ListHeader>Recent Notifications</ListHeader>
        <ListRow>
          <div className='flex size-10 items-center justify-center rounded-full bg-primary text-primary-content'>
            <RiHeartLine className='size-5' />
          </div>
          <ListColGrow>
            <div>New follower</div>
            <div className='text-xs opacity-60'>Jane started following you</div>
          </ListColGrow>
          <div className='text-xs opacity-60'>2m ago</div>
        </ListRow>
        <ListRow>
          <div className='flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-content'>
            <RiPlayFill className='size-5' />
          </div>
          <ListColGrow>
            <div>New release</div>
            <div className='text-xs opacity-60'>Your favorite artist released a new album</div>
          </ListColGrow>
          <div className='text-xs opacity-60'>1h ago</div>
        </ListRow>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'Notification list with icons and timestamps.' }
    }
  }
};

export const FileList: Story = {
  args: {
    className: 'shadow-md',
    children: (
      <>
        <ListHeader>Recent Files</ListHeader>
        <ListRow>
          <div className='flex size-10 items-center justify-center rounded bg-base-200 text-2xl'>📄</div>
          <ListColGrow>
            <div>Document.pdf</div>
            <div className='text-xs opacity-60'>2.4 MB</div>
          </ListColGrow>
          <div className='text-xs opacity-60'>Today</div>
        </ListRow>
        <ListRow>
          <div className='flex size-10 items-center justify-center rounded bg-base-200 text-2xl'>🖼️</div>
          <ListColGrow>
            <div>Photo.jpg</div>
            <div className='text-xs opacity-60'>1.2 MB</div>
          </ListColGrow>
          <div className='text-xs opacity-60'>Yesterday</div>
        </ListRow>
        <ListRow>
          <div className='flex size-10 items-center justify-center rounded bg-base-200 text-2xl'>📊</div>
          <ListColGrow>
            <div>Spreadsheet.xlsx</div>
            <div className='text-xs opacity-60'>856 KB</div>
          </ListColGrow>
          <div className='text-xs opacity-60'>3 days ago</div>
        </ListRow>
      </>
    )
  },
  parameters: {
    docs: {
      description: { story: 'File list with icons, sizes, and dates.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  args: {
    className: 'shadow-md',
    children: (
      <>
        <ListHeader>Test List</ListHeader>
        <ListRow>
          <div>Test Item 1</div>
        </ListRow>
        <ListRow>
          <div>Test Item 2</div>
        </ListRow>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const list = canvasElement.querySelector('ul');
    await expect(list).toBeVisible();

    const header = canvas.getByText('Test List');
    await expect(header).toBeVisible();

    const item1 = canvas.getByText('Test Item 1');
    const item2 = canvas.getByText('Test Item 2');
    await expect(item1).toBeVisible();
    await expect(item2).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies list structure and content.' }
    }
  }
};
