import { ERROR_PREFIX } from '@/configuration/errors';
import { i18n } from '@/configuration/i18n';
import { CREATE_CLIENT_ACTION_KEY, CreateClientPage, createClientAction } from '@/features/client/abilities/create-client';
import { type MetadataTranslation, metadataTranslation, withI18n } from '@/libraries/i18n';
import { withClientBinder } from '@/libraries/injection';
import { pageBuilder } from '@/libraries/nextjs/page';

export const generateMetadata: MetadataTranslation = metadataTranslation(i18n)('clients.create');

export default pageBuilder(ERROR_PREFIX)
  .use(withClientBinder(CREATE_CLIENT_ACTION_KEY, createClientAction))
  .use(withI18n(i18n)('clients.create', 'global.server-action'))
  .render(async () => <CreateClientPage />);
