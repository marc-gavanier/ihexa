import { createNoopEventTracker } from '@arckit/telemetry/event-tracker';

export const eventTracker = createNoopEventTracker();

export const trackPageView = (_href?: string): void => {};

export const register = (): void => {};
