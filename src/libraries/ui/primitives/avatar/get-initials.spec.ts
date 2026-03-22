import { describe, expect, it } from 'vitest';
import { getInitials } from './get-initials';

describe('getInitials', () => {
  it.each([
    ['John Doe', 'JD'],
    ['Alice Bob Charlie', 'AB'],
    ['Marc', 'M'],
    ['jean-pierre dupont', 'JD'],
    ['UPPERCASE NAME', 'UN'],
    ['lowercase name', 'LN'],
    ['  spaced   name  ', 'S'],
    ['', ''],
    ['Single', 'S'],
    ['A B C D E', 'AB'],
    ['Émile Zola', 'ÉZ'],
    ['日本 語', '日語']
  ])('should return "%s" initials as "%s"', (input, expected) => {
    const result = getInitials(input);

    expect(result).toBe(expected);
  });
});
