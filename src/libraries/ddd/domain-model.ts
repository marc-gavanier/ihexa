export type DomainModel<TName extends string, TValues> = TValues & {
  [modelKey in `is${Capitalize<TName>}`]: true;
};
