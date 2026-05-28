import { AsyncLocalStorage } from 'node:async_hooks';
import type { ObservabilityContext } from './context.type';

const storage = new AsyncLocalStorage<ObservabilityContext>();

export const runWithContext = <T>(context: ObservabilityContext, fn: () => T): T => storage.run(context, fn);

export const getContext = (): ObservabilityContext => storage.getStore() ?? {};

export const enrichContext = <T>(patch: Partial<ObservabilityContext>, fn: () => T): T =>
  storage.run({ ...getContext(), ...patch }, fn);
