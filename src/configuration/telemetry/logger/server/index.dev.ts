import { after } from 'next/server';
import pino from 'pino';
import { createPinoLogger, withLogger as createWithLogger } from '@/libraries/telemetry';
import { getIdentity, getScope, getTrace } from '@/libraries/telemetry/context';

const transport = pino.transport({
  targets: [
    { target: 'pino/file', options: { destination: '.logs/app.jsonl', mkdir: true } },
    { target: 'pino-pretty', options: { colorize: true } }
  ]
});

export const logger = createPinoLogger({ destination: transport, getScope, getIdentity, getTrace });

export const withLogger = createWithLogger(logger, after);
