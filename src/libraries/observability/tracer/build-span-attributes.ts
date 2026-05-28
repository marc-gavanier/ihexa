import type { Authenticated, ObservabilityScope } from '../context';
import type { SpanAttributes } from './tracer.type';

type BuildSpanAttributesInput = {
  readonly namespace: string;
  readonly attributes?: SpanAttributes | undefined;
  readonly scope?: ObservabilityScope | undefined;
  readonly user?: Authenticated | undefined;
};

const scopeAttributes = (namespace: string, scope: ObservabilityScope | undefined): Readonly<Record<string, string>> => {
  if (!scope) return {};
  if (scope.source === 'client') return { [`${namespace}.source`]: 'client', [`${namespace}.anonymous_id`]: scope.anonymousId };
  return { [`${namespace}.source`]: scope.source, [`${namespace}.request_id`]: scope.requestId };
};

const userAttributes = (user: Authenticated | undefined): Readonly<Record<string, string>> =>
  user ? { 'enduser.id': user.userId } : {};

export const buildSpanAttributes = ({ namespace, attributes, scope, user }: BuildSpanAttributesInput): SpanAttributes => ({
  ...scopeAttributes(namespace, scope),
  ...userAttributes(user),
  ...attributes
});
