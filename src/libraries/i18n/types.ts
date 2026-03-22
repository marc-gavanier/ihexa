import type { CustomTypeOptions, TFunction } from 'i18next';
import type { LngDetector } from './detectors';

export type Resources = CustomTypeOptions['resources'];

export type Namespace = keyof Resources;

export type TypedTFunction<N extends Namespace[]> = TFunction<N, undefined>;

export type I18nConfig = {
  detectors: LngDetector[];
  fallbackLng: string;
  supportedLngs: string[];
};
