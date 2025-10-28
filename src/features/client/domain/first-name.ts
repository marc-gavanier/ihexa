import { isEmpty } from '@/libraries/utils/string/is-empty';

const capitalize = (firstName: string): string => firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

const firstNamePattern = /(\p{L}+)(\P{L}*)/gu;

export const formatFirstName = (firstName: string): string =>
  [...firstName.matchAll(firstNamePattern).map(([, namePart, separator]) => capitalize(`${namePart}${separator}`))].join('');

export const isFilledFirstName = (firstName: string): boolean => !isEmpty(firstName);
