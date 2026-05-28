import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';
import { runWithScope } from '../context';
import { consoleLogger } from './console-logger';

type Spies = {
  log: MockInstance<typeof console.log>;
  warn: MockInstance<typeof console.warn>;
  error: MockInstance<typeof console.error>;
  debug: MockInstance<typeof console.debug>;
};

let spies: Spies;

describe('consoleLogger', () => {
  beforeEach(() => {
    spies = {
      log: vi.spyOn(console, 'log').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {}),
      debug: vi.spyOn(console, 'debug').mockImplementation(() => {})
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('emits a JSON record with OTel severity fields and event payload', () => {
    consoleLogger().log({ level: 'info', event: 'user.created', attributes: { userId: 'u1' } });

    expect(spies.log).toHaveBeenCalledOnce();
    const record = JSON.parse(spies.log.mock.calls[0][0] as string);
    expect(record).toMatchObject({
      severityText: 'INFO',
      severityNumber: 9,
      event: 'user.created',
      userId: 'u1'
    });
    expect(record.time).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('routes each level to the corresponding console method', () => {
    const logger = consoleLogger();
    logger.log({ level: 'debug', event: 'x' });
    logger.log({ level: 'warn', event: 'x' });
    logger.log({ level: 'error', event: 'x' });

    expect(spies.debug).toHaveBeenCalledOnce();
    expect(spies.warn).toHaveBeenCalledOnce();
    expect(spies.error).toHaveBeenCalledOnce();
  });

  it('merges the active observability context', () => {
    runWithScope({ source: 'server', requestId: 'r1' }, () => {
      consoleLogger().log({ level: 'info', event: 'x' });
    });

    const record = JSON.parse(spies.log.mock.calls[0][0] as string);
    expect(record).toMatchObject({ source: 'server', requestId: 'r1' });
  });

  it('attaches exception.* fields when an error is provided', () => {
    consoleLogger().log({
      level: 'error',
      event: 'fail',
      error: Object.assign(new Error('Boom'), { name: 'BoomError' })
    });

    const record = JSON.parse(spies.error.mock.calls[0][0] as string);
    expect(record).toMatchObject({
      'exception.type': 'BoomError',
      'exception.message': 'Boom'
    });
  });
});
