import { describe, expect, it } from 'vitest';
import { computeTvaIntracommunautaire, TvaIntracommunautaire } from './tva-intracommunautaire';

describe('TvaIntracommunautaire validation', () => {
  it('should accept valid TVA format', () => {
    expect(() => TvaIntracommunautaire('FR40443061841')).not.toThrow();
  });

  it('should reject without FR prefix', () => {
    expect(() => TvaIntracommunautaire('40443061841')).toThrow();
  });

  it('should reject with wrong prefix', () => {
    expect(() => TvaIntracommunautaire('DE40443061841')).toThrow();
  });

  it('should reject empty string', () => {
    expect(() => TvaIntracommunautaire('')).toThrow();
  });

  it('should reject non-digit after prefix', () => {
    expect(() => TvaIntracommunautaire('FRAB443061841')).toThrow();
  });
});

describe('computeTvaIntracommunautaire', () => {
  it.each([
    { siret: '44306184100047', expected: 'FR64443061841' },
    { siret: '80295478500028', expected: 'FR26802954785' },
    { siret: '01234567800013', expected: 'FR21012345678' }
  ])('should compute $expected from SIRET $siret', ({ siret, expected }) => {
    expect(computeTvaIntracommunautaire(siret)).toBe(expected);
  });

  it('should preserve leading zeros in SIREN', () => {
    const tva = computeTvaIntracommunautaire('01234567800013');
    expect(tva).toMatch(/^FR\d{11}$/);
  });
});
