import type { Logger } from '../logger/logger.type';
import type { Analytics } from './analytics.type';

export const loggerAnalytics = (logger: Logger): Analytics => ({
  track: ({ category, action, label, value, metadata }) => {
    logger.log({
      level: 'info',
      event: 'analytics:track',
      payload: {
        category,
        action,
        ...(label !== undefined ? { label } : {}),
        ...(value !== undefined ? { value } : {}),
        ...metadata
      }
    });
  }
});
