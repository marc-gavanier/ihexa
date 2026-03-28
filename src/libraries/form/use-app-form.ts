import { createFormHook } from '@tanstack/react-form';
import { lazy, type ReactNode } from 'react';
import type { ComboBoxProps } from './fields/combobox.field';
import type { SelectedItemProps } from './fields/selected-items.field';
import { fieldContext, formContext } from './form-context';

const Input = lazy(() => import('./fields/input.field').then((module) => ({ default: module.Input })));
const Textarea = lazy(() => import('./fields/textarea.field').then((module) => ({ default: module.Textarea })));
const Label = lazy(() => import('./fields/label.field').then((module) => ({ default: module.Label })));
const ErrorMessage = lazy(() => import('./fields/error-message.field').then((module) => ({ default: module.ErrorMessage })));
const Counter = lazy(() => import('./fields/counter.field').then((module) => ({ default: module.Counter })));
const Checkbox = lazy(() => import('./fields/checkbox.field').then((module) => ({ default: module.Checkbox })));
const Combobox = lazy(() => import('./fields/combobox.field').then((module) => ({ default: module.ComboBox }))) as <
  TItem,
  TPayload extends object
>(
  props: ComboBoxProps<TItem, TPayload>
) => ReactNode;
const SelectedItems = lazy(() =>
  import('./fields/selected-items.field').then((module) => ({ default: module.SelectedItems }))
) as <T>(props: SelectedItemProps<T>) => ReactNode;

const Submit = lazy(() => import('./form/submit.form').then((module) => ({ default: module.Submit })));

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Input,
    Textarea,
    Label,
    Error: ErrorMessage,
    Counter,
    Checkbox,
    Combobox,
    SelectedItems
  },
  formComponents: { Submit }
});
