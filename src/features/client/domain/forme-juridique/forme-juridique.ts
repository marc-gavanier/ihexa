import { Schema } from 'effect';

export const FORMES_JURIDIQUES = [
  'EI',
  'EURL',
  'SARL',
  'SASU',
  'SAS',
  'SA',
  'SNC',
  'SCI',
  'SCS',
  'SCA',
  'SCP',
  'SCM',
  'SCEA',
  'SELARL',
  'SELAFA',
  'SELAS',
  'SELCA',
  'GAEC',
  'EARL',
  'GIE',
  'Mutuelle',
  'Coopérative',
  'EPIC',
  'Association'
] as const;

export const FormeJuridique = Schema.Literal(...FORMES_JURIDIQUES);

export type FormeJuridique = typeof FormeJuridique.Type;
