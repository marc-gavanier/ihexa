export const toI18nConfig =
  ({ lng, ns }: { lng: string; ns: string }) =>
  <T>(translations: T) => ({
    lng,
    ns: [ns],
    resources: { [lng]: { [ns]: translations } }
  });

export const translationUrl =
  (baseUrl: string) =>
  ({ lng, ns }: { lng: string; ns: string }) =>
    `${baseUrl}/${lng}/${ns}.json`;

export const baseUrlFromHeaders = (headers: Headers): string => {
  const host = headers.get('host') ?? 'localhost:000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
};
