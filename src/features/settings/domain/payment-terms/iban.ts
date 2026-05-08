import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';
import { brand, nonEmptyString, pattern, Trim } from 'effect/Schema';

const IBAN_PATTERN = /^[A-Z]{2}\d{2}[A-Z0-9]+$/;

const charToDigits = (c: string): string => {
  const code = c.charCodeAt(0);
  return code >= 65 && code <= 90 ? (code - 55).toString() : c;
};

const rearrangeIban = (iban: string): string => iban.slice(4) + iban.slice(0, 4);

const toNumericString = (rearranged: string): string => [...rearranged].map(charToDigits).join('');

const mod97 = (numeric: string): number => [...numeric].reduce((remainder, digit) => (remainder * 10 + Number(digit)) % 97, 0);

const isValidIbanChecksum = (iban: string): boolean => mod97(toNumericString(rearrangeIban(iban))) === 1;

export const Iban = defineModel(
  Trim.pipe(
    nonEmptyString({ message: () => 'required' }),
    pattern(IBAN_PATTERN, { message: () => 'invalid' }),
    Schema.filter((iban: string) => isValidIbanChecksum(iban), { message: () => 'invalid' }),
    brand('Iban')
  ),
  (input) => input.replace(/\s/g, '').toUpperCase()
);

export type Iban = Model.TypeOf<typeof Iban>;
