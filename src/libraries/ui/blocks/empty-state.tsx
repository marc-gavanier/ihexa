import type { ReactNode } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { ICON_LG } from '../icons/sizes';
import { Card, CardBody } from '../primitives/card';

type EmptyStateProps = {
  canAdd?: boolean;
  icon: ReactNode;
  children: ReactNode;
};

export const EmptyState = ({ canAdd = true, icon, children }: EmptyStateProps) => (
  <Card kind='card-dash' className='border-primary bg-primary-surface/30'>
    <CardBody className='items-center p-16 text-center'>
      <div className='relative mb-6'>
        <div className='flex h-24 w-24 items-center justify-center rounded-full bg-primary-surface'>{icon}</div>
        {canAdd && (
          <div className='absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary-tint text-primary shadow-md'>
            <RiAddLine size={ICON_LG} />
          </div>
        )}
      </div>
      {children}
    </CardBody>
  </Card>
);
