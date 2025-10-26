type Language = {
  lang: string;
  locales: string[];
  hasLangOnly: boolean;
};

type SplitLangTag = {
  lang: string;
  locale: string | undefined;
};

const fromLangTag = (tag: string): SplitLangTag => {
  const [lang = '', locale] = tag.split('-');
  return { lang, locale };
};

const toLangTag = (lang: string, locale?: string): string => (locale ? `${lang}-${locale}` : lang);

const createLanguage = (lang: string, locale?: string): Language => ({
  lang,
  locales: locale ? [locale] : [],
  hasLangOnly: !locale
});

const addLocaleToLanguage = (lang: Language, locale?: string): Language => ({
  ...lang,
  locales: locale && !lang.locales.includes(locale) ? [...lang.locales, locale] : lang.locales,
  hasLangOnly: lang.hasLangOnly || !locale
});

const insertLanguage = (existing: Language | undefined, split: SplitLangTag): Language =>
  existing ? addLocaleToLanguage(existing, split.locale) : createLanguage(split.lang, split.locale);

const updateMap = (map: Map<string, Language>, split: SplitLangTag): Map<string, Language> =>
  split.lang ? map.set(split.lang, insertLanguage(map.get(split.lang), split)) : map;

const groupByLang = (langTags: string[]): Language[] =>
  Array.from(
    langTags
      .reduce(
        (map: Map<string, Language>, langTag: string): Map<string, Language> => updateMap(map, fromLangTag(langTag)),
        new Map<string, Language>()
      )
      .values()
  );

const findMatchingLocale = (user: string[], available: string[]): string | undefined =>
  available.find((locale) => user.includes(locale));

const selectBestLocale = (user: Language, available: Language): string | undefined =>
  findMatchingLocale(user.locales, available.locales) ?? (available.hasLangOnly ? undefined : available.locales[0]);

const toLangSet = (langs: Language[]) => new Set(langs.map((language: Language): string => language.lang));

const findUserLangMatching = (userLangs: string[], availableCodes: Set<string>): Language | undefined =>
  groupByLang(userLangs).find((l) => availableCodes.has(l.lang));

const findAvailableByCode = (langs: Language[], code: string): Language | undefined => langs.find((l) => l.lang === code);

const matchingLang = (available: Language, user: Language): string =>
  toLangTag(available.lang, selectBestLocale(user, available));

export const bestMatchingLang =
  (availableLanguages: string[], defaultLanguage: string) =>
  (acceptLanguage: string | null): string => {
    const userLanguages: string[] = acceptLanguage
      ? acceptLanguage
          .split(',')
          .map((lang) => lang.split(';')[0]?.trim() ?? '')
          .filter((lang) => (lang?.length ?? 0) > 0)
      : [];

    const availableLangs: Language[] = groupByLang(availableLanguages);
    const matchingUser: Language | undefined = findUserLangMatching(userLanguages, toLangSet(availableLangs));

    if (!matchingUser) return defaultLanguage;

    const matchingAvailable: Language | undefined = findAvailableByCode(availableLangs, matchingUser.lang);

    return matchingAvailable ? matchingLang(matchingAvailable, matchingUser) : defaultLanguage;
  };
