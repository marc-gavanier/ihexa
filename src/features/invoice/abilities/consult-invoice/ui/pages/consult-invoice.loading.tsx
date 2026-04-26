import { PageHeader } from '@arckit/daisyui/blocks';
import { ICON_LG } from '@arckit/daisyui/icons';
import { Card, CardBody, Table } from '@arckit/daisyui/primitives';
import type { TranslationProps } from '@arckit/i18n';
import { RiFileTextLine } from 'react-icons/ri';
import { withTranslation } from '@/configuration/i18n';

const RecipientSkeleton = () => (
  <Card kind='card-border' className='w-fit'>
    <CardBody className='gap-2'>
      <div className='skeleton h-6 w-40' />
      <div className='skeleton h-5 w-56' />
    </CardBody>
  </Card>
);

const LinesSkeleton = withTranslation(({ t }: TranslationProps) => (
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
        {[1, 2, 3].map((i) => (
          <tr key={i}>
            <td>
              <div className='skeleton h-4 w-52' />
            </td>
            <td className='text-right'>
              <div className='skeleton ml-auto h-4 w-16' />
            </td>
            <td className='text-right'>
              <div className='skeleton ml-auto h-4 w-8' />
            </td>
            <td className='text-right'>
              <div className='skeleton ml-auto h-4 w-16' />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className='text-lg font-semibold'>
          <th colSpan={3} className='text-right'>
            {t('details.totalLabel')}
          </th>
          <th className='text-right'>
            <div className='skeleton ml-auto h-5 w-20' />
          </th>
        </tr>
      </tfoot>
    </Table>
  </div>
));

export const ConsultInvoiceLoading = withTranslation(({ t }: TranslationProps) => (
  <div className='flex flex-col gap-8'>
    <PageHeader title={t('title')} icon={<RiFileTextLine size={ICON_LG} />} />
    <RecipientSkeleton />
    <LinesSkeleton />
  </div>
));
