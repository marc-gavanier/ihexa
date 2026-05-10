import { Schema } from 'effect';

export const FORMES_JURIDIQUES = ['EI', 'EURL', 'SARL', 'SASU', 'SAS', 'SA', 'SNC', 'SCI', 'Association'] as const;

export const FormeJuridique = Schema.Literal(...FORMES_JURIDIQUES);

export type FormeJuridique = typeof FormeJuridique.Type;
