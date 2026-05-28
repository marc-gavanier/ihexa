import { instrument } from '@/configuration/telemetry/instrument/server';
import { createSearch } from '@/libraries/recherche-entreprises';

export const search = createSearch((query, run) =>
  instrument({ name: 'http.recherche_entreprises.search', service: 'recherche-entreprises', attributes: { query } }, run)
);
