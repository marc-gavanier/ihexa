import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { RiCheckLine, RiDraggable, RiEyeLine, RiEyeOffLine, RiImage2Line, RiMapPinLine } from 'react-icons/ri';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Checkbox } from './checkbox';
import { SortableItem, SortableList } from './sortable-list';

const meta: Meta<typeof SortableList> = {
  title: 'Libraries/UI/Primitives/SortableList',
  component: SortableList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Generic sortable list with drag & drop reordering using dnd-kit. Use SortableItem with render props pattern to access drag handle props and dragging state.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[300px]'>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Base
// =============================================================================

type SimpleItem = { id: string; label: string };

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState<SimpleItem[]>([
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
      { id: '4', label: 'Item 4' }
    ]);

    return (
      <SortableList items={items} onReorder={setItems}>
        {(item) => (
          <SortableItem key={item.id} id={item.id} className='flex items-center gap-2 rounded-md border border-base-300 p-2'>
            {({ dragHandleProps, isDragging }) => (
              <>
                <button
                  type='button'
                  {...dragHandleProps}
                  className='cursor-grab rounded p-1 hover:bg-base-200 active:cursor-grabbing'
                  aria-label='Drag to reorder'
                >
                  <RiDraggable className='text-neutral' size={16} />
                </button>
                <span className={`text-sm ${isDragging ? 'text-primary' : ''}`}>{item.label}</span>
              </>
            )}
          </SortableItem>
        )}
      </SortableList>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Basic sortable list with drag handle.' }
    }
  }
};

// =============================================================================
// Use Cases
// =============================================================================

type Task = { id: string; title: string; completed: boolean };

