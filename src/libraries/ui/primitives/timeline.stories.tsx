import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { expect, within } from 'storybook/test';
import { Timeline, TimelineConnector, TimelineEnd, TimelineItem, TimelineMiddle, TimelineStart } from './timeline';

const CheckIcon = ({ className }: { className?: string }) => <RiCheckboxCircleFill className={cn('size-5', className)} />;

const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(' ');

const meta = {
  title: 'Libraries/UI/Primitives/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Timeline component for displaying chronological events. Supports horizontal and vertical layouts, with customizable start/middle/end content. Includes subcomponents: TimelineItem, TimelineStart, TimelineMiddle, TimelineEnd, and TimelineConnector.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'Display timeline vertically',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' }
      }
    },
    compact: {
      control: 'boolean',
      description: 'Compact mode on mobile (max-md:timeline-compact)',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' }
      }
    },
    snapIcon: {
      control: 'boolean',
      description: 'Snap icon to edge (timeline-snap-icon)',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' }
      }
    }
  }
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineStart>1984</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>First Macintosh computer</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>1998</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iMac</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>2007</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iPhone</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>2015</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>Apple Watch</TimelineEnd>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Basic horizontal timeline with dates and events.' }
    }
  }
};

// =============================================================================
// Layouts
// =============================================================================

export const Vertical: Story = {
  render: () => (
    <Timeline vertical>
      <TimelineItem>
        <TimelineStart>1984</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>First Macintosh computer</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>1998</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iMac</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>2007</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iPhone</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>2015</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>Apple Watch</TimelineEnd>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Vertical timeline layout.' }
    }
  }
};

export const Responsive: Story = {
  render: () => (
    <Timeline vertical className='lg:timeline-horizontal'>
      <TimelineItem>
        <TimelineStart>1984</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>First Macintosh computer</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>1998</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iMac</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>2007</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iPhone</TimelineEnd>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Responsive timeline: vertical on mobile, horizontal on desktop.' }
    }
  }
};

// =============================================================================
// Content Positions
// =============================================================================

export const EndOnly: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>First Macintosh computer</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iMac</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iPhone</TimelineEnd>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Timeline with content only on the end side.' }
    }
  }
};

export const StartOnly: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineStart box>First Macintosh computer</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart box>iMac</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart box>iPhone</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Timeline with content only on the start side.' }
    }
  }
};

export const Alternating: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineStart box>First Macintosh computer</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iMac</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart box>iPod</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iPhone</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart box>Apple Watch</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Timeline with alternating content positions.' }
    }
  }
};

export const WithoutIcon: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineStart box>First Macintosh computer</TimelineStart>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineEnd box>iMac</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart box>iPod</TimelineStart>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineEnd box>iPhone</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart box>Apple Watch</TimelineStart>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Timeline without icons, using only connectors.' }
    }
  }
};

// =============================================================================
// Colors
// =============================================================================

export const WithColors: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineStart box>First Macintosh computer</TimelineStart>
        <TimelineMiddle>
          <CheckIcon className='text-primary' />
        </TimelineMiddle>
        <TimelineConnector className='bg-primary' />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector className='bg-primary' />
        <TimelineMiddle>
          <CheckIcon className='text-primary' />
        </TimelineMiddle>
        <TimelineEnd box>iMac</TimelineEnd>
        <TimelineConnector className='bg-primary' />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector className='bg-primary' />
        <TimelineStart box>iPod</TimelineStart>
        <TimelineMiddle>
          <CheckIcon className='text-primary' />
        </TimelineMiddle>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>iPhone</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart box>Apple Watch</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Timeline with colored connectors showing progress.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const OrderTracking: Story = {
  render: () => (
    <Timeline vertical>
      <TimelineItem>
        <TimelineMiddle>
          <CheckIcon className='text-success' />
        </TimelineMiddle>
        <TimelineEnd box>
          <div className='font-semibold'>Order Placed</div>
          <div className='text-xs opacity-60'>Jan 15, 2024 - 10:30 AM</div>
        </TimelineEnd>
        <TimelineConnector className='bg-success' />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector className='bg-success' />
        <TimelineMiddle>
          <CheckIcon className='text-success' />
        </TimelineMiddle>
        <TimelineEnd box>
          <div className='font-semibold'>Payment Confirmed</div>
          <div className='text-xs opacity-60'>Jan 15, 2024 - 10:32 AM</div>
        </TimelineEnd>
        <TimelineConnector className='bg-success' />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector className='bg-success' />
        <TimelineMiddle>
          <CheckIcon className='text-success' />
        </TimelineMiddle>
        <TimelineEnd box>
          <div className='font-semibold'>Shipped</div>
          <div className='text-xs opacity-60'>Jan 16, 2024 - 2:15 PM</div>
        </TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineMiddle>
          <CheckIcon className='opacity-30' />
        </TimelineMiddle>
        <TimelineEnd box className='opacity-50'>
          <div className='font-semibold'>Delivered</div>
          <div className='text-xs opacity-60'>Expected: Jan 18, 2024</div>
        </TimelineEnd>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Order tracking timeline with progress indication.' }
    }
  }
};

