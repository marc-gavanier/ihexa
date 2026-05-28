import { after } from 'next/server';
import pino from 'pino';
import { createPinoLogger, withLogger as createWithLogger } from '@/libraries/observability';
import { getScope, getTrace, getUser } from '@/libraries/observability/context';

const transport = pino.transport({
  targets: [
    { target: 'pino/file', options: { destination: '.logs/app.jsonl', mkdir: true } },
    { target: 'pino-pretty', options: { colorize: true } }
  ]
});

export const logger = createPinoLogger({ destination: transport, getScope, getUser, getTrace });

export const withLogger = createWithLogger(logger, after);
