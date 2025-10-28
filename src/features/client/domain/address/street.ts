import { isEmpty } from '@/libraries/utils/string/is-empty';

export const isFilledStreet = (street: string): boolean => !isEmpty(street);
