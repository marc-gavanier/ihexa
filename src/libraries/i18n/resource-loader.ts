import { key } from '@/libraries/injection';
import type { Namespace } from './types';

export type ResourceLoader = (lng: string, namespaces: Namespace[]) => Promise<Record<Namespace, Record<string, unknown>>>;

export const RESOURCE_LOADER = key<ResourceLoader>('i18n.resourceLoader');
