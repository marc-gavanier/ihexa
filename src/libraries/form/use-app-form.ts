import { createFormHook } from '@tanstack/react-form';
import { lazy } from 'react';
import { fieldContext, formContext } from './form-context';

const Input = lazy(() => import('./fields/input.field').then((module) => ({ default: module.Input })));
const Label = lazy(() => import('./fields/label.field').then((module) => ({ default: module.Label })));
const Info = lazy(() => import('./fields/info.field').then((module) => ({ default: module.Info })));

const Submit = lazy(() => import('./form/submit.form').then((module) => ({ default: module.Submit })));

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Input,
    Label,
    Info
  },
  formComponents: { Submit }
});
