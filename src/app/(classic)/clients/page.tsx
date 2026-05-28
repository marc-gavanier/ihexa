import { withPagination, withSearchTerm } from '@arckit/nextjs';
import { withFetch } from '@arckit/pipeline';
import { PageSize } from '@arckit/resultset';
import { createB2BClientAction, createB2CClientAction } from '@/app/_actions/client/create-client.action';
import { searchCompanyForClientAction } from '@/app/_actions/client/search-company.action';
import { i18n, type MetadataTranslation, metadataTranslation, withI18n } from '@/configuration/i18n';
import { pageBuilder, withClientBinder } from '@/configuration/nextjs';
import { withPageView } from '@/configuration/telemetry/event-tracker/server';
import {
  CREATE_B2B_CLIENT_ACTION_KEY,
  CREATE_B2C_CLIENT_ACTION_KEY,
  SEARCH_COMPANY_KEY
} from '@/features/client/abilities/create-client';
import { presentListClients } from '@/features/client/abilities/list-clients';
import { listClients } from '@/features/client/abilities/list-clients/implementations';
import { ListClientsPage } from '@/features/client/abilities/list-clients/ui/pages';

export const generateMetadata: MetadataTranslation = metadataTranslation(i18n)('clients.list');

export default pageBuilder()
  .use(
    withClientBinder(CREATE_B2C_CLIENT_ACTION_KEY, createB2CClientAction),
    withClientBinder(CREATE_B2B_CLIENT_ACTION_KEY, createB2BClientAction),
    withClientBinder(SEARCH_COMPANY_KEY, searchCompanyForClientAction)
  )
  .use(withSearchTerm(), withPagination())
  .use(withFetch('result', ({ search, page }) => listClients({ search, page, pageSize: PageSize(10) })))
  .use(withI18n(i18n)('clients.list', 'clients.create', 'global.server-action'))
  .use(withPageView('Clients List'))
  .render(async ({ result, search }) => <ListClientsPage view={presentListClients(result, search)} search={search} />);
