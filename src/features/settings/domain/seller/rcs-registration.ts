import { defineModel, type Model } from '@arckit/effect';
import { brand, nonEmptyString, pattern, Trim } from 'effect/Schema';

export const RCS_REGISTRATION_PATTERN = /^(RCS|RM) .+|Dispensé d'immatriculation au RCS et au RM$/;

export const RcsRegistration = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    pattern(RCS_REGISTRATION_PATTERN, { message: () => 'invalid' }),
    brand('RcsRegistration')
  )
);

export type RcsRegistration = Model.TypeOf<typeof RcsRegistration>;
