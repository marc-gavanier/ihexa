import { describe, expect, it } from 'vitest';
import { getScope, getTrace, getUser, runWithScope, runWithTrace, runWithUser } from './observability-context';

describe('scope store', () => {
  it('returns undefined when called outside any scope', () => {
    expect(getScope()).toBeUndefined();
  });

  it('exposes the active server scope inside runWithScope', () => {
    const observed = runWithScope({ source: 'server', requestId: 'r1' }, () => getScope());
    expect(observed).toEqual({ source: 'server', requestId: 'r1' });
  });

  it('exposes the active edge scope inside runWithScope', () => {
    const observed = runWithScope({ source: 'edge', requestId: 'r1' }, () => getScope());
    expect(observed).toEqual({ source: 'edge', requestId: 'r1' });
  });

  it('exposes the active client scope inside runWithScope', () => {
    const observed = runWithScope({ source: 'client', anonymousId: 'a1' }, () => getScope());
    expect(observed).toEqual({ source: 'client', anonymousId: 'a1' });
  });

  it('returns undefined again once the scope exits', () => {
    runWithScope({ source: 'server', requestId: 'r1' }, () => undefined);
    expect(getScope()).toBeUndefined();
  });

  it('isolates concurrent scopes', async () => {
    const [a, b] = await Promise.all([
      runWithScope({ source: 'server', requestId: 'rA' }, async () => {
        await new Promise((resolve) => setTimeout(resolve, 5));
        return getScope();
      }),
      runWithScope({ source: 'server', requestId: 'rB' }, async () => getScope())
    ]);
    expect([a, b]).toEqual([
      { source: 'server', requestId: 'rA' },
      { source: 'server', requestId: 'rB' }
    ]);
  });
});

describe('user store', () => {
  it('returns undefined when called outside runWithUser', () => {
    expect(getUser()).toBeUndefined();
  });

  it('exposes the active user inside runWithUser', () => {
    const observed = runWithUser({ userId: 'u1' }, () => getUser());
    expect(observed).toEqual({ userId: 'u1' });
  });

  it('does not affect the scope store', () => {
    const observed = runWithUser({ userId: 'u1' }, () => getScope());
    expect(observed).toBeUndefined();
  });

  it('returns undefined again once runWithUser exits', () => {
    runWithUser({ userId: 'u1' }, () => undefined);
    expect(getUser()).toBeUndefined();
  });
});

describe('trace store', () => {
  it('returns undefined when called outside runWithTrace', () => {
    expect(getTrace()).toBeUndefined();
  });

  it('exposes the active trace inside runWithTrace', () => {
    const observed = runWithTrace({ traceId: 't1', spanId: 's1' }, () => getTrace());
    expect(observed).toEqual({ traceId: 't1', spanId: 's1' });
  });

  it('does not affect the scope store', () => {
    const observed = runWithTrace({ traceId: 't1', spanId: 's1' }, () => getScope());
    expect(observed).toBeUndefined();
  });

  it('does not affect the user store', () => {
    const observed = runWithTrace({ traceId: 't1', spanId: 's1' }, () => getUser());
    expect(observed).toBeUndefined();
  });
});

describe('nested stores', () => {
  it('exposes all three stores when fully nested', () => {
    const observed = runWithScope({ source: 'server', requestId: 'r1' }, () =>
      runWithUser({ userId: 'u1' }, () =>
        runWithTrace({ traceId: 't1', spanId: 's1' }, () => ({
          scope: getScope(),
          user: getUser(),
          trace: getTrace()
        }))
      )
    );
    expect(observed).toEqual({
      scope: { source: 'server', requestId: 'r1' },
      user: { userId: 'u1' },
      trace: { traceId: 't1', spanId: 's1' }
    });
  });
});
