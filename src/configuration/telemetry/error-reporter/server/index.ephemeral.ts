import { after } from 'next/server';
import { createNoopReporter, withErrorReporter as createWithErrorReporter } from '@/libraries/telemetry';
import { getIdentity, getScope, getTrace } from '@/libraries/telemetry/context';

export const errorReporter = createNoopReporter({ getScope, getIdentity, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter, after);

export const register = async (): Promise<void> => {};

export const onRequestError = (): void => {};
