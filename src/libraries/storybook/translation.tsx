import i18next from 'i18next';
import type { ComponentType } from 'react';
import { TRANSLATION, type TranslationProps } from '@/libraries/i18n';
import type { Namespace } from '@/libraries/i18n/types';
import { provide } from '@/libraries/injection';

export const translation = <N extends Namespace>(
  lng: string,
  resources: Record<N, Record<string, unknown>>
): TranslationProps['t'] => {
  const namespaces = Object.keys(resources) as N[];
  const i18n = i18next.createInstance();
  i18n.init({
    lng,
    resources: {
      [lng]: resources
    },
    defaultNS: namespaces[0]
  });
  return i18n.getFixedT(lng, namespaces);
};

export const withI18nProvider =
  <N extends Namespace>(lng: string, resources: Record<N, Record<string, unknown>>) =>
  (Story: ComponentType) => {
    provide(TRANSLATION, translation(lng, resources));
    return <Story />;
  };
