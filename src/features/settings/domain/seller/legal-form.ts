import { Schema } from 'effect';

export const LEGAL_FORMS = ['SARL', 'SAS', 'SA', 'EURL', 'SNC', 'SCI', 'EI'] as const;

export const LegalForm = Schema.Literal(...LEGAL_FORMS);

export type LegalForm = typeof LegalForm.Type;

export const isIndividualEnterprise = (legalForm: LegalForm): boolean => legalForm === 'EI';
