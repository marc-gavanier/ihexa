import { describe, expect, it } from 'vitest';
import { buildSpanAttributes } from './build-span-attributes';

describe('buildSpanAttributes', () => {
  it('returns an empty object when no scope, user or attributes are provided', () => {
    expect(buildSpanAttributes({ namespace: 'app' })).toEqual({});
  });

  it('inlines the provided base attributes', () => {
    expect(buildSpanAttributes({ namespace: 'app', attributes: { 'order.id': 'o1' } })['order.id']).toBe('o1');
  });

  it('includes the scope source under <namespace>.source', () => {
    expect(buildSpanAttributes({ namespace: 'app', scope: { source: 'server', requestId: 'r1' } })['app.source']).toBe(
      'server'
    );
  });

  it('includes the request id under <namespace>.request_id for the server scope', () => {
    expect(buildSpanAttributes({ namespace: 'app', scope: { source: 'server', requestId: 'r1' } })['app.request_id']).toBe(
      'r1'
    );
  });

  it('includes the request id under <namespace>.request_id for the edge scope', () => {
    expect(buildSpanAttributes({ namespace: 'app', scope: { source: 'edge', requestId: 'r1' } })['app.request_id']).toBe('r1');
  });

  it('includes the anonymous id under <namespace>.anonymous_id for the client scope', () => {
    expect(buildSpanAttributes({ namespace: 'app', scope: { source: 'client', anonymousId: 'a1' } })['app.anonymous_id']).toBe(
      'a1'
    );
  });

  it('omits <namespace>.request_id for the client scope', () => {
    expect(
      Object.keys(buildSpanAttributes({ namespace: 'app', scope: { source: 'client', anonymousId: 'a1' } }))
    ).not.toContain('app.request_id');
  });

  it('honors the namespace prefix on every project-scoped attribute key', () => {
    expect(
      buildSpanAttributes({ namespace: 'myproject', scope: { source: 'server', requestId: 'r1' } })['myproject.source']
    ).toBe('server');
  });

  it('includes the userId under enduser.id', () => {
    expect(buildSpanAttributes({ namespace: 'app', user: { userId: 'u1' } })['enduser.id']).toBe('u1');
  });

  it('lets the base attributes override the merged context fields', () => {
    expect(
      buildSpanAttributes({
        namespace: 'app',
        attributes: { 'app.source': 'override' },
        scope: { source: 'server', requestId: 'r1' }
      })['app.source']
    ).toBe('override');
  });
});
