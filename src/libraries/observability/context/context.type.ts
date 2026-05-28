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

type Anonymous = {
  readonly kind: 'anonymous';
  readonly anonymousId: string;
};

type Identified = {
  readonly kind: 'identified';
  readonly anonymousId: string;
  readonly userId: string;
};

export type Identity = Anonymous | Identified;

export type Traced = {
  readonly traceId: string;
  readonly spanId: string;
};

export type ContextGetters = {
  readonly getScope?: () => ObservabilityScope | undefined;
  readonly getIdentity?: () => Identity | undefined;
  readonly getTrace?: () => Traced | undefined;
};
