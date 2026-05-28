import { describe, expect, it } from 'vitest';
import { getScope, getTrace, getUser, runWithScope, runWithTrace, runWithUser } from './observability-context';

describe('observability context', () => {
  describe('scope store', () => {
    it('returns undefined when called outside any scope', () => {
      expect(getScope()).toBeUndefined();
    });

    it('returns the active scope inside runWithScope', () => {
      runWithScope({ source: 'server', requestId: 'r1' }, () => {
        expect(getScope()).toEqual({ source: 'server', requestId: 'r1' });
      });
    });

    it('returns undefined again once the scope exits', () => {
      runWithScope({ source: 'server', requestId: 'r1' }, () => {});
      expect(getScope()).toBeUndefined();
    });

    it('isolates concurrent scopes', async () => {
      const results: Array<string | undefined> = [];

      await Promise.all([
        runWithScope({ source: 'server', requestId: 'rA' }, async () => {
          await new Promise((resolve) => setTimeout(resolve, 5));
          const scope = getScope();
          results.push(scope?.source === 'server' ? scope.requestId : undefined);
        }),
        runWithScope({ source: 'server', requestId: 'rB' }, async () => {
          const scope = getScope();
          results.push(scope?.source === 'server' ? scope.requestId : undefined);
        })
      ]);

      expect(results.sort()).toEqual(['rA', 'rB']);
    });

    it('accepts every source variant', () => {
      runWithScope({ source: 'server', requestId: 'r1' }, () => {
        expect(getScope()?.source).toBe('server');
      });
      runWithScope({ source: 'edge', requestId: 'r1' }, () => {
        expect(getScope()?.source).toBe('edge');
      });
      runWithScope({ source: 'client', anonymousId: 'a1' }, () => {
        expect(getScope()?.source).toBe('client');
      });
    });

    it('rejects malformed scopes at compile time', () => {
      // @ts-expect-error — server must not carry anonymousId
      runWithScope({ source: 'server', requestId: 'r1', anonymousId: 'a1' }, () => {});
      // @ts-expect-error — client must not carry requestId
      runWithScope({ source: 'client', anonymousId: 'a1', requestId: 'r1' }, () => {});
      // @ts-expect-error — server requires requestId
      runWithScope({ source: 'server' }, () => {});
      // @ts-expect-error — client requires anonymousId
      runWithScope({ source: 'client' }, () => {});
      // @ts-expect-error — userId belongs to the user store, not the scope
      runWithScope({ source: 'server', requestId: 'r1', userId: 'u1' }, () => {});
    });
  });

  describe('user store', () => {
    it('returns undefined when called outside runWithUser', () => {
      expect(getUser()).toBeUndefined();
    });

    it('returns the user inside runWithUser', () => {
      runWithUser({ userId: 'u1' }, () => {
        expect(getUser()).toEqual({ userId: 'u1' });
      });
    });

    it('restores undefined once runWithUser exits', () => {
      runWithUser({ userId: 'u1' }, () => {});
      expect(getUser()).toBeUndefined();
    });

    it('is independent from the scope store', () => {
      runWithUser({ userId: 'u1' }, () => {
        expect(getScope()).toBeUndefined();
        expect(getUser()).toEqual({ userId: 'u1' });
      });
    });

    it('rejects malformed users at compile time', () => {
      // @ts-expect-error — userId is required
      runWithUser({}, () => {});
      // @ts-expect-error — only userId is allowed
      runWithUser({ userId: 'u1', traceId: 't1' }, () => {});
    });
  });

  describe('trace store', () => {
    it('returns undefined when called outside runWithTrace', () => {
      expect(getTrace()).toBeUndefined();
    });

    it('returns the trace inside runWithTrace', () => {
      runWithTrace({ traceId: 't1', spanId: 's1' }, () => {
        expect(getTrace()).toEqual({ traceId: 't1', spanId: 's1' });
      });
    });

    it('is independent from the scope and user stores', () => {
      runWithTrace({ traceId: 't1', spanId: 's1' }, () => {
        expect(getScope()).toBeUndefined();
        expect(getUser()).toBeUndefined();
        expect(getTrace()).toEqual({ traceId: 't1', spanId: 's1' });
      });
    });

    it('rejects partial traces at compile time', () => {
      // @ts-expect-error — both traceId and spanId are required
      runWithTrace({ traceId: 't1' }, () => {});
      // @ts-expect-error — spanId required
      runWithTrace({ spanId: 's1' }, () => {});
    });
  });

  describe('combined usage', () => {
    it('all three stores can be read simultaneously when nested', () => {
      runWithScope({ source: 'server', requestId: 'r1' }, () => {
        runWithUser({ userId: 'u1' }, () => {
          runWithTrace({ traceId: 't1', spanId: 's1' }, () => {
            expect(getScope()).toEqual({ source: 'server', requestId: 'r1' });
            expect(getUser()).toEqual({ userId: 'u1' });
            expect(getTrace()).toEqual({ traceId: 't1', spanId: 's1' });
          });
        });
      });
    });
  });
});
