import { withLogger as createWithLogger } from '@arckit/nextjs/telemetry';
import { createPinoLogger } from '@arckit/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import pino from 'pino';
import { preservingAfter } from '@/configuration/telemetry/scheduler';

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
