import { describe, expect, it } from 'vitest';
import { formatLastName, isFilledLastName } from './last-name';

describe('Last name', () => {
  it.each([
    { lastName: 'doe', uppercase: 'DOE' },
    { lastName: 'doé', uppercase: 'DOÉ' },
    { lastName: 'd', uppercase: 'D' },
    { lastName: 'D', uppercase: 'D' }
  ])('has uppercase $lastName when formatted', ({ lastName, uppercase }) => {
    expect(formatLastName(lastName)).toBe(uppercase);
  });

  it.each(['', ' '])('rejects empty value "%s"', (lastName) => {
    expect(isFilledLastName(lastName)).toBe(false);
  });
});
