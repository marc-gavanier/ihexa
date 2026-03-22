import { key } from '@/libraries/injection';
import type { Namespace, TypedTFunction } from './types';

export type Translation = TypedTFunction<Namespace[]>;

export const TRANSLATION = key<Translation>('i18n.translation');
