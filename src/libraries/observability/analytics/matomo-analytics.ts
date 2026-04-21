import type { Analytics } from './analytics.type';

declare global {
  interface Window {
    _paq?: unknown[][];
  }
}

export const matomoAnalytics = (): Analytics => ({
  track: ({ category, action, label, value }) => {
    if (typeof window === 'undefined' || !window._paq) return;

    const eventData: (string | number | undefined)[] = ['trackEvent', category, action];
    if (label !== undefined) eventData.push(label);
    if (value !== undefined) eventData.push(value);

    window._paq.push(eventData);
  }
});
