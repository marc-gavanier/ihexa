import { describe, expect, it } from 'vitest';
import { enrichContext, getContext, runWithContext } from './observability-context';

describe('observability context', () => {
  it('returns an empty context outside any scope', () => {
    expect(getContext()).toEqual({});
  });

  it('exposes the active context inside runWithContext', () => {
    runWithContext({ traceId: 'trace-1', userId: 'user-1' }, () => {
      expect(getContext()).toEqual({ traceId: 'trace-1', userId: 'user-1' });
    });
  });

  it('restores the empty context once the scope exits', () => {
    runWithContext({ traceId: 'trace-1' }, () => {});
    expect(getContext()).toEqual({});
  });

  it('isolates concurrent scopes', async () => {
    const results: Array<string | undefined> = [];

    await Promise.all([
      runWithContext({ traceId: 'trace-A' }, async () => {
        await new Promise((resolve) => setTimeout(resolve, 5));
        results.push(getContext().traceId);
      }),
      runWithContext({ traceId: 'trace-B' }, async () => {
        results.push(getContext().traceId);
      })
    ]);

    expect(results.sort()).toEqual(['trace-A', 'trace-B']);
  });

  it('merges enrichContext patch into the active context', () => {
    runWithContext({ traceId: 'trace-1', userId: 'user-1' }, () => {
      enrichContext({ requestId: 'req-1' }, () => {
        expect(getContext()).toEqual({ traceId: 'trace-1', userId: 'user-1', requestId: 'req-1' });
      });
    });
  });

  it('lets enrichContext override existing fields within its scope', () => {
    runWithContext({ traceId: 'trace-1' }, () => {
      enrichContext({ traceId: 'trace-2' }, () => {
        expect(getContext().traceId).toBe('trace-2');
      });
      expect(getContext().traceId).toBe('trace-1');
    });
  });
});
