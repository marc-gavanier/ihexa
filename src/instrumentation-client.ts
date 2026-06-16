import { register as registerErrorReporter } from '@/configuration/telemetry/error-reporter/client';
import { register as registerEventTracker, trackPageView } from '@/configuration/telemetry/event-tracker/client';

registerErrorReporter();
registerEventTracker();

export const onRouterTransitionStart = (href: string): void => {
  trackPageView(href);
};
