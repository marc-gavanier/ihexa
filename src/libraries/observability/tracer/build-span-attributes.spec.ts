import { describe, expect, it } from 'vitest';
import { buildSpanAttributes } from './build-span-attributes';

describe('buildSpanAttributes', () => {
  it('returns an empty object when no input is provided', () => {
    expect(buildSpanAttributes({})).toEqual({});
  });

  it('inlines the provided base attributes', () => {
    expect(buildSpanAttributes({ attributes: { 'order.id': 'o1' } })['order.id']).toBe('o1');
  });

  it('includes the scope source under ihexa.source', () => {
    expect(buildSpanAttributes({ scope: { source: 'server', requestId: 'r1' } })['ihexa.source']).toBe('server');
  });

  it('includes the request id under ihexa.request_id for the server scope', () => {
    expect(buildSpanAttributes({ scope: { source: 'server', requestId: 'r1' } })['ihexa.request_id']).toBe('r1');
  });

  it('includes the request id under ihexa.request_id for the edge scope', () => {
    expect(buildSpanAttributes({ scope: { source: 'edge', requestId: 'r1' } })['ihexa.request_id']).toBe('r1');
  });

  it('includes the anonymous id under ihexa.anonymous_id for the client scope', () => {
    expect(buildSpanAttributes({ scope: { source: 'client', anonymousId: 'a1' } })['ihexa.anonymous_id']).toBe('a1');
  });

  it('omits ihexa.request_id for the client scope', () => {
    expect(Object.keys(buildSpanAttributes({ scope: { source: 'client', anonymousId: 'a1' } }))).not.toContain(
      'ihexa.request_id'
    );
  });

  it('includes the userId under enduser.id', () => {
    expect(buildSpanAttributes({ user: { userId: 'u1' } })['enduser.id']).toBe('u1');
  });

  it('lets the base attributes override the merged context fields', () => {
    expect(
      buildSpanAttributes({
        attributes: { 'ihexa.source': 'override' },
        scope: { source: 'server', requestId: 'r1' }
      })['ihexa.source']
    ).toBe('override');
  });
});
