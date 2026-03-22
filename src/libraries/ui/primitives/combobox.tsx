import { type UseComboboxReturnValue, useCombobox } from 'downshift';
import { type Dispatch, type ReactNode, type SetStateAction, useState, useTransition } from 'react';

export type ComboBoxData<TItem, TPayload> = {
  itemToString: (item: TItem | null) => string;
  beforeLoadSuggestions?: (inputValue: string) => Partial<TPayload>;
  loadSuggestions: (inputValue: string) => Promise<{ items: TItem[] } & TPayload>;
};

export type ComboBoxProps<TItem, TPayload extends object> = {
  defaultItems?: TItem[];
  defaultValue?: Partial<TItem>;
  clearOnSelect?: boolean;
  children: (props: {
    getLabelProps: UseComboboxReturnValue<TItem>['getLabelProps'];
    getMenuProps: UseComboboxReturnValue<TItem>['getMenuProps'];
    getToggleButtonProps: UseComboboxReturnValue<TItem>['getToggleButtonProps'];
    getInputProps: UseComboboxReturnValue<TItem>['getInputProps'];
    getItemProps: UseComboboxReturnValue<TItem>['getItemProps'];
    inputValue: UseComboboxReturnValue<TItem>['inputValue'];
    setInputValue: UseComboboxReturnValue<TItem>['setInputValue'];
    reset: UseComboboxReturnValue<TItem>['reset'];
    isOpen: boolean;
    isPending: boolean;
    selectedItem: TItem | null;
    highlightedItem: TItem | null;
    items: TItem[];
    setItems: Dispatch<SetStateAction<TItem[]>>;
    payload: Omit<TPayload, 'items'>;
  }) => ReactNode;
} & ComboBoxData<TItem, TPayload>;

export const ComboBox = <TItem, TPayload extends object>({
  defaultItems = [],
  defaultValue,
  beforeLoadSuggestions,
  loadSuggestions,
  itemToString,
  clearOnSelect = false,
  children
}: ComboBoxProps<TItem, TPayload>) => {
  const [items, setItems] = useState<TItem[]>(defaultItems);
  const [payload, setPayload] = useState<TPayload>({} as TPayload);
  const [isPending, startTransition] = useTransition();

  const fetchSuggestions = async (value: string): Promise<void> => {
    startTransition(() => {
      setPayload((prevState: TPayload) => ({ ...prevState, ...beforeLoadSuggestions?.(value) }));
    });
    const { items: newItems, ...newPayload } = await loadSuggestions(value);
    startTransition(() => {
      setItems(newItems);
      setPayload(newPayload as TPayload);
    });
  };

  const {
    getLabelProps,
    getInputProps,
    getMenuProps,
    getToggleButtonProps,
    getItemProps,
    setInputValue,
    reset,
    inputValue,
    isOpen,
    selectedItem,
    highlightedIndex
  } = useCombobox({
    onInputValueChange: async ({ inputValue }: { inputValue: string }): Promise<void> => {
      await fetchSuggestions(inputValue);
    },
    onIsOpenChange: async ({ isOpen, inputValue }): Promise<void> => {
      if (isOpen && items.length === 0) {
        await fetchSuggestions(inputValue ?? '');
      }
    },
    items,
    itemToString,
    onSelectedItemChange: () => {
      if (!clearOnSelect) return;
      setInputValue('');
      setItems([]);
    },
    defaultInputValue: itemToString((defaultValue as TItem) ?? null)
  });

  return children({
    getLabelProps,
    getInputProps,
    getMenuProps,
    getToggleButtonProps,
    getItemProps,
    setInputValue,
    reset,
    inputValue,
    isOpen,
    isPending,
    selectedItem,
    highlightedItem: items[highlightedIndex] ?? null,
    items,
    setItems,
    payload
  });
};
