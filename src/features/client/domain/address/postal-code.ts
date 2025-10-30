import { isEmpty } from '@/libraries/utils/string/is-empty';

export const isFilledPostalCode = (postalCode: string): boolean => !isEmpty(postalCode);
