const removeAccents = (text: string): string => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const removeConsecutiveDuplicates = (text: string): string => text.replace(/(.)\1+/g, '$1');

export const normalizeSearchText = (text: string): string => removeConsecutiveDuplicates(removeAccents(text.toLowerCase()));
