export type Paginated<T> = {
  readonly items: T[];
  readonly totalItems: number;
  readonly currentPage: number;
  readonly pageSize: number;
};

export type PaginationParams = {
  readonly page?: number;
  readonly pageSize?: number;
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const paginate = <T>(allItems: T[], params: PaginationParams = {}): Paginated<T> => {
  const page = Math.max(1, params.page ?? DEFAULT_PAGE);
  const pageSize = Math.max(1, params.pageSize ?? DEFAULT_PAGE_SIZE);
  const startIndex = (page - 1) * pageSize;
  const items = allItems.slice(startIndex, startIndex + pageSize);

  return {
    items,
    totalItems: allItems.length,
    currentPage: page,
    pageSize
  };
};
