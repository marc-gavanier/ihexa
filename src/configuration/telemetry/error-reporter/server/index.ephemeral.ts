import { withErrorReporter as createWithErrorReporter } from '@arckit/nextjs/telemetry';
import { createNoopReporter } from '@arckit/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import { preservingAfter } from '@/configuration/telemetry/scheduler';

export const errorReporter = createNoopReporter({ getScope, getIdentity, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter, preservingAfter);

export const register = async (): Promise<void> => {};

export const onRequestError = (): void => {};
