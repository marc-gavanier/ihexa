import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import toast, { Toaster as HotToaster } from 'react-hot-toast';
import { Button } from '../primitives/button';
import { Toaster } from './toaster';

const meta = {
  title: 'Libraries/UI/Blocks/Toaster',
  component: Toaster,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Toast notification container using react-hot-toast. Displays toast notifications as Alert components. Supports positioning and styling variants.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    directionX: {
      control: 'select',
      options: ['toast-start', 'toast-center', 'toast-end'],
      description: 'Horizontal position of toasts',
      table: {
        category: 'Position',
        type: { summary: 'PlacementX' }
      }
    },
    directionY: {
      control: 'select',
      options: ['toast-top', 'toast-middle', 'toast-bottom'],
      description: 'Vertical position of toasts',
      table: {
        category: 'Position',
        type: { summary: 'PlacementY' }
      }
    },
    kind: {
      control: 'select',
      options: ['alert-soft', 'alert-outline', 'alert-dash'],
      description: 'Alert style variant',
      table: {
        category: 'Appearance',
        type: { summary: 'Kind' }
      }
    }
  },
  decorators: [
    (Story) => (
      <>
        <HotToaster />
        <Story />
      </>
    )
  ]
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Interactive Demo
// =============================================================================

export const Interactive: Story = {
  render: (args) => (
    <div className='relative min-h-96 w-full bg-base-200 p-8'>
      <div className='flex flex-wrap gap-2'>
        <Button color='btn-success' onClick={() => toast.success('Operation successful!')}>
          Success Toast
        </Button>
        <Button color='btn-error' onClick={() => toast.error('Something went wrong!')}>
          Error Toast
        </Button>
        <Button color='btn-info' onClick={() => toast.loading('Loading...')}>
          Loading Toast
        </Button>
        <Button onClick={() => toast('Hello! This is a notification.')}>Default Toast</Button>
      </div>
      <Toaster {...args} />
    </div>
  ),
  args: {
    directionY: 'toast-top',
    directionX: 'toast-end'
  },
  parameters: {
    docs: {
      description: { story: 'Click buttons to trigger different toast types.' }
    }
  }
};

// =============================================================================
// Positions
// =============================================================================

export const TopEnd: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button onClick={() => toast.success('Top right toast!')}>Show Toast</Button>
      <Toaster directionY='toast-top' directionX='toast-end' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Toast positioned at top-right (default).' }
    }
  }
};

export const TopStart: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button onClick={() => toast.success('Top left toast!')}>Show Toast</Button>
      <Toaster directionY='toast-top' directionX='toast-start' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Toast positioned at top-left.' }
    }
  }
};

export const TopCenter: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button onClick={() => toast.success('Top center toast!')}>Show Toast</Button>
      <Toaster directionY='toast-top' directionX='toast-center' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Toast positioned at top-center.' }
    }
  }
};

export const BottomEnd: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button onClick={() => toast.success('Bottom right toast!')}>Show Toast</Button>
      <Toaster directionY='toast-bottom' directionX='toast-end' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Toast positioned at bottom-right.' }
    }
  }
};

export const BottomStart: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button onClick={() => toast.success('Bottom left toast!')}>Show Toast</Button>
      <Toaster directionY='toast-bottom' directionX='toast-start' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Toast positioned at bottom-left.' }
    }
  }
};

export const BottomCenter: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button onClick={() => toast.success('Bottom center toast!')}>Show Toast</Button>
      <Toaster directionY='toast-bottom' directionX='toast-center' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Toast positioned at bottom-center.' }
    }
  }
};

// =============================================================================
// Toast Types
// =============================================================================

export const SuccessToast: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button color='btn-success' onClick={() => toast.success('File saved successfully!')}>
        Trigger Success
      </Button>
      <Toaster directionY='toast-top' directionX='toast-end' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Success toast with green Alert styling.' }
    }
  }
};

export const ErrorToast: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button color='btn-error' onClick={() => toast.error('Failed to save file!')}>
        Trigger Error
      </Button>
      <Toaster directionY='toast-top' directionX='toast-end' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Error toast with red Alert styling.' }
    }
  }
};

export const LoadingToast: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button
        color='btn-info'
        onClick={() => {
          const id = toast.loading('Uploading file...');
          setTimeout(() => toast.success('Upload complete!', { id }), 2000);
        }}
      >
        Trigger Loading
      </Button>
      <Toaster directionY='toast-top' directionX='toast-end' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Loading toast that transitions to success.' }
    }
  }
};

// =============================================================================
// Styles (Kind)
// =============================================================================

export const SoftStyle: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <div className='flex gap-2'>
        <Button color='btn-success' onClick={() => toast.success('Soft success!')}>
          Success
        </Button>
        <Button color='btn-error' onClick={() => toast.error('Soft error!')}>
          Error
        </Button>
      </div>
      <Toaster directionY='toast-top' directionX='toast-end' kind='alert-soft' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Toasts with soft Alert styling.' }
    }
  }
};

export const OutlineStyle: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <div className='flex gap-2'>
        <Button color='btn-success' onClick={() => toast.success('Outline success!')}>
          Success
        </Button>
        <Button color='btn-error' onClick={() => toast.error('Outline error!')}>
          Error
        </Button>
      </div>
      <Toaster directionY='toast-top' directionX='toast-end' kind='alert-outline' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Toasts with outline Alert styling.' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const FormSubmission: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <div className='card card-border bg-base-100 w-80'>
        <div className='card-body'>
          <h2 className='card-title'>Contact Form</h2>
          <input type='text' placeholder='Your name' className='input input-bordered' />
          <input type='email' placeholder='Email' className='input input-bordered' />
          <Button
            color='btn-primary'
            onClick={() => {
              const id = toast.loading('Sending message...');
              setTimeout(() => toast.success('Message sent!', { id }), 1500);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
      <Toaster directionY='toast-top' directionX='toast-end' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Form submission with loading and success toasts.' }
    }
  }
};

export const MultipleToasts: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button
        onClick={() => {
          toast.success('First notification');
          setTimeout(() => toast.success('Second notification'), 500);
          setTimeout(() => toast.error('Third notification'), 1000);
        }}
      >
        Trigger Multiple
      </Button>
      <Toaster directionY='toast-top' directionX='toast-end' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Multiple stacked toasts.' }
    }
  }
};

export const LongMessage: Story = {
  render: () => (
    <div className='relative min-h-64 w-full bg-base-200 p-8'>
      <Button
        onClick={() =>
          toast.success(
            'This is a longer notification message that contains more text to demonstrate how the toast handles longer content.'
          )
        }
      >
        Show Long Toast
      </Button>
      <Toaster directionY='toast-top' directionX='toast-end' />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Toast with longer message content.' }
    }
  }
};
