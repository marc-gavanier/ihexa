import type { LngDetector } from './detectors';

type DetectLngOptions = {
  detectors: LngDetector[];
  fallbackLng: string;
};

export const detectLng = async (request: Request, { detectors, fallbackLng }: DetectLngOptions): Promise<string> => {
  for (const detector of detectors) {
    const result = await detector(request);
    if (result) return result;
  }
  return fallbackLng;
};
