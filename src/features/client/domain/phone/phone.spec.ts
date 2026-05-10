import { describe, expect, it } from 'vitest';
import { Phone } from './phone';

describe('Phone validation', () => {
  it('should accept E.164 format with +33', () => {
    expect(() => Phone('+33612345678')).not.toThrow();
  });

  it('should accept international format', () => {
    expect(() => Phone('+262692123456')).not.toThrow();
  });

  it('should accept minimum 9 digits after +', () => {
    expect(() => Phone('+123456789')).not.toThrow();
  });

  it('should accept maximum 15 digits after +', () => {
    expect(() => Phone('+123456789012345')).not.toThrow();
  });

  it('should reject without + prefix', () => {
    expect(() => Phone('33612345678')).toThrow();
  });

  it('should reject national format (0 prefix)', () => {
    expect(() => Phone('0612345678')).toThrow();
  });

  it('should reject too few digits', () => {
    expect(() => Phone('+12345678')).toThrow();
  });

  it('should reject too many digits', () => {
    expect(() => Phone('+1234567890123456')).toThrow();
  });

  it('should reject empty string', () => {
    expect(() => Phone('')).toThrow();
  });

  it('should trim whitespace', () => {
    expect(() => Phone('  +33612345678  ')).not.toThrow();
  });
});
