import { Schema } from 'effect';

export const VAT_REGIMES = ['normal', 'franchise_en_base'] as const;

export const VatRegime = Schema.Literal(...VAT_REGIMES);

export type VatRegime = typeof VatRegime.Type;

export const isVatApplicable = (regime: VatRegime): boolean => regime === 'normal';
