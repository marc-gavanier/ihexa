import { Table } from '@arckit/daisyui/primitives';
import type { TranslationProps } from '@arckit/i18n';
import { withTranslation } from '@/configuration/i18n';
import type { ClientRow } from './list-clients.presenter';

type ListClientsTableProps = TranslationProps & {
  readonly rows: readonly ClientRow[];
};

export const ListClientsTable = withTranslation(({ rows, t }: ListClientsTableProps) => (
  <Table modifier='table-zebra' scale='table-md'>
    <thead>
      <tr>
        <th>{t('table.name')}</th>
        <th>{t('table.city')}</th>
        <th>{t('table.zipcode')}</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((client) => (
        <tr key={client.id}>
          <td>{client.name}</td>
          <td>{client.city}</td>
          <td>{client.zipcode}</td>
        </tr>
      ))}
    </tbody>
  </Table>
));
