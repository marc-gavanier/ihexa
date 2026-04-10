import { Page } from './page';
import { PageSize } from './page-size';

export type Paginated<T> = {
  readonly items: T[];
  readonly totalItems: number;
  readonly currentPage: Page;
  readonly pageSize: PageSize;
};

export type PaginationParams = {
  readonly page?: Page;
  readonly pageSize?: PageSize;
};

export const DEFAULT_PAGE: Page = Page(1);
export const DEFAULT_PAGE_SIZE: PageSize = PageSize(10);

export const paginate = <T>(allItems: T[], params: PaginationParams = {}): Paginated<T> => {
  const page = params.page ?? DEFAULT_PAGE;
  const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
  const startIndex = (page - 1) * pageSize;
  const items = allItems.slice(startIndex, startIndex + pageSize);

  return {
    items,
    totalItems: allItems.length,
    currentPage: page,
    pageSize
  };
};
