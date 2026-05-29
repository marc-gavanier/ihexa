import { withErrorReporter as createWithErrorReporter } from '@arckit/nextjs/telemetry';
import { createLoggerReporter } from '@arckit/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { logger } from '../../logger/server';

export const errorReporter = createLoggerReporter({ logger, getScope, getIdentity, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter, preservingAfter);

export const register = async (): Promise<void> => {};

export const onRequestError = (): void => {};
