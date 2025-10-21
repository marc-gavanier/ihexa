import { init } from 'i18next';
import { bestMatchingLang } from './best-matching-lang';
import { baseUrlFromHeaders, toI18nConfig, translationUrl } from './load-i18n';

export const INVOICES_FEATURE = 'invoices' as const;

export const AVAILABLE_LANGUAGES = ['en-US'];
export const DEFAULT_LANGUAGE = 'en-US' as const;

export const loadI18n =
  (headersPromise: Promise<Headers>) => async (ns: string) => {
    const headers = await headersPromise;

    const lng = bestMatchingLang(
      AVAILABLE_LANGUAGES,
      DEFAULT_LANGUAGE,
    )(headers.get('accept-language'));
    const scope = { lng, ns };

    await fetch(translationUrl(`${baseUrlFromHeaders(headers)}/locales`)(scope))
      .then((res) => res.json())
      .then((translations) => init(toI18nConfig(scope)(translations)));
  };
