import { createHash } from 'node:crypto';
import type { AttributeValue } from '../logger';
import type { AnonymousId, EventName, EventProperties, UserId } from './event-tracker.type';

export type MatomoConfig = {
  readonly url: string;
  readonly siteId: string;
  readonly customDimensions?: Readonly<Record<string, number>> | undefined;
};

type TrackParamsInput = {
  readonly config: MatomoConfig;
  readonly event: EventName;
  readonly userId?: UserId | undefined;
  readonly anonymousId?: AnonymousId | undefined;
  readonly timestamp?: string | undefined;
  readonly properties?: EventProperties | undefined;
};

type PageParamsInput = {
  readonly config: MatomoConfig;
  readonly name?: string | undefined;
  readonly url?: string | undefined;
  readonly userId?: UserId | undefined;
  readonly anonymousId?: AnonymousId | undefined;
  readonly timestamp?: string | undefined;
};

const splitEvent = (eventName: EventName): { category: string; action: string } => {
  const [category, ...rest] = eventName.split(' ');
  const action = rest.join(' ');
  return { category: category ?? eventName, action: action || eventName };
};

const stringifyAttribute = (value: AttributeValue): string => (Array.isArray(value) ? JSON.stringify(value) : String(value));

const customDimensionParams = (
  properties: EventProperties | undefined,
  mapping: Readonly<Record<string, number>> | undefined
): Readonly<Record<string, string>> => {
  if (!properties || !mapping) return {};
  return Object.fromEntries(
    Object.entries(mapping)
      .filter(([key]) => key !== 'value' && properties[key] !== undefined)
      .map(([key, slot]) => [`dimension${slot}`, stringifyAttribute(properties[key] as AttributeValue)])
  );
};

const unixSeconds = (timestamp: string | undefined): string | undefined =>
  timestamp ? `${Math.floor(new Date(timestamp).getTime() / 1000)}` : undefined;

const numericValue = (properties: EventProperties | undefined): string | undefined => {
  const value = properties?.['value'];
  return typeof value === 'number' ? String(value) : undefined;
};

export const matomoVisitorId = (anonymousId: AnonymousId): string =>
  createHash('sha256').update(anonymousId).digest('hex').slice(0, 16);

export const buildMatomoTrackParams = ({
  config,
  event,
  userId,
  anonymousId,
  timestamp,
  properties
}: TrackParamsInput): URLSearchParams => {
  const { category, action } = splitEvent(event);
  const cdt = unixSeconds(timestamp);
  const value = numericValue(properties);
  return new URLSearchParams({
    idsite: config.siteId,
    rec: '1',
    e_c: category,
    e_a: action,
    ...(value !== undefined ? { e_v: value } : {}),
    ...(cdt !== undefined ? { cdt } : {}),
    ...(userId ? { uid: userId } : {}),
    ...(anonymousId ? { _id: matomoVisitorId(anonymousId) } : {}),
    ...customDimensionParams(properties, config.customDimensions)
  });
};

export const buildMatomoPageParams = ({
  config,
  name,
  url,
  userId,
  anonymousId,
  timestamp
}: PageParamsInput): URLSearchParams => {
  const cdt = unixSeconds(timestamp);
  return new URLSearchParams({
    idsite: config.siteId,
    rec: '1',
    ...(name ? { action_name: name } : {}),
    ...(url ? { url } : {}),
    ...(cdt !== undefined ? { cdt } : {}),
    ...(userId ? { uid: userId } : {}),
    ...(anonymousId ? { _id: matomoVisitorId(anonymousId) } : {})
  });
};
