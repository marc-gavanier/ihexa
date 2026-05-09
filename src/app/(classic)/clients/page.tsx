import { withPagination, withSearchTerm } from '@arckit/nextjs';
import { withFetch } from '@arckit/pipeline';
import { PageSize } from '@arckit/resultset';
import { i18n, type MetadataTranslation, metadataTranslation, withI18n } from '@/configuration/i18n';
import { pageBuilder } from '@/configuration/nextjs';
import { presentListClients } from '@/features/client/abilities/list-clients';
import { listClients } from '@/features/client/abilities/list-clients/implementations';
import { ListClientsPage } from '@/features/client/abilities/list-clients/ui/pages';

export const generateMetadata: MetadataTranslation = metadataTranslation(i18n)('clients.list');

export default pageBuilder()
  .use(withSearchTerm(), withPagination())
  .use(withFetch('result', ({ search, page }) => listClients({ search, page, pageSize: PageSize(10) })))
  .use(withI18n(i18n)('clients.list'))
  .render(async ({ result, search }) => <ListClientsPage view={presentListClients(result, search)} search={search} />);
