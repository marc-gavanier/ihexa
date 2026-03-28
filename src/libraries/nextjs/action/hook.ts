'use client';

import { useActionState } from 'react';
import type { ServerActionError, ServerActionResult, ServerActionSuccess } from './result';

type ExtractResult<T> = T extends (formData: never) => Promise<ServerActionResult<infer R>> ? R : never;

type ExtractFormData<T> = T extends (formData: infer F) => Promise<ServerActionResult<unknown>> ? F : never;

export const useServerAction = <TAction extends (formData: never) => Promise<ServerActionResult<unknown>>>(
  action: TAction,
  handlers?: {
    onSuccess?: (state: ServerActionSuccess<ExtractResult<TAction>>) => void;
    onError?: (state: ServerActionError) => void;
  }
): [
  (formData: ExtractFormData<TAction>) => void | Promise<void>,
  boolean,
  ServerActionResult<ExtractResult<TAction>> | null
] => {
  type TResult = ExtractResult<TAction>;
  type TFormData = ExtractFormData<TAction>;

  const [state, dispatch, isPending] = useActionState<ServerActionResult<TResult> | null, TFormData>(
    async (_: ServerActionResult<TResult> | null, formData: TFormData): Promise<ServerActionResult<TResult>> => {
      const result = await (action as unknown as (formData: TFormData) => Promise<ServerActionResult<TResult>>)(formData);
      result.success ? handlers?.onSuccess?.(result) : handlers?.onError?.(result);
      return result;
    },
    null
  );
  return [dispatch, isPending, state];
};
