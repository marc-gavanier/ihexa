import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { expect, userEvent, within } from 'storybook/test';
import { ComboBox } from './combobox';
import { Input } from './input';
import { Loading } from './loading';
import { Options } from './options';
import { SelectedItems } from './selected-items';

type SimpleItem = { id: string; label: string };

const fruits: SimpleItem[] = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'Cherry' },
  { id: '4', label: 'Date' },
  { id: '5', label: 'Elderberry' },
  { id: '6', label: 'Fig' },
  { id: '7', label: 'Grape' },
  { id: '8', label: 'Honeydew' }
];

const loadFruitSuggestions = async (inputValue: string) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const filtered = fruits.filter((fruit) => fruit.label.toLowerCase().includes(inputValue.toLowerCase()));
  return { items: filtered };
};

const itemToKey = (item: SimpleItem) => item.id;
const itemToString = (item: SimpleItem | null) => item?.label ?? '';

const meta: Meta = {
  title: 'Libraries/UI/Primitives/ComboBox',
  component: ComboBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Headless combobox component built on Downshift. Provides autocomplete functionality with async loading support via render props pattern. Use with Options and SelectedItems components for complete UI.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-80 min-h-60'>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj;

// =============================================================================
// Base
// =============================================================================

export const Default: Story = {
  render: () => (
    <ComboBox<SimpleItem, object> itemToString={itemToString} loadSuggestions={loadFruitSuggestions}>
      {({ getInputProps, getMenuProps, getItemProps, isOpen, items, selectedItem, highlightedItem }) => (
        <div className='relative'>
          <Input {...getInputProps()} placeholder='Search fruits...' />
          <Options
            items={items}
            isOpen={isOpen}
            selectedItem={selectedItem}
            highlightedItem={highlightedItem}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            itemToKey={itemToKey}
            renderItem={({ item }) => <span>{item.label}</span>}
          />
        </div>
      )}
    </ComboBox>
  ),
  parameters: {
    docs: {
      description: { story: 'Basic combobox using Options component.' }
    }
  }
};

// =============================================================================
// With Default Items
// =============================================================================

export const WithDefaultItems: Story = {
  render: () => (
    <ComboBox<SimpleItem, object>
      defaultItems={fruits.slice(0, 4)}
      itemToString={itemToString}
      loadSuggestions={loadFruitSuggestions}
    >
      {({ getInputProps, getMenuProps, getItemProps, isOpen, items, selectedItem, highlightedItem }) => (
        <div className='relative'>
          <Input {...getInputProps()} placeholder='Search fruits...' />
          <Options
            items={items}
            isOpen={isOpen}
            selectedItem={selectedItem}
            highlightedItem={highlightedItem}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            itemToKey={itemToKey}
            renderItem={({ item }) => <span>{item.label}</span>}
          />
        </div>
      )}
    </ComboBox>
  ),
  parameters: {
    docs: {
      description: { story: 'Combobox with pre-populated default items shown on focus.' }
    }
  }
};

// =============================================================================
// With Search Icon
// =============================================================================

export const WithSearchIcon: Story = {
  render: () => (
    <ComboBox<SimpleItem, object> itemToString={itemToString} loadSuggestions={loadFruitSuggestions}>
      {({ getInputProps, getMenuProps, getItemProps, isOpen, items, selectedItem, highlightedItem }) => (
        <div className='relative'>
          <Input {...getInputProps()} left={<RiSearchLine className='text-base-content/50' />} placeholder='Search fruits...' />
          <Options
            items={items}
            isOpen={isOpen}
            selectedItem={selectedItem}
            highlightedItem={highlightedItem}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            itemToKey={itemToKey}
            renderItem={({ item }) => <span>{item.label}</span>}
          />
        </div>
      )}
    </ComboBox>
  ),
  parameters: {
    docs: {
      description: { story: 'Combobox with search icon using Input component.' }
    }
  }
};

// =============================================================================
// With Loading State
// =============================================================================

type LoadingPayload = { isLoading: boolean };

export const WithLoadingState: Story = {
  render: () => {
    const slowLoadSuggestions = async (inputValue: string): Promise<{ items: SimpleItem[] } & LoadingPayload> => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const filtered = fruits.filter((fruit) => fruit.label.toLowerCase().includes(inputValue.toLowerCase()));
      return { items: filtered, isLoading: false };
    };

    const beforeLoad = (): LoadingPayload => ({ isLoading: true });

    return (
      <ComboBox<SimpleItem, LoadingPayload>
        itemToString={itemToString}
        beforeLoadSuggestions={beforeLoad}
        loadSuggestions={slowLoadSuggestions}
      >
        {({ getInputProps, getMenuProps, getItemProps, isOpen, items, selectedItem, highlightedItem, payload }) => (
          <div className='relative'>
            <Input
              {...getInputProps()}
              placeholder='Search (slow)...'
              right={<Loading isLoading={payload.isLoading} scale='loading-sm' />}
            />
            <Options
              items={items}
              isOpen={isOpen}
              selectedItem={selectedItem}
              highlightedItem={highlightedItem}
              getMenuProps={getMenuProps}
              getItemProps={getItemProps}
              itemToKey={itemToKey}
              renderItem={({ item }) => <span>{item.label}</span>}
            />
          </div>
        )}
      </ComboBox>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Shows loading spinner during async search using beforeLoadSuggestions for loading state.' }
    }
  }
};

