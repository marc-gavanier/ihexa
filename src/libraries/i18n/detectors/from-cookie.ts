import type { LngDetector } from './types';

type FromCookieOptions = {
  cookieName: string;
  supportedLngs: string[];
};

export const fromCookie =
  ({ cookieName, supportedLngs }: FromCookieOptions): LngDetector =>
  (request) => {
    const cookieHeader = request.headers.get('Cookie');
    if (!cookieHeader) return null;

    const cookies = Object.fromEntries(
      cookieHeader.split(';').map((cookie) => {
        const [key, ...values] = cookie.trim().split('=');
        return [key, values.join('=')];
      })
    );

    const lang = cookies[cookieName];
    if (!lang) return null;

    return supportedLngs.includes(lang) ? lang : null;
  };
