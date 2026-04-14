import type { KeyboardEvent } from 'react';
import { ComboBox as ComboBoxBase, type ComboBoxProps as ComboBoxBaseProps } from '@/libraries/ui/primitives/combobox';
import { useFieldContext } from '../form-context';

export type ComboBoxProps<TItem, TPayload extends object> = ComboBoxBaseProps<TItem, TPayload> & {
  isPending: boolean;
  itemToKey: (item: TItem) => string;
  resetValue?: Partial<TItem> | TItem[] | null;
  onSelect?: (item: TItem) => void;
};

const getMultipleSelection = <TItem,>(state: { value: TItem | TItem[] }): state is { value: TItem[] } =>
  Array.isArray(state.value);

const alreadyExist =
  <TItem,>({ itemToKey }: { itemToKey: (value: TItem) => string }) =>
  (newValue: TItem) =>
  (value: TItem): boolean =>
    itemToKey(value) === itemToKey(newValue);

const get = <TItem,>(item: Record<string, unknown>, path: string): TItem =>
  path.split('.').reduce<unknown>((nestedItem, part) => (nestedItem as Record<string, unknown>)?.[part], item) as TItem;

export const ComboBox = <TItem, TPayload extends object>(comboBoxProps: ComboBoxProps<TItem, TPayload>) => {
  const { form, name, state, setValue, setMeta } = useFieldContext<TItem>();

  const isMultipleSelection = getMultipleSelection(state);

  const defaultValue = comboBoxProps.defaultValue ?? get(form.options.defaultValues, name);

  const appendValue = (value: TItem, values: TItem[]): void => {
    if (values.some(alreadyExist(comboBoxProps)(value))) return;
    setValue([...values, value] as TItem);
  };

  const notSelectedIn = (selectedItems: TItem[]) => {
    const selectedKeys = new Set(selectedItems.map(comboBoxProps.itemToKey));
    return (defaultItem: TItem) => !selectedKeys.has(comboBoxProps.itemToKey(defaultItem));
  };

  return (
    <ComboBoxBase {...comboBoxProps} clearOnSelect={isMultipleSelection} {...(isMultipleSelection ? {} : { defaultValue })}>
      {({
        getLabelProps,
        getInputProps,
        getMenuProps,
        getToggleButtonProps,
        getItemProps,
        isOpen,
        isPending,
        setInputValue,
        inputValue,
        selectedItem,
        highlightedItem,
        items,
        setItems,
        payload,
        reset
      }) =>
        comboBoxProps.children({
          reset,
          getLabelProps,
          getToggleButtonProps,
          getMenuProps,
          getInputProps: <TOptions,>(options: TOptions) =>
            getInputProps({
              disabled: comboBoxProps.isPending,
              onFocusCapture: () => {
                if (isMultipleSelection) {
                  return setItems(comboBoxProps.defaultItems?.filter(notSelectedIn(state.value)) ?? []);
                }
                if (comboBoxProps.itemToString(state.value) !== '') return;
                setValue((comboBoxProps.resetValue ?? null) as TItem);
              },
              onInput: () => {
                if (isMultipleSelection) return;
                setValue((comboBoxProps.resetValue ?? null) as TItem);
              },
              onBlur: () => {
                setMeta({ ...state.meta, isBlurred: true });
                if (isMultipleSelection) setItems([]);
              },
              onKeyDown: (e: KeyboardEvent<HTMLInputElement>): void => {
                if (e.key !== 'Enter' || highlightedItem == null) return;
                isMultipleSelection ? appendValue(highlightedItem, state.value) : setValue(highlightedItem);
                comboBoxProps.onSelect?.(highlightedItem);
              },
              ...options
            }),
          getItemProps: (options) =>
            getItemProps({
              onClick: () => {
                isMultipleSelection ? appendValue(options.item, state.value) : setValue(options.item);
                comboBoxProps.onSelect?.(options.item);
              },
              ...options
            }),
          isOpen,
          isPending,
          setInputValue,
          inputValue,
          highlightedItem,
          selectedItem: state.value ?? selectedItem,
          items,
          setItems,
          payload
        })
      }
    </ComboBoxBase>
  );
};
