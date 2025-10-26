import type { Amount } from '@/features/invoice/domain';
import type { Lines } from '@/features/invoice/domain/line';
import { INVOICES_FEATURE, translationsFor } from '@/libraries/i18n';
import { Table } from '@/libraries/ui/primitives/table';

export const InvoiceLines = ({ lines, total }: { lines: Lines; total: Amount }) => {
  const t = translationsFor(INVOICES_FEATURE);

  return (
    <Table>
      <thead>
        <tr>
          <th className='w-full'>{t('details.label')}</th>
          <th className='text-right'>{t('details.quantity')}</th>
          <th className='text-right'>{t('details.unitPrice')}</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((line, index) => (
          <tr key={line.label}>
            <td data-testid={`invoice-line[${index}].label`}>{line.label}</td>
            <td data-testid={`invoice-line[${index}].quantity`} className='text-right'>
              {line.quantity}
            </td>
            <td data-testid={`invoice-line[${index}].unitPrice`} className='text-right'>
              {line.unitPrice}
            </td>
          </tr>
        ))}
        <tr>
          <td>{t('details.totalPrice')}</td>
          <td data-testid='invoice-total' className='text-right' colSpan={2}>
            {total}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
