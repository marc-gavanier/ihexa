import { describe, expect, it } from 'vitest';
import { resolveLocale } from './resolve-locale';

describe('i18n', () => {
  it('retrieves "en" requested language', () => {
    const acceptLanguage = 'en,nl,fr';

    const lang = resolveLocale(['en', 'fr', 'fr-CA', 'de'], 'en')(acceptLanguage);

    expect(lang).toBe('en');
  });

  it('retrieves "fr" requested language', () => {
    const acceptLanguage = 'fr,en,nl';

    const lang = resolveLocale(['en', 'fr', 'fr-CA', 'de'], 'en')(acceptLanguage);

    expect(lang).toBe('fr');
  });

  it('retrieves "en" default language', () => {
    const acceptLanguage = 'nl';

    const lang = resolveLocale(['en', 'fr', 'fr-CA', 'de'], 'en')(acceptLanguage);

    expect(lang).toBe('en');
  });

  it('retrieves "fr-CA" requested language', () => {
    const acceptLanguage = 'fr-CA';

    const lang = resolveLocale(['en', 'fr', 'fr-CA', 'de'], 'en')(acceptLanguage);

    expect(lang).toBe('fr-CA');
  });

  it('retrieves "fr" when requested language "fr-BE" is not available', () => {
    const acceptLanguage = 'fr-BE';

    const lang = resolveLocale(['en', 'fr', 'fr-CA', 'de'], 'en')(acceptLanguage);

    expect(lang).toBe('fr');
  });

  it('retrieves "fr-BE" when requested language is "fr"', () => {
    const acceptLanguage = 'fr';

    const lang = resolveLocale(['en', 'fr-BE', 'de'], 'en')(acceptLanguage);

    expect(lang).toBe('fr-BE');
  });

  it('retrieves "fr" over "de" when user prefers fr-BE then de', () => {
    const acceptLanguage = 'fr-BE,de';
    const lang = resolveLocale(['en', 'fr', 'de'], 'en')(acceptLanguage);
    expect(lang).toBe('fr');
  });

  it('retrieves "en" when acceptLanguage is empty', () => {
    const acceptLanguage = '';
    const lang = resolveLocale(['en', 'fr', 'de'], 'en')(acceptLanguage);
    expect(lang).toBe('en');
  });

  it('retrieves "fr-CA" over "fr-BE" when user prefers fr-CA', () => {
    const acceptLanguage = 'fr-CA';
    const lang = resolveLocale(['en', 'fr-BE', 'fr-CA'], 'en')(acceptLanguage);
    expect(lang).toBe('fr-CA');
  });

  it('retrieves base language when requesting region not available among multiple regions', () => {
    const acceptLanguage = 'fr-CH';
    const lang = resolveLocale(['en', 'fr', 'fr-BE', 'fr-CA'], 'en')(acceptLanguage);
    expect(lang).toBe('fr');
  });

  it('retrieves "en" when no match found even with fallback', () => {
    const acceptLanguage = 'zh,ja,ko';
    const lang = resolveLocale(['en', 'fr', 'de'], 'en')(acceptLanguage);
    expect(lang).toBe('en');
  });
});
