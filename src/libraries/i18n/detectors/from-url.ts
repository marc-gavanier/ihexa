import type { LngDetector } from './types';

type FromUrlOptions = {
  supportedLngs: string[];
};

export const fromUrl =
  ({ supportedLngs }: FromUrlOptions): LngDetector =>
  (request) => {
    const url = new URL(request.url);
    const firstSegment = url.pathname.split('/')[1];

    if (!firstSegment) return null;

    return supportedLngs.find((lng) => lng === firstSegment || lng.startsWith(`${firstSegment}-`)) ?? null;
  };
