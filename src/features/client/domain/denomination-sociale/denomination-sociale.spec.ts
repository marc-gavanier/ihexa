import { describe, expect, it } from 'vitest';
import { DENOMINATION_SOCIALE_MAX_LENGTH, DenominationSociale } from './denomination-sociale';

describe('DenominationSociale validation', () => {
  it('should accept a valid denomination sociale', () => {
    expect(() => DenominationSociale('ACME SARL')).not.toThrow();
  });

  it('should reject empty string', () => {
    expect(() => DenominationSociale('')).toThrow();
  });

  it('should reject blank string', () => {
    expect(() => DenominationSociale('   ')).toThrow();
  });

  it('should reject string exceeding max length', () => {
    expect(() => DenominationSociale('A'.repeat(DENOMINATION_SOCIALE_MAX_LENGTH + 1))).toThrow();
  });

  it('should accept string at max length', () => {
    expect(() => DenominationSociale('A'.repeat(DENOMINATION_SOCIALE_MAX_LENGTH))).not.toThrow();
  });

  it('should trim whitespace', () => {
    expect(DenominationSociale('  ACME  ')).toBe('ACME');
  });
});
