export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogSource = 'client' | 'server';

export type LogEntry = {
  level: LogLevel;
  event: string;
  source?: LogSource;
  payload?: Record<string, unknown>;
  error?: Error;
};

export type Logger = {
  log: (entry: LogEntry) => void;
};
