import type { LogEntry, Logger } from './logger.type';

export type MemoryLogger = Logger & {
  readonly entries: ReadonlyArray<LogEntry>;
};

export const memoryLogger = (): MemoryLogger => {
  const entries: LogEntry[] = [];

  return {
    entries,
    log: (entry: LogEntry): void => {
      entries.push(entry);
    }
  };
};
