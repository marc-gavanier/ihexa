'use server';

import { logger } from '@/configuration/observability/logger';
import { loggerAnalytics } from '@/libraries/observability';
import type { AnalyticsEvent } from './analytics.type';

export const trackAnalyticsEvent = async (event: AnalyticsEvent): Promise<void> => {
  loggerAnalytics(logger).track(event);
};
