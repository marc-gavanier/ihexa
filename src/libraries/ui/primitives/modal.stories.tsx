import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Image from 'next/image';
import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from './button';
import { Modal, ModalActions, ModalBackdrop, ModalBox, ModalCloseButton } from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Libraries/UI/Primitives/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal component using native HTML dialog element with controlled state. Supports different positions, sizes, backdrop closing, and close buttons. Includes subcomponents: ModalBox, ModalActions, ModalCloseButton, and ModalBackdrop.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
      table: {
        category: 'State',
        type: { summary: 'boolean' }
      }
    },
    onClose: {
      description: 'Callback when modal is closed (ESC, backdrop, or close button)',
      table: {
        category: 'Events',
        type: { summary: '() => void' }
      }
    },
    position: {
      control: 'select',
      options: [undefined, 'modal-top', 'modal-middle', 'modal-bottom'],
      description: 'Fixed position of the modal',
      table: {
        category: 'Layout',
        type: { summary: 'ModalPosition' }
      }
    },
    responsive: {
      control: 'boolean',
      description: 'Bottom on mobile, middle on desktop',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' }
      }
    },
    children: {
      description: 'Modal content',
      table: { category: 'Content' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox>
            <h3 className='text-lg font-bold'>Hello!</h3>
            <p className='py-4'>Press ESC key or click the button below to close</p>
            <ModalActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </ModalActions>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Basic modal with close button in actions.' }
    }
  }
};

// =============================================================================
// Close Variations
// =============================================================================

export const WithBackdropClose: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox>
            <h3 className='text-lg font-bold'>Hello!</h3>
            <p className='py-4'>Press ESC key or click outside to close</p>
          </ModalBox>
          <ModalBackdrop />
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Modal that closes when clicking the backdrop.' }
    }
  }
};

export const WithCloseButton: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox>
            <ModalCloseButton />
            <h3 className='text-lg font-bold'>Hello!</h3>
            <p className='py-4'>Press ESC key or click on ✕ button to close</p>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Modal with close button in the corner.' }
    }
  }
};

export const WithCustomCloseIcon: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox>
            <ModalCloseButton icon={<RiCloseLine size={20} />} />
            <h3 className='text-lg font-bold'>Hello!</h3>
            <p className='py-4'>Press ESC key or click the close icon</p>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Modal with custom close icon.' }
    }
  }
};

// =============================================================================
// Sizes
// =============================================================================

export const Small: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Small Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox size='max-w-sm'>
            <ModalCloseButton />
            <h3 className='text-lg font-bold'>Small Modal</h3>
            <p className='py-4'>This is a small modal.</p>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Small modal.' }
    }
  }
};

export const Large: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Large Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox size='max-w-5xl' fullWidth>
            <h3 className='text-lg font-bold'>Large Modal</h3>
            <p className='py-4'>This is a large modal that takes most of the screen width.</p>
            <ModalActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </ModalActions>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Large modal with full width.' }
    }
  }
};

// =============================================================================
// Positions
// =============================================================================

export const TopPosition: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Top Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} position='modal-top'>
          <ModalBox>
            <ModalCloseButton />
            <h3 className='text-lg font-bold'>Top Modal</h3>
            <p className='py-4'>This modal appears at the top of the screen.</p>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Modal positioned at the top.' }
    }
  }
};

export const BottomPosition: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Bottom Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} position='modal-bottom'>
          <ModalBox>
            <ModalCloseButton />
            <h3 className='text-lg font-bold'>Bottom Modal</h3>
            <p className='py-4'>This modal appears at the bottom of the screen.</p>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Modal positioned at the bottom.' }
    }
  }
};

export const Responsive: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Responsive Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} responsive>
          <ModalBox>
            <h3 className='text-lg font-bold'>Responsive Modal</h3>
            <p className='py-4'>This modal appears at the bottom on mobile and in the middle on desktop.</p>
            <ModalActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </ModalActions>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Modal with responsive positioning (bottom on mobile, middle on desktop).' }
    }
  }
};

// =============================================================================
// Real-world Use Cases
// =============================================================================

export const ConfirmDialog: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color='btn-error' onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox>
            <h3 className='text-lg font-bold'>Confirm Deletion</h3>
            <p className='py-4'>Are you sure you want to delete this item? This action cannot be undone.</p>
            <ModalActions>
              <Button kind='btn-ghost' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button color='btn-error' onClick={() => setOpen(false)}>
                Delete
              </Button>
            </ModalActions>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Confirmation dialog for destructive actions.' }
    }
  }
};

export const LoginForm: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Sign In</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox>
            <ModalCloseButton />
            <h3 className='text-lg font-bold'>Sign In</h3>
            <div className='py-4'>
              <div className='form-control'>
                <label className='label' htmlFor='login-email'>
                  <span className='label-text'>Email</span>
                </label>
                <input id='login-email' type='email' placeholder='email@example.com' className='input input-bordered' />
              </div>
              <div className='form-control mt-4'>
                <label className='label' htmlFor='login-password'>
                  <span className='label-text'>Password</span>
                </label>
                <input id='login-password' type='password' placeholder='••••••••' className='input input-bordered' />
              </div>
            </div>
            <ModalActions>
              <Button color='btn-primary' className='w-full'>
                Sign In
              </Button>
            </ModalActions>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Login form in a modal.' }
    }
  }
};

export const ImagePreview: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>View Image</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox size='max-w-4xl' fullWidth className='p-0'>
            <ModalCloseButton className='btn-circle bg-base-100' />
            <figure>
              <Image
                src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
                alt='Preview'
                width={896}
                height={896}
                className='w-full'
                unoptimized
              />
            </figure>
          </ModalBox>
          <ModalBackdrop />
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Image preview modal with backdrop close.' }
    }
  }
};

export const TermsAndConditions: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>View Terms</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox size='max-w-2xl'>
            <ModalCloseButton />
            <h3 className='text-lg font-bold'>Terms and Conditions</h3>
            <div className='max-h-64 overflow-y-auto py-4'>
              <p className='mb-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className='mb-4'>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className='mb-4'>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>
            <ModalActions>
              <Button kind='btn-ghost' onClick={() => setOpen(false)}>
                Decline
              </Button>
              <Button color='btn-primary' onClick={() => setOpen(false)}>
                Accept
              </Button>
            </ModalActions>
          </ModalBox>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Terms and conditions with scrollable content.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const OpenCloseTest: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button data-testid='open-button' onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalBox>
            <h3 className='text-lg font-bold'>Test Modal</h3>
            <p className='py-4'>This modal is used for testing.</p>
            <ModalActions>
              <Button data-testid='close-button' onClick={() => setOpen(false)}>
                Close
              </Button>
            </ModalActions>
          </ModalBox>
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open modal
    const openButton = canvas.getByTestId('open-button');
    await userEvent.click(openButton);

    // Check modal is visible
    const modalTitle = await canvas.findByText('Test Modal');
    await expect(modalTitle).toBeVisible();

    // Close modal
    const closeButton = canvas.getByTestId('close-button');
    await userEvent.click(closeButton);
  },
  parameters: {
    docs: {
      description: { story: 'Verifies modal open and close functionality.' }
    }
  }
};
