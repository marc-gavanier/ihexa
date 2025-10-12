export type InvalidLineLabelError = {
  readonly _tag: 'InvalidLineLabelError';
  readonly value: string;
};

export const InvalidLineLabelError = (
  value: string,
): InvalidLineLabelError => ({
  _tag: 'InvalidLineLabelError' as const,
  value,
});
