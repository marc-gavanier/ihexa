import { createNoopReporter } from '@arckit/telemetry/error-reporter';

export const errorReporter = createNoopReporter();

export const register = (): void => {};
