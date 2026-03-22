import type { LngDetector } from './types';

type FromHeaderOptions = {
  supportedLngs: string[];
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
        return { lang: lang!, quality: q ? Number.parseFloat(q) : 1 };
      })
      .sort((a, b) => b.quality - a.quality)
      .map(({ lang }) => lang);

    for (const lang of languages) {
      const match = supportedLngs.find(
        (supported) => supported === lang || supported.startsWith(`${lang}-`) || lang.startsWith(`${supported}-`)
      );
      if (match) return match;
    }

    return null;
  };
