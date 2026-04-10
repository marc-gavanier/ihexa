import { describe, expect, it } from 'vitest';
import { Page } from './page';
import { PageSize } from './page-size';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, paginate } from './paginated';

describe('Page', () => {
  it.each([
    [1, 1],
    [5, 5]
  ])('should create page %s', (input, expected) => {
    expect(Page(input)).toBe(expected);
  });

  it.each([
    [0, 1],
    [-1, 1],
    [-100, 1]
  ])('should clamp %s to page %s', (input, expected) => {
    expect(Page(input)).toBe(expected);
  });

  it.each([
    [2.7, 3],
    [1.5, 2],
    [0.3, 1]
  ])('should round %s to page %s', (input, expected) => {
    expect(Page(input)).toBe(expected);
  });
});

describe('PageSize', () => {
  it.each([
    [1, 1],
    [10, 10]
  ])('should create page size %s', (input, expected) => {
    expect(PageSize(input)).toBe(expected);
  });

  it.each([
    [0, 1],
    [-1, 1],
    [-100, 1]
  ])('should clamp %s to page size %s', (input, expected) => {
    expect(PageSize(input)).toBe(expected);
  });

  it.each([
    [3.7, 4],
    [1.5, 2],
    [0.2, 1]
  ])('should round %s to page size %s', (input, expected) => {
    expect(PageSize(input)).toBe(expected);
  });
});

describe('paginate', () => {
  const items = Array.from({ length: 25 }, (_, i) => `item-${i + 1}`);

  it('should use default page and page size when no params provided', () => {
    const result = paginate(items);

    expect(result).toStrictEqual({
      items: items.slice(0, 10),
      totalItems: 25,
      currentPage: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE
    });
  });

  it('should return the requested page', () => {
    const result = paginate(items, { page: Page(2), pageSize: PageSize(10) });

    expect(result).toStrictEqual({
      items: items.slice(10, 20),
      totalItems: 25,
      currentPage: Page(2),
      pageSize: PageSize(10)
    });
  });

  it('should return the last partial page', () => {
    const result = paginate(items, { page: Page(3), pageSize: PageSize(10) });

    expect(result).toStrictEqual({
      items: items.slice(20, 25),
      totalItems: 25,
      currentPage: Page(3),
      pageSize: PageSize(10)
    });
  });

  it('should return empty items when page is beyond available data', () => {
    const result = paginate(items, { page: Page(10), pageSize: PageSize(10) });

    expect(result).toStrictEqual({
      items: [],
      totalItems: 25,
      currentPage: Page(10),
      pageSize: PageSize(10)
    });
  });

  it('should handle custom page size', () => {
    const result = paginate(items, { page: Page(1), pageSize: PageSize(5) });

    expect(result).toStrictEqual({
      items: items.slice(0, 5),
      totalItems: 25,
      currentPage: Page(1),
      pageSize: PageSize(5)
    });
  });

  it('should handle empty items array', () => {
    const result = paginate([]);

    expect(result).toStrictEqual({
      items: [],
      totalItems: 0,
      currentPage: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE
    });
  });

  it('should accept only page param and default page size', () => {
    const result = paginate(items, { page: Page(2) });

    expect(result).toStrictEqual({
      items: items.slice(10, 20),
      totalItems: 25,
      currentPage: Page(2),
      pageSize: DEFAULT_PAGE_SIZE
    });
  });

  it('should accept only page size param and default page', () => {
    const result = paginate(items, { pageSize: PageSize(5) });

    expect(result).toStrictEqual({
      items: items.slice(0, 5),
      totalItems: 25,
      currentPage: DEFAULT_PAGE,
      pageSize: PageSize(5)
    });
  });
});
