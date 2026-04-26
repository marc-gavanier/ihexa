import type { I18nConfig } from '@arckit/i18n';
import { createI18n } from '@arckit/i18n';
import { fromCookie, fromHeader } from '@arckit/i18n/detectors';
import { createMetadataTranslation, createWithI18n, createWithLang } from '@arckit/nextjs/i18n';
import { inject, provide } from '@/configuration/injection';
import { I18nProvider } from './client';

const supportedLngs = ['fr-FR', 'en-US'];

export const i18n: I18nConfig = {
  detectors: [fromCookie({ cookieName: 'locale', supportedLngs }), fromHeader({ supportedLngs })],
  fallbackLng: 'en-US',
  supportedLngs
};

export const { withTranslation } = createI18n({ inject });
export const withI18n = createWithI18n(inject, provide, I18nProvider);
export const withLang = createWithLang();
export const metadataTranslation = createMetadataTranslation(inject);
export type { MetadataTranslation } from '@arckit/nextjs/i18n';
