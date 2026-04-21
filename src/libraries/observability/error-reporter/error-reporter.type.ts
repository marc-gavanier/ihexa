export type ErrorReport = {
  error: Error;
  context?: Record<string, unknown>;
  source?: 'client' | 'server';
};

export type ErrorReporter = {
  capture: (report: ErrorReport) => void;
};
