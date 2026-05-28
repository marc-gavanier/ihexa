import { AsyncLocalStorage } from 'node:async_hooks';
import type { EnrichableFields, ObservabilityContext } from './context.type';

const storage = new AsyncLocalStorage<ObservabilityContext>();

export const runWithContext = <T>(context: ObservabilityContext, fn: () => T): T => storage.run(context, fn);

export const getContext = (): ObservabilityContext | undefined => storage.getStore();

export const enrichContext = <C extends ObservabilityContext, T>(base: C, patch: EnrichableFields, fn: () => T): T =>
  storage.run({ ...base, ...patch }, fn);
