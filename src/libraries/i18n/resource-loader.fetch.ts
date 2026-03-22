import { provide } from '@/libraries/injection';
import { RESOURCE_LOADER, type ResourceLoader } from './resource-loader';
import type { Namespace } from './types';

const loadNamespaceResources: ResourceLoader = async (lng, namespaces) => {
  const entries = await Promise.all(
    namespaces.map(async (ns) => {
      const response = await fetch(`/locales/${lng}/${ns}.json`);
      const content = (await response.json()) as Record<string, unknown>;
      return [ns, content] as const;
    })
  );
  return Object.fromEntries(entries) as Record<Namespace, Record<string, unknown>>;
};

provide(RESOURCE_LOADER, loadNamespaceResources);
