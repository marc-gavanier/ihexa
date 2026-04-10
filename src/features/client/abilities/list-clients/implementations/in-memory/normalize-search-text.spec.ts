import { describe, expect, it } from 'vitest';
import { normalizeSearchText } from './normalize-search-text';

describe('normalizeSearchText', () => {
  it.each([
    ['Paris', 'paris'],
    ['DUPONT', 'dupont']
  ])('should lowercase "%s" to "%s"', (input, expected) => {
    expect(normalizeSearchText(input)).toBe(expected);
  });

  it.each([
    ['éléphant', 'elephant'],
    ['François', 'francois'],
    ['Château', 'chateau'],
    ['naïve', 'naive'],
    ['Zürich', 'zurich']
  ])('should remove accents from "%s" to "%s"', (input, expected) => {
    expect(normalizeSearchText(input)).toBe(expected);
  });

  it.each([
    ['isabelle', 'isabele'],
    ['jeanne', 'jeane'],
    ['brasserie', 'braserie'],
    ['aabbcc', 'abc']
  ])('should remove consecutive duplicates from "%s" to "%s"', (input, expected) => {
    expect(normalizeSearchText(input)).toBe(expected);
  });

  it.each([
    ['Éléonore', 'eleonore'],
    ['Bézières', 'bezieres'],
    ['Hélène', 'helene']
  ])('should normalize accents and duplicates from "%s" to "%s"', (input, expected) => {
    expect(normalizeSearchText(input)).toBe(expected);
  });
});