// =============================================================================
// With No Results
// =============================================================================

export const WithNoResults: Story = {
  render: () => (
    <ComboBox<SimpleItem, object> itemToString={itemToString} loadSuggestions={loadFruitSuggestions}>
      {({ getInputProps, getMenuProps, getItemProps, isOpen, items, selectedItem, highlightedItem, inputValue }) => (
        <div className='relative'>
          <Input {...getInputProps()} placeholder='Try "xyz"...' />
          <Options
            items={items}
            isOpen={isOpen && !!inputValue}
            showEmpty
            selectedItem={selectedItem}
            highlightedItem={highlightedItem}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            itemToKey={itemToKey}
            renderItem={({ item }) => <span>{item.label}</span>}
          >
            <div className='p-4 text-center text-base-content/50'>No results found</div>
          </Options>
        </div>
      )}
    </ComboBox>
  ),
  parameters: {
    docs: {
      description: { story: 'Shows empty state when no results match.' }
    }
  }
};

// =============================================================================
// With Label
// =============================================================================

export const WithLabel: Story = {
  render: () => (
    <ComboBox<SimpleItem, object> itemToString={itemToString} loadSuggestions={loadFruitSuggestions}>
      {({ getLabelProps, getInputProps, getMenuProps, getItemProps, isOpen, items, selectedItem, highlightedItem }) => (
        <div className='form-control'>
          <label {...getLabelProps()} htmlFor='fruit-select' className='label'>
            <span className='label-text'>Select a fruit</span>
          </label>
          <div className='relative'>
            <Input {...getInputProps()} id='fruit-select' placeholder='Search...' />
            <Options
              items={items}
              isOpen={isOpen}
              selectedItem={selectedItem}
              highlightedItem={highlightedItem}
              getMenuProps={getMenuProps}
              getItemProps={getItemProps}
              itemToKey={itemToKey}
              renderItem={({ item }) => <span>{item.label}</span>}
            />
          </div>
        </div>
      )}
    </ComboBox>
  ),
  parameters: {
    docs: {
      description: { story: 'Combobox with accessible label.' }
    }
  }
};

// =============================================================================
// Multi-Select with SelectedItems
// =============================================================================

