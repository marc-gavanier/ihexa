export type InvalidInvoiceIdError = {
  readonly _tag: 'InvalidInvoiceIdError';
  readonly value: string;
};

export const InvalidInvoiceIdError = (
  value: string,
): InvalidInvoiceIdError => ({
  _tag: 'InvalidInvoiceIdError',
  value,
});
