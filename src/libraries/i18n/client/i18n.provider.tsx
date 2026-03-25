'use client';

import i18next, { type Resource } from 'i18next';
import { type ReactNode, useMemo } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

type I18nProviderProps = {
  locale: string;
  namespaces: string[];
  resources: Resource;
  children: ReactNode;
};

export const I18nProvider = ({ locale, namespaces, resources, children }: I18nProviderProps): ReactNode => {
  const i18nInstance = useMemo(() => {
    const instance = i18next.createInstance();
    instance.use(initReactI18next).init({
      lng: locale,
      ns: namespaces,
      defaultNS: namespaces[0],
      resources,
      keySeparator: '.',
      interpolation: { escapeValue: false }
    });
    return instance;
  }, [locale, namespaces, resources]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
};
