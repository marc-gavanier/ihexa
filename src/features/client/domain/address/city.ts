import { isEmpty } from '@/libraries/utils/string/is-empty';

export const isFilledCity = (city: string): boolean => !isEmpty(city);
