import { describe, expect, it } from 'vitest';
import { isFilledStreet } from './street';

describe('Street', () => {
  it.each(['', ' '])('rejects empty value "%s"', (street) => {
    expect(isFilledStreet(street)).toBe(false);
  });
});
