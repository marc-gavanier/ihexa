import { createNoopReporter } from '@arckit/telemetry/error-reporter';

export const errorReporter = createNoopReporter();

export const register = (): void => {};

export const onRouterTransitionStart = (_url: string, _navigationType: 'push' | 'replace' | 'traverse'): void => {};
