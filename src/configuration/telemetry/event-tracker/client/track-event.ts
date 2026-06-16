import type { EventProperties } from '@arckit/telemetry/event-tracker';
import { eventTracker } from '@/configuration/telemetry/event-tracker/client';

export const TrackerCategory = {
  CLIENT: 'Client',
  SELLER: 'Seller',
  PAYMENT_TERMS: 'Payment Terms'
} as const;

export const TrackerAction = {
  CREATED: 'Created',
  CONFIGURED: 'Configured'
} as const;

export type TrackerCategoryType = (typeof TrackerCategory)[keyof typeof TrackerCategory];
export type TrackerActionType = (typeof TrackerAction)[keyof typeof TrackerAction];

type TrackEvent = {
  readonly category: TrackerCategoryType;
  readonly action: TrackerActionType;
} & EventProperties;

export const trackEvent = ({ category, action, ...properties }: TrackEvent): void => {
  eventTracker.track({ event: `${category} ${action}`, properties });
};
