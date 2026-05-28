import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { createLoggerReporter, withErrorReporter as createWithErrorReporter } from '@/libraries/telemetry';
import { getIdentity, getScope, getTrace } from '@/libraries/telemetry/context';
import { logger } from '../../logger/server';

export const errorReporter = createLoggerReporter({ logger, getScope, getIdentity, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter, preservingAfter);

export const register = async (): Promise<void> => {};

export const onRequestError = (): void => {};
