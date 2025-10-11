export type InvalidAmountError = {
  readonly _tag: 'InvalidAmountError';
  readonly value: bigint;
};

export const InvalidAmountError = (value: bigint): InvalidAmountError => ({
  _tag: 'InvalidAmountError',
  value,
});
