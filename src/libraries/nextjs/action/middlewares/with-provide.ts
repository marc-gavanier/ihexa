import type { InjectionKey } from 'piqure/src/Providing';
import { provide } from '@/libraries/injection';
import type { PipeMiddleware } from '../action-builder';
import type { ServerActionResult } from '../result';

export const withProvide =
  <T>(injectionKey: InjectionKey<T>, implementation: T): PipeMiddleware<object, object, unknown> =>
  async (_ctx, _rawInput, next): Promise<ServerActionResult<unknown>> => {
    provide(injectionKey, implementation);
    return next({});
  };