export const ProjectMilestones: Story = {
  render: () => (
    <Timeline vertical snapIcon compact>
      <TimelineItem>
        <TimelineMiddle>
          <CheckIcon className='text-primary' />
        </TimelineMiddle>
        <TimelineStart className='mb-10 md:text-end'>
          <time className='font-mono text-sm italic'>Phase 1</time>
          <div className='text-lg font-bold'>Research & Discovery</div>
          <p className='text-sm opacity-70'>User interviews, competitive analysis, and requirements gathering completed.</p>
        </TimelineStart>
        <TimelineConnector className='bg-primary' />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector className='bg-primary' />
        <TimelineMiddle>
          <CheckIcon className='text-primary' />
        </TimelineMiddle>
        <TimelineEnd className='mb-10'>
          <time className='font-mono text-sm italic'>Phase 2</time>
          <div className='text-lg font-bold'>Design</div>
          <p className='text-sm opacity-70'>Wireframes, prototypes, and design system created.</p>
        </TimelineEnd>
        <TimelineConnector className='bg-primary' />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector className='bg-primary' />
        <TimelineMiddle>
          <CheckIcon className='text-warning' />
        </TimelineMiddle>
        <TimelineStart className='mb-10 md:text-end'>
          <time className='font-mono text-sm italic'>Phase 3</time>
          <div className='text-lg font-bold'>Development</div>
          <p className='text-sm opacity-70'>Currently in progress. Core features being implemented.</p>
        </TimelineStart>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineMiddle>
          <CheckIcon className='opacity-30' />
        </TimelineMiddle>
        <TimelineEnd className='mb-10 opacity-50'>
          <time className='font-mono text-sm italic'>Phase 4</time>
          <div className='text-lg font-bold'>Testing & Launch</div>
          <p className='text-sm opacity-70'>QA testing, beta release, and public launch.</p>
        </TimelineEnd>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Project milestones with detailed descriptions.' }
    }
  }
};

export const VersionHistory: Story = {
  render: () => (
    <Timeline vertical>
      <TimelineItem>
        <TimelineStart>v3.0</TimelineStart>
        <TimelineMiddle>
          <CheckIcon className='text-success' />
        </TimelineMiddle>
        <TimelineEnd box>
          <div className='font-semibold'>Major Release</div>
          <ul className='mt-1 list-inside list-disc text-xs opacity-70'>
            <li>New dashboard design</li>
            <li>Performance improvements</li>
            <li>Dark mode support</li>
          </ul>
        </TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>v2.5</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>
          <div className='font-semibold'>Feature Update</div>
          <ul className='mt-1 list-inside list-disc text-xs opacity-70'>
            <li>Export to PDF</li>
            <li>Keyboard shortcuts</li>
          </ul>
        </TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>v2.0</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>
          <div className='font-semibold'>Major Release</div>
          <ul className='mt-1 list-inside list-disc text-xs opacity-70'>
            <li>Complete UI redesign</li>
            <li>API v2</li>
          </ul>
        </TimelineEnd>
      </TimelineItem>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: { story: 'Software version history timeline.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  render: () => (
    <Timeline aria-label='Product timeline'>
      <TimelineItem>
        <TimelineStart>2020</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>Event 1</TimelineEnd>
        <TimelineConnector />
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineStart>2021</TimelineStart>
        <TimelineMiddle>
          <CheckIcon />
        </TimelineMiddle>
        <TimelineEnd box>Event 2</TimelineEnd>
      </TimelineItem>
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const timeline = canvas.getByRole('list');
    await expect(timeline).toBeVisible();

    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(2);

    const event1 = canvas.getByText('Event 1');
    const event2 = canvas.getByText('Event 2');
    await expect(event1).toBeVisible();
    await expect(event2).toBeVisible();
  },
  parameters: {
    docs: {
      description: { story: 'Verifies timeline structure and accessibility.' }
    }
  }
};
