import { describe, expect, it } from 'vitest';
import { enrichContext, getContext, runWithContext } from './observability-context';

describe('observability context', () => {
  describe('getContext', () => {
    it('returns undefined when called outside any scope', () => {
      expect(getContext()).toBeUndefined();
    });

    it('returns the active context inside runWithContext', () => {
      runWithContext({ source: 'server', requestId: 'r1', userId: 'u1' }, () => {
        expect(getContext()).toEqual({ source: 'server', requestId: 'r1', userId: 'u1' });
      });
    });

    it('returns undefined again once the scope exits', () => {
      runWithContext({ source: 'server', requestId: 'r1' }, () => {});
      expect(getContext()).toBeUndefined();
    });

    it('isolates concurrent scopes', async () => {
      const results: Array<string | undefined> = [];

      await Promise.all([
        runWithContext({ source: 'server', requestId: 'rA' }, async () => {
          await new Promise((resolve) => setTimeout(resolve, 5));
          results.push(getContext()?.source === 'server' ? getContext()?.requestId : undefined);
        }),
        runWithContext({ source: 'server', requestId: 'rB' }, async () => {
          results.push(getContext()?.source === 'server' ? getContext()?.requestId : undefined);
        })
      ]);

      expect(results.sort()).toEqual(['rA', 'rB']);
    });
  });

  describe('runWithContext — variants', () => {
    it('accepts the server variant', () => {
      runWithContext({ source: 'server', requestId: 'r1' }, () => {
        expect(getContext()?.source).toBe('server');
      });
    });

    it('accepts the edge variant', () => {
      runWithContext({ source: 'edge', requestId: 'r1' }, () => {
        expect(getContext()?.source).toBe('edge');
      });
    });

    it('accepts the client variant', () => {
      runWithContext({ source: 'client', anonymousId: 'a1' }, () => {
        expect(getContext()?.source).toBe('client');
      });
    });

    it('rejects malformed contexts at compile time', () => {
      // @ts-expect-error — server must not carry anonymousId
      runWithContext({ source: 'server', requestId: 'r1', anonymousId: 'a1' }, () => {});
      // @ts-expect-error — client must not carry requestId
      runWithContext({ source: 'client', anonymousId: 'a1', requestId: 'r1' }, () => {});
      // @ts-expect-error — server requires requestId
      runWithContext({ source: 'server' }, () => {});
      // @ts-expect-error — client requires anonymousId
      runWithContext({ source: 'client' }, () => {});
    });
  });

  describe('enrichContext', () => {
    it('merges enrichable fields into the base context', () => {
      runWithContext({ source: 'server', requestId: 'r1' }, () => {
        const ctx = getContext();
        expect(ctx).toBeDefined();
        if (!ctx) return;

        enrichContext(ctx, { userId: 'u1' }, () => {
          expect(getContext()).toEqual({ source: 'server', requestId: 'r1', userId: 'u1' });
        });
      });
    });

    it('restores the base context once the patched scope exits', () => {
      runWithContext({ source: 'server', requestId: 'r1' }, () => {
        const ctx = getContext();
        if (!ctx) return;

        enrichContext(ctx, { userId: 'u1' }, () => {});

        expect(getContext()).toEqual({ source: 'server', requestId: 'r1' });
      });
    });

    it('overrides enrichable fields when patched twice', () => {
      runWithContext({ source: 'server', requestId: 'r1', traceId: 't1' }, () => {
        const ctx = getContext();
        if (!ctx) return;

        enrichContext(ctx, { traceId: 't2' }, () => {
          expect(getContext()?.traceId).toBe('t2');
        });

        expect(getContext()?.traceId).toBe('t1');
      });
    });

    it('rejects patches to identity fields at compile time', () => {
      runWithContext({ source: 'server', requestId: 'r1' }, () => {
        const ctx = getContext();
        if (!ctx) return;

        // @ts-expect-error — source is not enrichable
        enrichContext(ctx, { source: 'client' }, () => {});
        // @ts-expect-error — requestId is not enrichable
        enrichContext(ctx, { requestId: 'r2' }, () => {});
        // @ts-expect-error — anonymousId is not enrichable
        enrichContext(ctx, { anonymousId: 'a1' }, () => {});
      });
    });
  });
});