export const TaskList: Story = {
  render: () => {
    const [tasks, setTasks] = useState<Task[]>([
      { id: '1', title: 'Review pull request', completed: true },
      { id: '2', title: 'Write documentation', completed: false },
      { id: '3', title: 'Fix bug in login', completed: false },
      { id: '4', title: 'Deploy to staging', completed: false }
    ]);

    const toggleTask = (id: string) => {
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    return (
      <SortableList items={tasks} onReorder={setTasks}>
        {(task) => (
          <SortableItem key={task.id} id={task.id} className='flex items-center gap-2 rounded-md border border-base-300 p-2'>
            {({ dragHandleProps }) => (
              <>
                <button
                  type='button'
                  {...dragHandleProps}
                  className='cursor-grab rounded p-1 hover:bg-base-200 active:cursor-grabbing'
                  aria-label='Drag to reorder'
                >
                  <RiDraggable className='text-neutral' size={16} />
                </button>
                <label htmlFor={`task-${task.id}`} className='flex flex-1 cursor-pointer items-center gap-2'>
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    color='checkbox-primary'
                    scale='checkbox-sm'
                  />
                  <span className={`text-sm ${task.completed ? 'text-neutral line-through' : ''}`}>{task.title}</span>
                </label>
                {task.completed && <RiCheckLine className='text-success' size={16} />}
              </>
            )}
          </SortableItem>
        )}
      </SortableList>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Task list with checkboxes and completion state.' }
    }
  }
};

type Layer = { id: string; name: string; type: 'raster' | 'geojson'; visible: boolean };

export const LayerList: Story = {
  render: () => {
    const [layers, setLayers] = useState<Layer[]>([
      { id: '1', name: 'Water Depth', type: 'raster', visible: true },
      { id: '2', name: 'Flow Rate', type: 'raster', visible: true },
      { id: '3', name: 'Measurement Points', type: 'geojson', visible: false }
    ]);

    const toggleVisibility = (id: string) => {
      setLayers((prev) => prev.map((layer) => (layer.id === id ? { ...layer, visible: !layer.visible } : layer)));
    };

    const icons = {
      raster: <RiImage2Line className='shrink-0 text-neutral' size={16} />,
      geojson: <RiMapPinLine className='shrink-0 text-neutral' size={16} />
    };

    return (
      <SortableList items={layers} onReorder={setLayers}>
        {(layer) => (
          <SortableItem key={layer.id} id={layer.id} className='flex items-center gap-2 rounded-md border border-base-300 p-2'>
            {({ dragHandleProps }) => (
              <>
                <button
                  type='button'
                  {...dragHandleProps}
                  className='cursor-grab rounded p-1 hover:bg-base-200 active:cursor-grabbing'
                  aria-label='Drag to reorder'
                >
                  <RiDraggable className='text-neutral' size={16} />
                </button>
                {icons[layer.type]}
                <span className='flex-1 text-sm font-semibold'>{layer.name}</span>
                <button
                  type='button'
                  onClick={() => toggleVisibility(layer.id)}
                  className='rounded p-1 hover:bg-base-200'
                  aria-label={layer.visible ? 'Hide layer' : 'Show layer'}
                >
                  {layer.visible ? (
                    <RiEyeLine className='text-primary' size={16} />
                  ) : (
                    <RiEyeOffLine className='text-neutral' size={16} />
                  )}
                </button>
              </>
            )}
          </SortableItem>
        )}
      </SortableList>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Map layer list with visibility toggles and type icons.' }
    }
  }
};

type NumberedItem = { id: string; content: string };

export const NumberedList: Story = {
  render: () => {
    const [items, setItems] = useState<NumberedItem[]>([
      { id: 'a', content: 'First priority' },
      { id: 'b', content: 'Second priority' },
      { id: 'c', content: 'Third priority' },
      { id: 'd', content: 'Fourth priority' }
    ]);

    return (
      <SortableList items={items} onReorder={setItems}>
        {(item) => {
          const index = items.findIndex((i) => i.id === item.id);
          return (
            <SortableItem key={item.id} id={item.id} className='flex items-center gap-3 rounded-md border border-base-300 p-2'>
              {({ dragHandleProps, isDragging }) => (
                <>
                  <span
                    className={`min-w-6 text-center text-lg font-bold tabular-nums ${isDragging ? 'text-primary' : 'text-neutral'}`}
                  >
                    {index + 1}
                  </span>
                  <span className='flex-1 text-sm'>{item.content}</span>
                  <button
                    type='button'
                    {...dragHandleProps}
                    className='cursor-grab rounded p-1 hover:bg-base-200 active:cursor-grabbing'
                    aria-label='Drag to reorder'
                  >
                    <RiDraggable className='text-neutral' size={16} />
                  </button>
                </>
              )}
            </SortableItem>
          );
        }}
      </SortableList>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Numbered list where positions update dynamically after reordering.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const ReorderTest: Story = {
  render: (args) => {
    const [items, setItems] = useState<SimpleItem[]>([
      { id: '1', label: 'Item A' },
      { id: '2', label: 'Item B' },
      { id: '3', label: 'Item C' }
    ]);

    const handleReorder = (newItems: SimpleItem[]) => {
      setItems(newItems);
      args.onReorder?.(newItems);
    };

    return (
      <SortableList items={items} onReorder={handleReorder}>
        {(item) => (
          <SortableItem key={item.id} id={item.id} className='flex items-center gap-2 rounded-md border border-base-300 p-2'>
            {({ dragHandleProps }) => (
              <>
                <button
                  type='button'
                  {...dragHandleProps}
                  className='cursor-grab rounded p-1 hover:bg-base-200 active:cursor-grabbing'
                  aria-label='Drag to reorder'
                  data-testid={`drag-handle-${item.id}`}
                >
                  <RiDraggable className='text-neutral' size={16} />
                </button>
                <span className='text-sm' data-testid={`item-${item.id}`}>
                  {item.label}
                </span>
              </>
            )}
          </SortableItem>
        )}
      </SortableList>
    );
  },
  args: {
    onReorder: fn()
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const itemA = canvas.getByTestId('item-1');
    const itemB = canvas.getByTestId('item-2');
    const itemC = canvas.getByTestId('item-3');

    await expect(itemA).toBeVisible();
    await expect(itemB).toBeVisible();
    await expect(itemC).toBeVisible();

    const dragHandles = canvasElement.querySelectorAll('[aria-label="Drag to reorder"]');
    await expect(dragHandles).toHaveLength(3);

    await userEvent.keyboard('{Tab}');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies list renders correctly with drag handles.' }
    }
  }
};
