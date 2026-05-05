'use client';

import { Card, CardBody } from '@arckit/daisyui/primitives';
import { useTranslation } from 'react-i18next';
import type { CompanySummary } from '@/libraries/recherche-entreprises';

export const CompanyCard = ({ company }: { company: CompanySummary }) => {
  const { t } = useTranslation('settings.configure-seller');

  return (
    <Card kind='card-border' className='bg-base-200'>
      <CardBody>
        <h3 className='card-title text-base'>
          {company.companyName} ({company.legalForm})
        </h3>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div>
            <span className='font-medium'>{t('company.card.siren')}:</span> {company.siren}
          </div>
          <div>
            <span className='font-medium'>{t('company.card.siret')}:</span> {company.siret}
          </div>
          <div className='col-span-2'>
            <span className='font-medium'>{t('company.card.address')}:</span> {company.street}, {company.zipcode} {company.city}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
