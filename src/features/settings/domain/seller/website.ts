import { defineModel, type Model } from '@arckit/effect';
import { brand, nonEmptyString, pattern, Trim } from 'effect/Schema';

export const WEBSITE_PATTERN = /^https?:\/\/[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+([/?#].*)?$/;

export const Website = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    pattern(WEBSITE_PATTERN, { message: () => 'invalid' }),
    brand('Website')
  )
);

export type Website = Model.TypeOf<typeof Website>;
