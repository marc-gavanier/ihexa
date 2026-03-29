'use client';

import { useActionState } from 'react';
import type { ServerActionError, ServerActionResult, ServerActionSuccess } from './result';

type ExtractResult<T> = T extends (formData: never) => Promise<ServerActionResult<infer R, string>> ? R : never;

type ExtractError<T> = T extends (formData: never) => Promise<ServerActionResult<unknown, infer E>> ? E : never;

type ExtractFormData<T> = T extends (formData: infer F) => Promise<ServerActionResult<unknown, string>> ? F : never;

export const useServerAction = <TAction extends (formData: never) => Promise<ServerActionResult<unknown, string>>>(
  action: TAction,
  handlers?: {
    onSuccess?: (state: ServerActionSuccess<ExtractResult<TAction>>) => void;
    onError?: (state: ServerActionError<ExtractError<TAction>>) => void;
  }
): [
  (formData: ExtractFormData<TAction>) => void | Promise<void>,
  boolean,
  ServerActionResult<ExtractResult<TAction>, ExtractError<TAction>> | null
] => {
  type TResult = ExtractResult<TAction>;
  type TError = ExtractError<TAction>;
  type TFormData = ExtractFormData<TAction>;

  const [state, dispatch, isPending] = useActionState<ServerActionResult<TResult, TError> | null, TFormData>(
    async (
      _: ServerActionResult<TResult, TError> | null,
      formData: TFormData
    ): Promise<ServerActionResult<TResult, TError>> => {
      const result = await (action as unknown as (formData: TFormData) => Promise<ServerActionResult<TResult, TError>>)(
        formData
      );
      result.success ? handlers?.onSuccess?.(result) : handlers?.onError?.(result);
      return result;
    },
    null
  );
  return [dispatch, isPending, state];
};
