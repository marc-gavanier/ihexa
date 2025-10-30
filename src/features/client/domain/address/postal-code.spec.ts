import { describe, expect, it } from 'vitest';
import { isFilledPostalCode } from './postal-code';

describe('Postal code', () => {
  it.each(['', ' '])('rejects empty value "%s"', (postalCode) => {
    expect(isFilledPostalCode(postalCode)).toBe(false);
  });
});
