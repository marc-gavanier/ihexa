export const CONFIGURE_SELLER_ERRORS = {
  ShareCapitalNotAllowedForEI: 'error.shareCapitalNotAllowedForEI',
  TaxDebitOptionNotAllowedForFranchise: 'error.taxDebitOptionNotAllowedForFranchise',
  VatNumberRequiredForNormalRegime: 'error.vatNumberRequiredForNormalRegime'
} as const;

export type ConfigureSellerErrorKey = (typeof CONFIGURE_SELLER_ERRORS)[keyof typeof CONFIGURE_SELLER_ERRORS];
