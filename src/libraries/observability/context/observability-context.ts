import { AsyncLocalStorage } from 'node:async_hooks';
import type { Identity, ObservabilityScope, Traced } from './context.type';

const scopeStore = new AsyncLocalStorage<ObservabilityScope>();
const identityStore = new AsyncLocalStorage<Identity>();
const traceStore = new AsyncLocalStorage<Traced>();

export const runWithScope = <T>(scope: ObservabilityScope, fn: () => T): T => scopeStore.run(scope, fn);

export const runWithIdentity = <T>(identity: Identity, fn: () => T): T => identityStore.run(identity, fn);

export const runWithTrace = <T>(trace: Traced, fn: () => T): T => traceStore.run(trace, fn);

export const enterScope = (scope: ObservabilityScope): void => scopeStore.enterWith(scope);

export const enterIdentity = (identity: Identity): void => identityStore.enterWith(identity);

export const enterTrace = (trace: Traced): void => traceStore.enterWith(trace);

export const getScope = (): ObservabilityScope | undefined => scopeStore.getStore();

export const getIdentity = (): Identity | undefined => identityStore.getStore();

export const getTrace = (): Traced | undefined => traceStore.getStore();
