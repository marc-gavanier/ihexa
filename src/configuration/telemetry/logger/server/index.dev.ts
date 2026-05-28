import pino from 'pino';
import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { createPinoLogger, withLogger as createWithLogger } from '@/libraries/telemetry';
import { getIdentity, getScope, getTrace } from '@/libraries/telemetry/context';

const transport = pino.transport({
  targets: [
    { target: 'pino/file', level: 'trace', options: { destination: '.logs/app.jsonl', mkdir: true } },
    { target: 'pino-pretty', level: 'trace', options: { colorize: true } }
  ]
});

export const logger = createPinoLogger({
  options: { level: 'trace' },
  destination: transport,
  getScope,
  getIdentity,
  getTrace
});

export const withLogger = createWithLogger(logger, preservingAfter);
