import type { LngDetector } from './types';

type FromHeaderOptions = {
  supportedLngs: string[];
};

const findMatch = (lang: string | undefined, supportedLngs: string[]): string | null => {
  const exactMatch = supportedLngs.find((supported) => supported === lang);
  if (exactMatch) return exactMatch;

  const partialMatch = supportedLngs.find(
    (supported) => supported.startsWith(`${lang}-`) || lang?.startsWith(`${supported.split('-')[0]}-`)
  );
  return partialMatch ?? null;
};

export const fromHeader =
  ({ supportedLngs }: FromHeaderOptions): LngDetector =>
  (request) => {
    const acceptLanguage = request.headers.get('Accept-Language');
    if (!acceptLanguage) return null;

    const languages = acceptLanguage
      .split(',')
      .map((part) => {
        const [lang, q] = part.trim().split(';q=');
        return { lang: lang, quality: q ? Number.parseFloat(q) : 1 };
      })
      .sort((a, b) => b.quality - a.quality)
      .map(({ lang }) => lang);

    for (const lang of languages) {
      const match = findMatch(lang, supportedLngs);
      if (match) return match;
    }

    return null;
  };
