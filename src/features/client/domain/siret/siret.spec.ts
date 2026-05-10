import { describe, expect, it } from 'vitest';
import { Siret } from './siret';

describe('Siret validation', () => {
  it('should accept exactly 14 digits', () => {
    expect(() => Siret('44306184100047')).not.toThrow();
  });

  it('should reject fewer than 14 digits', () => {
    expect(() => Siret('1234')).toThrow();
  });

  it('should reject more than 14 digits', () => {
    expect(() => Siret('443061841000470')).toThrow();
  });

  it('should reject non-digit characters', () => {
    expect(() => Siret('4430618410004A')).toThrow();
  });

  it('should reject empty string', () => {
    expect(() => Siret('')).toThrow();
  });

  it('should trim whitespace', () => {
    expect(() => Siret('  44306184100047  ')).not.toThrow();
  });
});
