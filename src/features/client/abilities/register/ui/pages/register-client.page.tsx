import i18next from 'i18next';
import { headers } from 'next/headers';
import { AVAILABLE_LANGUAGES, CLIENTS_FEATURE, DEFAULT_LANGUAGE } from '@/libraries/i18n';
import { resolveLocale } from '@/libraries/i18n/resolve-locale';
import { RegisterClientForm } from '../components/register-client.form';

export const RegisterClientPage = async () => {
  const lng = resolveLocale(AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE)((await headers()).get('accept-language'));
  const translations = i18next.getResourceBundle(lng, CLIENTS_FEATURE);

  return <RegisterClientForm translation={translations} />;
};
