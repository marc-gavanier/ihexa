import type { Authenticated, ObservabilityScope } from '../context';
import type { SpanAttributes } from './tracer.type';

type BuildSpanAttributesInput = {
  readonly attributes?: SpanAttributes | undefined;
  readonly scope?: ObservabilityScope | undefined;
  readonly user?: Authenticated | undefined;
};

const scopeAttributes = (scope: ObservabilityScope | undefined): Readonly<Record<string, string>> => {
  if (!scope) return {};
  if (scope.source === 'client') return { 'ihexa.source': 'client', 'ihexa.anonymous_id': scope.anonymousId };
  return { 'ihexa.source': scope.source, 'ihexa.request_id': scope.requestId };
};

const userAttributes = (user: Authenticated | undefined): Readonly<Record<string, string>> =>
  user ? { 'enduser.id': user.userId } : {};

export const buildSpanAttributes = ({ attributes, scope, user }: BuildSpanAttributesInput): SpanAttributes => ({
  ...scopeAttributes(scope),
  ...userAttributes(user),
  ...attributes
});
