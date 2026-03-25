import type { AnyFormApi } from '@tanstack/react-form';
import type { SyntheticEvent } from 'react';

export const handleSubmit = (form: AnyFormApi) => async (event: SyntheticEvent<HTMLFormElement>) => {
  event.preventDefault();
  event.stopPropagation();
  await form.handleSubmit();
};
