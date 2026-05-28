type ServerScope = {
  readonly source: 'server';
  readonly requestId: string;
};

type EdgeScope = {
  readonly source: 'edge';
  readonly requestId: string;
};

type ClientScope = {
  readonly source: 'client';
  readonly anonymousId: string;
};

export type ObservabilityScope = ServerScope | EdgeScope | ClientScope;

export type ObservabilitySource = ObservabilityScope['source'];

export type Authenticated = { readonly userId: string };

export type Traced = {
  readonly traceId: string;
  readonly spanId: string;
};

export type ContextGetters = {
  readonly getScope?: () => ObservabilityScope | undefined;
  readonly getUser?: () => Authenticated | undefined;
  readonly getTrace?: () => Traced | undefined;
};
