import { describe, expect, it } from 'vitest';
import { amountOf, Line, lineTotal, totalOfAll } from './line';

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

describe('lineTotal', () => {
  it('should calculate total for a single item', () => {
    const line = Line({ label: 'Product', quantity: 1, amount: 10.5 });

    expect(lineTotal(line)).toBe(10.5);
  });

  it('should calculate total for multiple items', () => {
    const line = Line({ label: 'Product', quantity: 3, amount: 10.5 });

    expect(lineTotal(line)).toBe(31.5);
  });
});

describe('totalOfAll', () => {
  it('should return 0 for empty lines', () => {
    expect(totalOfAll([])).toBe(0);
  });

  it('should calculate total for single line', () => {
    const lines = [Line({ label: 'Product', quantity: 2, amount: 10 })];

    expect(totalOfAll(lines)).toBe(20);
  });

  it('should calculate total for multiple lines', () => {
    const lines = [
      Line({ label: 'Product A', quantity: 2, amount: 10 }),
      Line({ label: 'Product B', quantity: 3, amount: 5.5 })
    ];

    expect(totalOfAll(lines)).toBe(36.5);
  });
});
