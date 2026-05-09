import { Pagination } from '@arckit/daisyui/blocks';
import type { TranslationProps } from '@arckit/i18n';
import { withTranslation } from '@/configuration/i18n';
import type { PaginationViewModel } from './list-clients.presenter';

type ListClientsPaginationProps = TranslationProps & {
  readonly pagination: PaginationViewModel;
  readonly search: string;
};

const paginationHref = (search: string): string =>
  search ? `/clients?search=${encodeURIComponent(search)}&page=:page` : '/clients?page=:page';

export const ListClientsPagination = withTranslation(({ pagination, search, t }: ListClientsPaginationProps) => (
  <div className='flex items-center justify-between'>
    <span>
      {t('pagination.summary', {
        currentPage: pagination.currentPage,
        totalPages: pagination.totalPages,
        totalItems: pagination.totalItems
      })}
    </span>
    <Pagination
      itemsCount={pagination.totalItems}
      pageSize={pagination.pageSize}
      currentPage={pagination.currentPage}
      href={paginationHref(search)}
    >
      {({ number, isCurrent, href }) => (
        <a href={href.replace(':page', String(number))} className={`join-item btn btn-sm ${isCurrent ? 'btn-active' : ''}`}>
          {number}
        </a>
      )}
    </Pagination>
  </div>
));
