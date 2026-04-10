export type FilterParams = {
  readonly search?: string;
};

export type Filtered<T> = T & {
  readonly search?: string;
};

export const filtered = <T>(result: T, params: FilterParams = {}): Filtered<T> => ({
  ...result,
  search: params.search
});
