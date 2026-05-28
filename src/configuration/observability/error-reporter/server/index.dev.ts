import { after } from 'next/server';
import { createLoggerReporter, withErrorReporter as createWithErrorReporter } from '@/libraries/observability';
import { getIdentity, getScope, getTrace } from '@/libraries/observability/context';
import { logger } from '../../logger/server';

export const errorReporter = createLoggerReporter({ logger, getScope, getIdentity, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter, after);

export const register = async (): Promise<void> => {};

export const onRequestError = (): void => {};
