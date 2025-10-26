import { runPromise } from 'effect/Effect';
import { describe, expect, it } from 'vitest';
import { Amount, amountFromDecimal } from './amount';

describe('amount domain model', () => {
  it.each([
    { decimal: 1.23456, cents: 123 },
    { decimal: 1.23556, cents: 124 },
    { decimal: 1.23, cents: 123 }
  ])('converts decimal $decimal to amount $cents in cents correctly', async ({ decimal, cents }) => {
    expect(await runPromise(amountFromDecimal(decimal))).toBe(await runPromise(Amount(cents)));
  });
});
