import { PageHeader } from '@arckit/daisyui/blocks';
import { ICON_LG } from '@arckit/daisyui/icons';
import { ButtonLink } from '@arckit/daisyui/primitives';
import type { TranslationProps } from '@arckit/i18n';
import type { Search } from '@arckit/resultset';
import { Match, pipe } from 'effect';
import { RiAddLine, RiTeamLine } from 'react-icons/ri';
import { withTranslation } from '@/configuration/i18n';
import type { ListClientsView } from '../components/list-clients.presenter';
import { ListClientsEmpty } from '../components/list-clients-empty';
import { ListClientsNoResults } from '../components/list-clients-no-results';
import { ListClientsPagination } from '../components/list-clients-pagination';
import { ListClientsSearch } from '../components/list-clients-search';
import { ListClientsTable } from '../components/list-clients-table';

type ListClientsPageProps = TranslationProps & {
  readonly view: ListClientsView;
  readonly search: Search;
};

export const ListClientsPage = withTranslation(({ t, view, search }: ListClientsPageProps) => (
  <div className='flex flex-col gap-8'>
    <PageHeader title={t('title')} icon={<RiTeamLine size={ICON_LG} />}>
      <ButtonLink color='btn-primary' href='/clients/create'>
        <RiAddLine size={ICON_LG} />
        {t('addClient')}
      </ButtonLink>
    </PageHeader>
    <ListClientsSearch search={search} />
    {pipe(
      Match.value(view),
      Match.tag('empty', () => <ListClientsEmpty />),
      Match.tag('noResults', ({ search }) => <ListClientsNoResults search={search} />),
      Match.tag('results', ({ rows, pagination, search }) => (
        <>
          <ListClientsTable rows={rows} />
          {pagination.hasMultiplePages && <ListClientsPagination pagination={pagination} search={search} />}
        </>
      )),
      Match.exhaustive
    )}
  </div>
));
