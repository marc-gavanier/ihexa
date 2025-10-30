import type { ValueObject } from '@/libraries/ddd';
import { isEmpty } from '@/libraries/utils/string/is-empty';

export type LastName = ValueObject<string>;

export const formatLastName = (lastName: string) => lastName.toUpperCase();

export const isFilledLastName = (value: string): value is LastName => !isEmpty(value);
