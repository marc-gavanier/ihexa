import type { Identity, ObservabilityScope } from '../context';
import type { SpanAttributes } from './tracer.type';

type BuildSpanAttributesInput = {
  readonly namespace: string;
  readonly attributes?: SpanAttributes | undefined;
  readonly scope?: ObservabilityScope | undefined;
  readonly identity?: Identity | undefined;
};

const scopeAttributes = (namespace: string, scope: ObservabilityScope | undefined): Readonly<Record<string, string>> => {
  if (!scope) return {};
  if (scope.source === 'client') return { [`${namespace}.source`]: 'client', [`${namespace}.anonymous_id`]: scope.anonymousId };
  return { [`${namespace}.source`]: scope.source, [`${namespace}.request_id`]: scope.requestId };
};

const identityAttributes = (identity: Identity | undefined): Readonly<Record<string, string>> => {
  if (!identity) return {};
  if (identity.kind === 'identified') return { 'enduser.id': identity.userId, 'enduser.anonymous_id': identity.anonymousId };
  return { 'enduser.anonymous_id': identity.anonymousId };
};

export const buildSpanAttributes = ({ namespace, attributes, scope, identity }: BuildSpanAttributesInput): SpanAttributes => ({
  ...scopeAttributes(namespace, scope),
  ...identityAttributes(identity),
  ...attributes
});
