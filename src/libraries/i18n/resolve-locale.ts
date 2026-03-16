const LOCALE_SEPARATOR = ',';
const QUALITY_SEPARATOR = ';';
const REGION_SEPARATOR = '-';

const extractLocale = (lang: string): string | undefined => lang.split(QUALITY_SEPARATOR)[0]?.trim();

const isNonEmpty = (lang?: string): lang is string => lang != null && lang.length > 0;

const baseLocale = (locale: string): string => locale.split(REGION_SEPARATOR)[0] ?? '';

const hasSameBaseLocale = (locale: string) => (supported: string) => baseLocale(supported) === baseLocale(locale);

const findExactMatch = (supportedLocales: string[]) => (locale: string) => (supportedLocales.includes(locale) ? locale : null);

const findBaseMatch = (supportedLocales: string[]) => (locale: string) =>
  supportedLocales.find(hasSameBaseLocale(locale)) ?? null;

const findBestMatch = (supportedLocales: string[]) => (locale: string) =>
  findExactMatch(supportedLocales)(locale) ?? findBaseMatch(supportedLocales)(locale);

const findMatchingLocale = (supportedLocales: string[]) => (selectedLocale: string | null, locale: string) =>
  selectedLocale ?? findBestMatch(supportedLocales)(locale);

export const resolveLocale =
  (supportedLocales: string[], defaultLocale: string) =>
  (acceptLanguage?: string): string =>
    (acceptLanguage ?? '')
      .split(LOCALE_SEPARATOR)
      .map(extractLocale)
      .filter(isNonEmpty)
      .reduce(findMatchingLocale(supportedLocales), null) ?? defaultLocale;
