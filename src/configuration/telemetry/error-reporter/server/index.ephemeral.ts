import { withErrorReporter as createWithErrorReporter } from '@arckit/nextjs/telemetry';
import { createNoopReporter } from '@arckit/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';

export const errorReporter = createNoopReporter({ getScope, getIdentity, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter);

export const register = async (): Promise<void> => {};

export const onRequestError = (): void => {};
