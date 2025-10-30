import { describe, expect, it } from 'vitest';
import { isFilledCity } from './city';

describe('City', () => {
  it.each(['', ' '])('rejects empty value "%s"', (city) => {
    expect(isFilledCity(city)).toBe(false);
  });
});
