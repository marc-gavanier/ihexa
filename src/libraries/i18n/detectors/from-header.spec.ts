import { describe, expect, it } from 'vitest';
import { fromHeader } from './from-header';

const createRequest = (acceptLanguage: string) =>
  new Request('http://localhost', {
    headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {}
  });

describe('fromHeader', () => {
  it('retrieves "en" requested language', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'fr-CA', 'de'] });

    const lang = detect(createRequest('en,nl,fr'));

    expect(lang).toBe('en');
  });

  it('retrieves "fr" requested language', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'fr-CA', 'de'] });

    const lang = detect(createRequest('fr,en,nl'));

    expect(lang).toBe('fr');
  });

  it('retrieves null when no match found', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'fr-CA', 'de'] });

    const lang = detect(createRequest('nl'));

    expect(lang).toBeNull();
  });

  it('retrieves "fr-CA" requested language', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'fr-CA', 'de'] });

    const lang = detect(createRequest('fr-CA'));

    expect(lang).toBe('fr-CA');
  });

  it('retrieves "fr" when requested language "fr-BE" is not available', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'fr-CA', 'de'] });

    const lang = detect(createRequest('fr-BE'));

    expect(lang).toBe('fr');
  });

  it('retrieves "fr-BE" when requested language is "fr"', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr-BE', 'de'] });

    const lang = detect(createRequest('fr'));

    expect(lang).toBe('fr-BE');
  });

  it('retrieves "fr" over "de" when user prefers fr-BE then de', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'de'] });

    const lang = detect(createRequest('fr-BE,de'));

    expect(lang).toBe('fr');
  });

  it('retrieves null when acceptLanguage is empty', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'de'] });

    const lang = detect(createRequest(''));

    expect(lang).toBeNull();
  });

  it('retrieves "fr-CA" over "fr-BE" when user prefers fr-CA', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr-BE', 'fr-CA'] });

    const lang = detect(createRequest('fr-CA'));

    expect(lang).toBe('fr-CA');
  });

  it('retrieves base language when requesting region not available among multiple regions', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'fr-BE', 'fr-CA'] });

    const lang = detect(createRequest('fr-CH'));

    expect(lang).toBe('fr');
  });

  it('retrieves null when no match found even with multiple languages', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'de'] });

    const lang = detect(createRequest('zh,ja,ko'));

    expect(lang).toBeNull();
  });

  it('respects quality values in Accept-Language header', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'de'] });

    const lang = detect(createRequest('de;q=0.5,fr;q=0.9,en;q=0.1'));

    expect(lang).toBe('fr');
  });

  it('retrieves null when Accept-Language header is missing', () => {
    const detect = fromHeader({ supportedLngs: ['en', 'fr', 'de'] });
    const request = new Request('http://localhost');

    const lang = detect(request);

    expect(lang).toBeNull();
  });
});
