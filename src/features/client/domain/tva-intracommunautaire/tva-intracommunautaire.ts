import { defineModel, type Model } from '@arckit/effect';
import { brand, nonEmptyString, pattern, Trim } from 'effect/Schema';

export const TVA_INTRACOMMUNAUTAIRE_PATTERN = /^FR\d{11}$/;

export const TvaIntracommunautaire = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    pattern(TVA_INTRACOMMUNAUTAIRE_PATTERN, { message: () => 'invalid' }),
    brand('TvaIntracommunautaire')
  )
);

export type TvaIntracommunautaire = Model.TypeOf<typeof TvaIntracommunautaire>;

export const computeTvaIntracommunautaire = (siret: string): TvaIntracommunautaire => {
  const siren = siret.slice(0, 9);
  const key = String((12 + 3 * (Number(siren) % 97)) % 97).padStart(2, '0');
  return TvaIntracommunautaire(`FR${key}${siren}`);
};
