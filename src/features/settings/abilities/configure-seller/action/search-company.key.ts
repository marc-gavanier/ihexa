import type { ServerActionResult } from '@arckit/nextjs/client';
import { keyFor } from 'piqure';
import type { CompanySummary } from '@/libraries/recherche-entreprises';

export const SEARCH_COMPANY_KEY =
  keyFor<(query: string) => Promise<ServerActionResult<readonly CompanySummary[]>>>('search-company.action');
