import { after } from 'next/server';
import { createNoopReporter, withErrorReporter as createWithErrorReporter } from '@/libraries/observability';
import { getScope, getTrace, getUser } from '@/libraries/observability/context';

export const errorReporter = createNoopReporter({ getScope, getUser, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter, after);

export const register = async (): Promise<void> => {};

export const onRequestError = (): void => {};
