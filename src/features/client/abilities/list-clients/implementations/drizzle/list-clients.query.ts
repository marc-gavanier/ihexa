import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, filtered, type Page, type PageSize } from '@arckit/resultset';
import { like, or, type SQL, sql } from 'drizzle-orm';
import { db } from '@/configuration/drizzle';
import { clientsTable, clientToDomain } from '@/features/client/db';
import type { ListClients } from '../../domain';

const normalizeSearch = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const buildSearchCondition = (search: string): SQL | undefined => {
  const terms = search.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return undefined;

  const conditions = terms.map((term) => like(clientsTable.searchText, `%${normalizeSearch(term)}%`));

  return or(...conditions);
};

export const listClients: ListClients = async (params) => {
  const page: Page = params?.page ?? DEFAULT_PAGE;
  const pageSize: PageSize = params?.pageSize ?? DEFAULT_PAGE_SIZE;
  const offset = (page - 1) * pageSize;

  const whereCondition = params?.search ? buildSearchCondition(params.search) : undefined;

  const [rows, countResult] = await Promise.all([
    db.select().from(clientsTable).where(whereCondition).limit(pageSize).offset(offset),
    db.select({ count: sql<number>`cast(count(*) as int)` }).from(clientsTable).where(whereCondition)
  ]);

  return filtered(
    {
      items: rows.map(clientToDomain),
      totalItems: countResult[0]?.count ?? 0,
      currentPage: page,
      pageSize
    },
    params
  );
};
