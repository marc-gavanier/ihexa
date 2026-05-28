import { AsyncLocalStorage } from 'node:async_hooks';
import type { Authenticated, ObservabilityScope, Traced } from './context.type';

const scopeStore = new AsyncLocalStorage<ObservabilityScope>();
const userStore = new AsyncLocalStorage<Authenticated>();
const traceStore = new AsyncLocalStorage<Traced>();

export const runWithScope = <T>(scope: ObservabilityScope, fn: () => T): T => scopeStore.run(scope, fn);

export const runWithUser = <T>(user: Authenticated, fn: () => T): T => userStore.run(user, fn);

export const runWithTrace = <T>(trace: Traced, fn: () => T): T => traceStore.run(trace, fn);

export const getScope = (): ObservabilityScope | undefined => scopeStore.getStore();

export const getUser = (): Authenticated | undefined => userStore.getStore();

export const getTrace = (): Traced | undefined => traceStore.getStore();
