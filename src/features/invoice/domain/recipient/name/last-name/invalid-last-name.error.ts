export type InvalidLastNameError = {
  readonly _tag: 'InvalidLastNameError';
  readonly value: string;
};

export const InvalidLastNameError = (value: string): InvalidLastNameError => ({
  _tag: 'InvalidLastNameError',
  value,
});
