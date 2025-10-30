import { describe, expect, it } from 'vitest';
import { formatFirstName, isFilledFirstName } from './first-name';

describe('First name', () => {
  it.each([
    { firstName: 'johN', capitalized: 'John' },
    { firstName: 'jeaN-lUc', capitalized: 'Jean-Luc' },
    { firstName: 'jean clément', capitalized: 'Jean Clément' },
    { firstName: 'j', capitalized: 'J' }
  ])('has capitalized $firstName when formatted', ({ firstName, capitalized }) => {
    expect(formatFirstName(firstName)).toBe(capitalized);
  });

  it.each(['', ' '])('rejects empty value "%s"', (firstName) => {
    expect(isFilledFirstName(firstName)).toBe(false);
  });
});
