import { describe, expect, it } from 'vitest';
import { runWithContext } from '../context';
import { pinoLogger } from './pino-logger';

const captureStream = (): { write: (chunk: string) => void; lines: string[] } => {
  const lines: string[] = [];
  return {
    write: (chunk: string) => {
      lines.push(chunk);
    },
    lines
  };
};

describe('pinoLogger', () => {
  it('emits a record with event and attributes at the requested level', () => {
    const stream = captureStream();
    const logger = pinoLogger({}, stream);

    logger.log({
      level: 'info',
      event: 'user.created',
      attributes: { userId: 'u1', businessName: 'Acme' }
    });

    expect(stream.lines).toHaveLength(1);
    const record = JSON.parse(stream.lines[0]);
    expect(record).toMatchObject({
      level: 30,
      event: 'user.created',
      userId: 'u1',
      businessName: 'Acme'
    });
  });

  it('serializes errors with exception.* attributes', () => {
    const stream = captureStream();
    const logger = pinoLogger({}, stream);

    logger.log({
      level: 'error',
      event: 'payment.failed',
      error: Object.assign(new Error('Card declined'), { name: 'PaymentError' })
    });

    const record = JSON.parse(stream.lines[0]);
    expect(record).toMatchObject({
      level: 50,
      event: 'payment.failed',
      'exception.type': 'PaymentError',
      'exception.message': 'Card declined'
    });
    expect(record['exception.stacktrace']).toContain('PaymentError');
  });

  it('merges the active observability context into every record', () => {
    const stream = captureStream();
    const logger = pinoLogger({}, stream);

    runWithContext({ traceId: 't1', requestId: 'r1', userId: 'u1' }, () => {
      logger.log({ level: 'info', event: 'page.viewed' });
    });

    const record = JSON.parse(stream.lines[0]);
    expect(record).toMatchObject({
      event: 'page.viewed',
      traceId: 't1',
      requestId: 'r1',
      userId: 'u1'
    });
  });

  it('honors every supported severity level', () => {
    const stream = captureStream();
    const logger = pinoLogger({ level: 'trace' }, stream);

    logger.log({ level: 'trace', event: 'x' });
    logger.log({ level: 'debug', event: 'x' });
    logger.log({ level: 'info', event: 'x' });
    logger.log({ level: 'warn', event: 'x' });
    logger.log({ level: 'error', event: 'x' });
    logger.log({ level: 'fatal', event: 'x' });

    expect(stream.lines.map((line: string) => JSON.parse(line).level)).toEqual([10, 20, 30, 40, 50, 60]);
  });
});
