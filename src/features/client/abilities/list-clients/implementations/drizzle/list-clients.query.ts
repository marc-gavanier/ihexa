import { type AnyColumn, or, type SQL, sql } from 'drizzle-orm';
import { db } from '@/configuration/drizzle';
import { clientsTable, clientToDomain } from '@/features/client/db';
import type { ListClients } from '@/features/client/domain';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, filtered, type Page, type PageSize } from '@/libraries/resultset';

const unaccentIlike = (column: AnyColumn, pattern: string): SQL => sql`unaccent(${column}) ILIKE unaccent(${pattern})`;

const buildSearchCondition = (search: string): SQL | undefined => {
  const terms = search.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return undefined;

  const conditions = terms.map((term) => {
    const pattern = `%${term}%`;
    return or(
      unaccentIlike(clientsTable.firstname, pattern),
      unaccentIlike(clientsTable.lastname, pattern),
      unaccentIlike(clientsTable.street, pattern),
      unaccentIlike(clientsTable.city, pattern),
      unaccentIlike(clientsTable.zipcode, pattern)
    );
  });

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
