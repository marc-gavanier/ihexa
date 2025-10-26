import i18next, { type Namespace } from 'i18next';

export const translationsFor = <NS extends Namespace>(ns: NS) => i18next.getFixedT(null, ns);
