import { Table } from '@arckit/daisyui/primitives';
import type { TranslationProps } from '@arckit/i18n';
import { withTranslation } from '@/configuration/i18n';
import { amountOf, type Line, lineTotal, totalOfAll } from '@/features/invoice/domain';

type InvoiceLinesProps = {
  lines: readonly Line[];
};

export const InvoiceLines = withTranslation<InvoiceLinesProps>(({ lines, t }: InvoiceLinesProps & TranslationProps) => (
  <div className='overflow-x-auto'>
    <Table modifier='table-zebra'>
      <thead>
        <tr>
          <th>{t('details.label')}</th>
          <th className='text-right'>{t('details.unitPrice')}</th>
          <th className='text-right'>{t('details.quantity')}</th>
          <th className='text-right'>{t('details.lineTotal')}</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((line) => (
          <tr key={line.label}>
            <td data-testid='line-label'>{line.label}</td>
            <td className='text-right tabular-nums' data-testid='line-amount'>
              {amountOf(line)} €
            </td>
            <td className='text-right tabular-nums' data-testid='line-quantity'>
              {line.quantity}
            </td>
            <td className='text-right tabular-nums' data-testid='line-total'>
              {lineTotal(line)} €
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className='text-lg font-semibold'>
          <th colSpan={3} className='text-right'>
            {t('details.totalLabel')}
          </th>
          <th className='text-right tabular-nums' data-testid='invoice-total'>
            {totalOfAll(lines)} €
          </th>
        </tr>
      </tfoot>
    </Table>
  </div>
));
