import type { Metadata } from 'next';
import { inject } from '@/libraries/injection';
import { RESOURCE_LOADER } from './resource-loader';
import type { I18nConfig, Namespace } from './types';
import { getLang } from './with-i18n';

export type MetadataTranslation = () => Promise<Metadata>;

export const metadataTranslation =
  (config: I18nConfig) =>
  (namespace: Namespace): MetadataTranslation =>
  async (): Promise<Metadata> => {
    const lng = await getLang(config);
    const loadResources = inject(RESOURCE_LOADER);
    const resources = await loadResources(lng, [namespace]);
    const namespaceResources = resources[namespace] as { metadata?: Metadata };

    return namespaceResources.metadata ?? {};
  };
