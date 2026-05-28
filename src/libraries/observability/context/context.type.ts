export type EnrichableFields = {
  readonly userId?: string;
  readonly traceId?: string;
  readonly spanId?: string;
};

type ServerContext = EnrichableFields & {
  readonly source: 'server';
  readonly requestId: string;
};

type EdgeContext = EnrichableFields & {
  readonly source: 'edge';
  readonly requestId: string;
};

type ClientContext = EnrichableFields & {
  readonly source: 'client';
  readonly anonymousId: string;
};

export type ObservabilityContext = ServerContext | EdgeContext | ClientContext;

export type ObservabilitySource = ObservabilityContext['source'];