const MultiSelectContent = ({
  selected,
  setSelected,
  getInputProps,
  getMenuProps,
  getItemProps,
  isOpen,
  items,
  selectedItem,
  highlightedItem
}: {
  selected: SimpleItem[];
  setSelected: Dispatch<SetStateAction<SimpleItem[]>>;
  getInputProps: () => object;
  getMenuProps: () => object;
  getItemProps: ({ item, index }: { item: SimpleItem; index: number }) => object;
  isOpen: boolean;
  items: SimpleItem[];
  selectedItem: SimpleItem | null;
  highlightedItem: SimpleItem | null;
}) => {
  const prevSelectedRef = useRef<SimpleItem | null>(null);

  useEffect(() => {
    if (selectedItem && selectedItem !== prevSelectedRef.current) {
      if (!selected.some((s) => s.id === selectedItem.id)) {
        setSelected((prev) => [...prev, selectedItem]);
      }
    }
    prevSelectedRef.current = selectedItem;
  }, [selectedItem, selected, setSelected]);

  const handleRemove = (item: SimpleItem) => () => {
    setSelected(selected.filter((s) => s.id !== item.id));
  };

  return (
    <div className='space-y-2'>
      <div className='relative'>
        <Input {...getInputProps()} placeholder='Add fruits...' />
        <Options
          items={items.filter((item) => !selected.some((s) => s.id === item.id))}
          isOpen={isOpen}
          selectedItem={selectedItem}
          highlightedItem={highlightedItem}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          itemToKey={itemToKey}
          renderItem={({ item }) => <span>{item.label}</span>}
        />
      </div>
      <SelectedItems
        values={selected}
        itemToKey={itemToKey}
        itemToString={itemToString}
        onClick={handleRemove}
        className='flex flex-wrap gap-1'
      />
    </div>
  );
};

const MultiSelectExample = () => {
  const [selected, setSelected] = useState<SimpleItem[]>([]);

  return (
    <ComboBox<SimpleItem, object> clearOnSelect itemToString={itemToString} loadSuggestions={loadFruitSuggestions}>
      {({ getInputProps, getMenuProps, getItemProps, isOpen, items, selectedItem, highlightedItem }) => (
        <MultiSelectContent
          selected={selected}
          setSelected={setSelected}
          getInputProps={getInputProps}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          isOpen={isOpen}
          items={items}
          selectedItem={selectedItem}
          highlightedItem={highlightedItem}
        />
      )}
    </ComboBox>
  );
};

export const MultiSelect: Story = {
  render: () => <MultiSelectExample />,
  parameters: {
    docs: {
      description: { story: 'Multi-select combobox with SelectedItems showing removable tags.' }
    }
  }
};

// =============================================================================
// Multi-Select with Read-Only Tags
// =============================================================================

const MultiSelectReadOnlyContent = ({
  selected,
  setSelected,
  getInputProps,
  getMenuProps,
  getItemProps,
  isOpen,
  items,
  selectedItem,
  highlightedItem
}: {
  selected: SimpleItem[];
  setSelected: Dispatch<SetStateAction<SimpleItem[]>>;
  getInputProps: () => object;
  getMenuProps: () => object;
  getItemProps: ({ item, index }: { item: SimpleItem; index: number }) => object;
  isOpen: boolean;
  items: SimpleItem[];
  selectedItem: SimpleItem | null;
  highlightedItem: SimpleItem | null;
}) => {
  const prevSelectedRef = useRef<SimpleItem | null>(null);

  useEffect(() => {
    if (selectedItem && selectedItem !== prevSelectedRef.current) {
      if (!selected.some((s) => s.id === selectedItem.id)) {
        setSelected((prev) => [...prev, selectedItem]);
      }
    }
    prevSelectedRef.current = selectedItem;
  }, [selectedItem, selected, setSelected]);

  return (
    <div className='space-y-2'>
      <SelectedItems values={selected} itemToKey={itemToKey} itemToString={itemToString} className='flex flex-wrap gap-1' />
      <div className='relative'>
        <Input {...getInputProps()} placeholder='Add more...' />
        <Options
          items={items.filter((item) => !selected.some((s) => s.id === item.id))}
          isOpen={isOpen}
          selectedItem={selectedItem}
          highlightedItem={highlightedItem}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          itemToKey={itemToKey}
          renderItem={({ item }) => <span>{item.label}</span>}
        />
      </div>
    </div>
  );
};

