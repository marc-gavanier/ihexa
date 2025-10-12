export type InvalidStreetError = {
  readonly _tag: 'InvalidStreetError';
  readonly value: string;
};

export const InvalidStreetError = (value: string): InvalidStreetError => ({
  _tag: 'InvalidStreetError' as const,
  value,
});
