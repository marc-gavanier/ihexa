/** biome-ignore-all lint/performance/noAccumulatingSpread: no performance issue here, prefer increase code readability */
import assert from 'node:assert';
import type { DataTable } from '@cucumber/cucumber';

const dataTableToObject = <T = Record<string, string>>(dataTable: DataTable): T => Object.fromEntries(dataTable.rows()) as T;

const getNestedValue = (obj: unknown, path: string): unknown =>
  path
    .replace(/\[(\d+)]/g, '.$1')
    .split('.')
    .reduce((current: unknown, key: string) => (current == null ? undefined : (current as Record<string, unknown>)[key]), obj);

const extractFields = (obj: unknown, fields: string[]): Record<string, unknown> =>
  fields.reduce(
    (extractedFields: Record<string, unknown>, field: string) => ({
      ...extractedFields,
      [field]: String(getNestedValue(obj, field))
    }),
    {}
  );

export const assertMatchesDataTable = (dataTable: DataTable) => (actual: unknown, options?: { message?: string }) => {
  assert.ok(actual, options?.message || 'Object should be defined');
  const expected = dataTableToObject(dataTable);
  assert.deepStrictEqual(extractFields(actual, Object.keys(expected)), expected);
};
