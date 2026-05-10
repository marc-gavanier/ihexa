import { Schema } from 'effect';
import { describe, expect, it } from 'vitest';
import { FORMES_JURIDIQUES, FormeJuridique } from './forme-juridique';

describe('FormeJuridique validation', () => {
  it.each(FORMES_JURIDIQUES.map((fj) => ({ fj })))('should accept $fj', ({ fj }) => {
    expect(Schema.decodeUnknownSync(FormeJuridique)(fj)).toBe(fj);
  });

  it('should reject invalid value', () => {
    expect(() => Schema.decodeUnknownSync(FormeJuridique)('INVALID')).toThrow();
  });

  it('should reject empty string', () => {
    expect(() => Schema.decodeUnknownSync(FormeJuridique)('')).toThrow();
  });
});
