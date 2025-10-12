export type InvalidFirstNameError = {
  readonly _tag: 'InvalidFirstNameError';
  readonly value: string;
};

export const InvalidFirstNameError = (
  value: string,
): InvalidFirstNameError => ({
  _tag: 'InvalidFirstNameError' as const,
  value,
});
