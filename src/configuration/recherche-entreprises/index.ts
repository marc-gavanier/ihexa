import { errorReporter } from '@/configuration/telemetry/error-reporter/server';
import { metrics } from '@/configuration/telemetry/metrics/server';
import { tracer } from '@/configuration/telemetry/tracer/server';
import { search as baseSearch, type SearchResult } from '@/libraries/recherche-entreprises';

const SERVICE = 'recherche-entreprises';
const SPAN_NAME = 'http.recherche_entreprises.search';

const callsCounter = metrics.counter('external.recherche_entreprises.calls_total', {
  description: 'Number of calls to the recherche-entreprises API'
});

const durationHistogram = metrics.histogram('external.recherche_entreprises.duration_ms', {
  description: 'Duration of recherche-entreprises API calls in milliseconds',
  unit: 'ms'
});

type SearchBuilder = ReturnType<typeof baseSearch>;

const instrumentedExecute = async (execute: () => Promise<SearchResult>, query: string): Promise<SearchResult> => {
  const start = performance.now();
  try {
    const result = await tracer.startSpan(SPAN_NAME, () => execute(), {
      kind: 'client',
      attributes: { 'service.name': SERVICE, 'recherche_entreprises.query': query }
    });
    callsCounter.add(1, { status: 'success' });
    durationHistogram.record(performance.now() - start, { status: 'success' });
    return result;
  } catch (caught) {
    callsCounter.add(1, { status: 'error' });
    durationHistogram.record(performance.now() - start, { status: 'error' });
    const error = caught instanceof Error ? caught : new Error(String(caught));
    errorReporter.captureException({
      error,
      attributes: { 'service.name': SERVICE, 'recherche_entreprises.query': query },
      fingerprint: [SERVICE, error.name]
    });
    throw caught;
  }
};

const wrap = (builder: SearchBuilder, query: string): SearchBuilder => ({
  in: (location) => wrap(builder.in(location), query),
  withLabels: (labels) => wrap(builder.withLabels(labels), query),
  withFilters: (filters) => wrap(builder.withFilters(filters), query),
  include: (fields) => wrap(builder.include(fields), query),
  page: (page, perPage) => wrap(builder.page(page, perPage), query),
  execute: () => instrumentedExecute(() => builder.execute(), query)
});

export const search = (query: string): SearchBuilder => wrap(baseSearch(query), query);
