import { i18n } from '@/configuration/i18n';
import { CREATE_CLIENT_ACTION_KEY, CreateClientPage, createClientAction } from '@/features/client/abilities/create-client';
import { withI18n } from '@/libraries/i18n';
import { withClientBinder } from '@/libraries/injection';
import { pageBuilder } from '@/libraries/nextjs/page';

export default pageBuilder()
  .use(withClientBinder(CREATE_CLIENT_ACTION_KEY, createClientAction))
  .use(withI18n(i18n)('clients/create'))
  .render(async () => <CreateClientPage />);
