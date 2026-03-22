import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import i18next, { type i18n } from 'i18next';
import { headers } from 'next/headers';
import { cache } from 'react';
import type { PageProps } from '@/libraries/nextjs/page';
import { detectLng } from './detect-lng';
import type { I18nConfig, Namespace, TypedTFunction } from './types';

type I18nInstance = {
  i18n: i18n;
  namespaces: Namespace[];
};

const getI18nInstance = cache((): { current: I18nInstance | null } => ({ current: null }));

export const setI18nInstance = (instance: I18nInstance): void => {
  getI18nInstance().current = instance;
};

export const getTranslation = cache(async () => {
  const holder = getI18nInstance();
  if (!holder.current) {
    throw new Error('i18n not initialized. Did you forget to use withI18n middleware?');
  }
  const { i18n, namespaces } = holder.current;
  return {
    t: i18n.getFixedT(i18n.language, namespaces) as TypedTFunction<Namespace[]>,
    i18n,
    namespaces
  };
});

const buildRequest = async (): Promise<Request> => {
  const headersList = await headers();
  const headersInit: HeadersInit = {};
  headersList.forEach((value, key) => {
    headersInit[key] = value;
  });
  return new Request('http://localhost', { headers: headersInit });
};

const loadNamespaceResources = async (
  lng: string,
  namespaces: Namespace[]
): Promise<Record<Namespace, Record<string, unknown>>> => {
  const entries = await Promise.all(
    namespaces.map(async (ns) => {
      const localePath = join(process.cwd(), 'public', 'locales', lng, `${ns}.json`);
      const content = await readFile(localePath, 'utf-8');
      return [ns, JSON.parse(content) as Record<string, unknown>] as const;
    })
  );
  return Object.fromEntries(entries) as Record<Namespace, Record<string, unknown>>;
};

export const initI18n =
  (config: I18nConfig) =>
  async <N extends Namespace>(defaultNS: N, ...otherNamespaces: Namespace[]): Promise<void> => {
    const namespaces = [defaultNS, ...otherNamespaces];
    const request = await buildRequest();
    const lng = await detectLng(request, {
      detectors: config.detectors,
      fallbackLng: config.fallbackLng
    });

    const resources = await loadNamespaceResources(lng, namespaces);

    const instance = i18next.createInstance();

    await instance.init({
      lng,
      fallbackLng: config.fallbackLng,
      supportedLngs: config.supportedLngs,
      ns: namespaces,
      defaultNS,
      resources: {
        [lng]: resources
      }
    });

    setI18nInstance({ i18n: instance, namespaces });
  };

export const withI18n =
  (config: I18nConfig) =>
  <N extends Namespace>(defaultNS: N, ...otherNamespaces: Namespace[]) =>
  async <TContext extends object>(_ctx: TContext, _props: PageProps): Promise<{ ctx: object }> => {
    await initI18n(config)(defaultNS, ...otherNamespaces);
    return { ctx: {} };
  };
