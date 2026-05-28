export type ObservabilitySource = 'client' | 'server' | 'edge';

export type ObservabilityContext = {
  readonly traceId?: string;
  readonly spanId?: string;
  readonly requestId?: string;
  readonly userId?: string;
  readonly anonymousId?: string;
  readonly source?: ObservabilitySource;
};
