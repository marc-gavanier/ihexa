import { withErrorReporter as createWithErrorReporter } from '@arckit/nextjs/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import { createNoopReporter } from '@arckit/telemetry/error-reporter';

export const errorReporter = createNoopReporter({ getScope, getIdentity, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter);

export const register = async (): Promise<void> => {};

export const onRequestError = (): void => {};