const MultiSelectReadOnlyExample = () => {
  const [selected, setSelected] = useState<SimpleItem[]>([
    { id: '1', label: 'Apple' },
    { id: '2', label: 'Banana' }
  ]);

  return (
    <ComboBox<SimpleItem, object> clearOnSelect itemToString={itemToString} loadSuggestions={loadFruitSuggestions}>
      {({ getInputProps, getMenuProps, getItemProps, isOpen, items, selectedItem, highlightedItem }) => (
        <MultiSelectReadOnlyContent
          selected={selected}
          setSelected={setSelected}
          getInputProps={getInputProps}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          isOpen={isOpen}
          items={items}
          selectedItem={selectedItem}
          highlightedItem={highlightedItem}
        />
      )}
    </ComboBox>
  );
};

export const MultiSelectReadOnly: Story = {
  render: () => <MultiSelectReadOnlyExample />,
  parameters: {
    docs: {
      description: { story: 'Multi-select with read-only badges (no remove button).' }
    }
  }
};

// =============================================================================
// With Custom Item Rendering
// =============================================================================

type UserItem = { id: string; name: string; email: string; avatar: string };

const users: UserItem[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatar: 'AJ' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', avatar: 'BS' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', avatar: 'CW' }
];

export const WithCustomItemRendering: Story = {
  render: () => (
    <ComboBox<UserItem, object>
      defaultItems={users}
      itemToString={(item) => item?.name ?? ''}
      loadSuggestions={async (inputValue) => {
        const filtered = users.filter(
          (user) =>
            user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            user.email.toLowerCase().includes(inputValue.toLowerCase())
        );
        return { items: filtered };
      }}
    >
      {({ getInputProps, getMenuProps, getItemProps, isOpen, items, selectedItem, highlightedItem }) => (
        <div className='relative'>
          <Input {...getInputProps()} placeholder='Search users...' />
          <Options
            items={items}
            isOpen={isOpen}
            selectedItem={selectedItem}
            highlightedItem={highlightedItem}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            itemToKey={(item) => item.id}
            renderItem={({ item }) => (
              <div className='flex items-center gap-3 p-2'>
                <div className='avatar placeholder'>
                  <div className='bg-primary text-primary-content w-10 rounded-full flex items-center justify-center font-bold'>
                    {item.avatar}
                  </div>
                </div>
                <div>
                  <p className='font-medium'>{item.name}</p>
                  <p className='text-xs text-neutral'>{item.email}</p>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </ComboBox>
  ),
  parameters: {
    docs: {
      description: { story: 'Custom item rendering with avatars and secondary text.' }
    }
  }
};

// =============================================================================
// Interaction Tests
// =============================================================================

export const AccessibilityTest: Story = {
  render: () => (
    <ComboBox<SimpleItem, object>
      defaultItems={fruits.slice(0, 3)}
      itemToString={itemToString}
      loadSuggestions={loadFruitSuggestions}
    >
      {({ getLabelProps, getInputProps, getMenuProps, getItemProps, isOpen, items, selectedItem, highlightedItem }) => (
        <div className='form-control'>
          <label {...getLabelProps()} htmlFor='fruit-test' className='label'>
            <span className='label-text'>Fruit</span>
          </label>
          <div className='relative'>
            <Input {...getInputProps()} id='fruit-test' placeholder='Search...' />
            <Options
              items={items}
              isOpen={isOpen}
              selectedItem={selectedItem}
              highlightedItem={highlightedItem}
              getMenuProps={getMenuProps}
              getItemProps={getItemProps}
              itemToKey={itemToKey}
              renderItem={({ item }) => <span>{item.label}</span>}
            />
          </div>
        </div>
      )}
    </ComboBox>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await expect(input).toBeVisible();
    await userEvent.click(input);
    await userEvent.type(input, 'a');
  },
  parameters: {
    docs: {
      description: { story: 'Verifies combobox is accessible and interactive.' }
    }
  }
};
