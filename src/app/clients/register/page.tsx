import { headers } from 'next/headers';
import { RegisterClientPage } from '@/features/client/abilities/register/ui/pages/register-client.page';
import { CLIENTS_FEATURE, loadI18n } from '@/libraries/i18n';

const Page = async () => {
  await loadI18n(headers())(CLIENTS_FEATURE);

  return <RegisterClientPage />;
};

export default Page;
