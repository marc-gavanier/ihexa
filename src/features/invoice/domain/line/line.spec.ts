import { describe, expect, it } from 'vitest';
import { amountOf, Line } from './line';

describe('amountOf', () => {
  it.each([
    [1.23456, 1.23],
    [1.23566, 1.24],
    [1.23, 1.23]
  ])('should round %s to %s', (input, expected) => {
    const line = Line({ label: 'Test', quantity: 1, amount: input });

    expect(amountOf(line)).toBe(expected);
  });
});
