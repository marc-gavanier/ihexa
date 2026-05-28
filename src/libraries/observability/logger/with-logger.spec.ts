import { describe, expect, it, vi } from 'vitest';
import { memoryLogger } from './memory-logger';
import { withLogger } from './with-logger';

vi.mock('next/server', () => ({
  after: (fn: () => void) => fn()
}));

const ServerActionSuccess = <T = void>(data?: T) => ({ success: true as const, data });
const ServerActionError = <T extends string>(error: T) => ({ success: false as const, error });

describe('withLogger', () => {
  it('logs a success event with the configured level after the action resolves', async () => {
    const logger = memoryLogger();
    const middleware = withLogger(logger)('user.create');

    const ctx = { input: { name: 'Acme' } };
    const result = await middleware(ctx, ctx, async () => ServerActionSuccess({ id: 'u1' }));

    expect(result).toEqual(ServerActionSuccess({ id: 'u1' }));
    expect(logger.entries).toEqual([{ level: 'info', event: 'user.create:success', attributes: {} }]);
  });

  it('logs a failure event with error.type when the action returns an error', async () => {
    const logger = memoryLogger();
    const middleware = withLogger(logger)('user.create');

    await middleware({}, {}, async () => ServerActionError('AlreadyExists'));

    expect(logger.entries).toEqual([
      {
        level: 'info',
        event: 'user.create:failure',
        attributes: { 'error.type': 'AlreadyExists' }
      }
    ]);
  });

  it('includes attributes extracted from the context', async () => {
    const logger = memoryLogger();
    type Ctx = { input: { name: string } };
    const middleware = withLogger(logger)<Ctx>('user.create', {
      extractAttributes: (ctx) => ({ name: ctx.input.name })
    });

    await middleware({ input: { name: 'Acme' } }, {}, async () => ServerActionSuccess({ id: 'u1' }));

    expect(logger.entries).toEqual([{ level: 'info', event: 'user.create:success', attributes: { name: 'Acme' } }]);
  });

  it('respects the configured level on both success and failure', async () => {
    const logger = memoryLogger();
    const middleware = withLogger(logger)('audit.read', { level: 'debug' });

    await middleware({}, {}, async () => ServerActionSuccess());
    await middleware({}, {}, async () => ServerActionError('Forbidden'));

    expect(logger.entries.map((entry) => entry.level)).toEqual(['debug', 'debug']);
  });
});
