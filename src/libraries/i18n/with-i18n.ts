import i18next, { type i18n, type Resource } from 'i18next';
import { headers } from 'next/headers';
import { cache } from 'react';
import { inject, provide } from '@/libraries/injection';
import type { Provider } from '@/libraries/nextjs/shared/types';
import { I18nProvider } from './client';
import { detectLng } from './detect-lng';
import { RESOURCE_LOADER } from './resource-loader';
import { TRANSLATION } from './translation';
import type { I18nConfig, Namespace, TypedTFunction } from './types';

type I18nInstance = {
  i18n: i18n;
  namespaces: Namespace[];
  resources: Resource;
};

const getI18nInstance = cache((): { current: I18nInstance | null } => ({ current: null }));

const mergeResources = (a: Resource, b: Resource): Resource => {
  const lng = Object.keys(b)[0] ?? Object.keys(a)[0];
  if (!lng) return {};
  return { [lng]: { ...a[lng], ...b[lng] } };
};

export const setI18nInstance = async (instance: I18nInstance): Promise<void> => {
  const existing = getI18nInstance().current;

  if (!existing) {
    getI18nInstance().current = instance;
    const { i18n: i18nInst, namespaces } = instance;
    provide(TRANSLATION, i18nInst.getFixedT(i18nInst.language, namespaces) as TypedTFunction<Namespace[]>);
    return;
  }

  const lng = instance.i18n.language;
  const namespaces = [...new Set([...existing.namespaces, ...instance.namespaces])];
  const resources = mergeResources(existing.resources, instance.resources);

  const merged = i18next.createInstance();
  await merged.init({
    lng,
    ns: namespaces,
    defaultNS: namespaces[0],
    resources
  });

  getI18nInstance().current = { i18n: merged, namespaces, resources };
  provide(TRANSLATION, merged.getFixedT(lng, namespaces) as TypedTFunction<Namespace[]>);
};

const buildRequest = async (): Promise<Request> => {
  const headersList = await headers();
  const headersInit: HeadersInit = {};
  headersList.forEach((value, key) => {
    headersInit[key] = value;
  });
  return new Request('http://localhost', { headers: headersInit });
};

export const getLang = async (config: I18nConfig): Promise<string> => detectLng(await buildRequest(), config);

export const withLang =
  (config: I18nConfig) =>
  async <TContext extends object>(_ctx: TContext): Promise<{ ctx: { lang: string } }> => ({
    ctx: { lang: await getLang(config) }
  });

type I18nInitResult = {
  locale: string;
  namespaces: Namespace[];
  resources: Resource;
};

export const initI18n =
  (config: I18nConfig) =>
  async <N extends Namespace>(defaultNS: N, ...otherNamespaces: Namespace[]): Promise<I18nInitResult> => {
    const namespaces = [defaultNS, ...otherNamespaces];
    const request = await buildRequest();
    const lng = await detectLng(request, {
      detectors: config.detectors,
      fallbackLng: config.fallbackLng
    });

    const loadResources = inject(RESOURCE_LOADER);
    const namespaceResources = await loadResources(lng, namespaces);

    const instance = i18next.createInstance();

    const i18nResources: Resource = {
      [lng]: namespaceResources
    };

    await instance.init({
      lng,
      fallbackLng: config.fallbackLng,
      supportedLngs: config.supportedLngs,
      ns: namespaces,
      defaultNS,
      resources: i18nResources
    });

    await setI18nInstance({ i18n: instance, namespaces, resources: i18nResources });

    return { locale: lng, namespaces, resources: i18nResources };
  };

export const withI18n =
  (config: I18nConfig) =>
  <N extends Namespace>(namespace: N, ...namespaces: N[]) =>
  async <TContext extends object>(_ctx: TContext): Promise<{ ctx: object; provider: Provider }> => {
    const { locale, namespaces: ns, resources } = await initI18n(config)(namespace, ...namespaces);
    return {
      ctx: {},
      provider: {
        component: I18nProvider as Provider['component'],
        props: { locale, namespaces: ns, resources }
      }
    };
  };
