import { fromCookie, fromHeader, type I18nConfig } from '@/libraries/i18n';

const supportedLngs = ['fr-FR', 'en-US'];

export const i18n: I18nConfig = {
  detectors: [fromCookie({ cookieName: 'locale', supportedLngs }), fromHeader({ supportedLngs })],
  fallbackLng: 'en-US',
  supportedLngs
};
