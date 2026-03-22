import type { ReactNode } from 'react';
import type { Namespace, TypedTFunction } from './types';
import { getTranslation } from './with-i18n';

type TranslationProps = {
  t: TypedTFunction<Namespace[]>;
};

export const withTranslation =
  <P extends object>(Component: (props: P & TranslationProps) => ReactNode) =>
  async (props: P): Promise<ReactNode> => {
    const { t } = await getTranslation();
    return <Component {...props} t={t} />;
  };
