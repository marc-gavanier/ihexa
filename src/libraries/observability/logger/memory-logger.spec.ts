import { describe, expect, it } from 'vitest';
import { memoryLogger } from './memory-logger';

describe('memoryLogger', () => {
  it('starts with an empty entries list', () => {
    expect(memoryLogger().entries).toEqual([]);
  });

  it('records every entry passed to log', () => {
    const logger = memoryLogger();

    logger.log({ level: 'info', event: 'a' });
    logger.log({ level: 'warn', event: 'b', attributes: { x: 1 } });

    expect(logger.entries).toEqual([
      { level: 'info', event: 'a' },
      { level: 'warn', event: 'b', attributes: { x: 1 } }
    ]);
  });
});
