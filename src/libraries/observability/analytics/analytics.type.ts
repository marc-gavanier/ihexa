export type AnalyticsEvent = {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
};

export type Analytics = {
  track: (event: AnalyticsEvent) => void;
};
