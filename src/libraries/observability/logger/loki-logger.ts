import type { Logger } from './logger.type';

type LokiLoggerConfig = {
  url: string;
  labels?: Record<string, string>;
};

export const lokiLogger = (config: LokiLoggerConfig): Logger => ({
  log: (entry) => {
    const { level, event, source, payload, error } = entry;

    fetch(`${config.url}/loki/api/v1/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        streams: [
          {
            stream: { app: 'ihexa', level, ...config.labels },
            values: [
              [
                `${Date.now() * 1_000_000}`,
                JSON.stringify({
                  event,
                  source,
                  ...payload,
                  ...(error ? { error: { message: error.message, stack: error.stack } } : {})
                })
              ]
            ]
          }
        ]
      })
    }).catch(console.error);
  }
});
