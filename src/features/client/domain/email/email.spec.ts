import { describe, expect, it } from 'vitest';
import { Email } from './email';

describe('Email validation', () => {
  it('should accept a valid email', () => {
    expect(() => Email('contact@example.com')).not.toThrow();
  });

  it('should lowercase the email', () => {
    expect(Email('Contact@EXAMPLE.COM')).toBe('contact@example.com');
  });

  it('should trim whitespace', () => {
    expect(Email('  contact@example.com  ')).toBe('contact@example.com');
  });

  it('should accept email with special characters', () => {
    expect(() => Email('user.name+tag@example.co.uk')).not.toThrow();
  });

  it('should reject email without @', () => {
    expect(() => Email('notanemail')).toThrow();
  });

  it('should reject email without domain', () => {
    expect(() => Email('user@')).toThrow();
  });

  it('should reject email without local part', () => {
    expect(() => Email('@example.com')).toThrow();
  });

  it('should reject empty string', () => {
    expect(() => Email('')).toThrow();
  });
});
