import { createClientAction } from '@/app/_actions/client/create-client.action';
import { i18n, type MetadataTranslation, metadataTranslation, withI18n } from '@/configuration/i18n';
import { pageBuilder, withClientBinder } from '@/configuration/nextjs';
import { CREATE_CLIENT_ACTION_KEY, CreateClientPage } from '@/features/client/abilities/create-client';

export const generateMetadata: MetadataTranslation = metadataTranslation(i18n)('clients.create');

export default pageBuilder()
  .use(withClientBinder(CREATE_CLIENT_ACTION_KEY, createClientAction))
  .use(withI18n(i18n)('clients.create', 'global.server-action'))
  .render(async () => <CreateClientPage />);
