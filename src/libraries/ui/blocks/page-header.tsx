import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
};

export const PageHeader = ({ title, icon, children }: PageHeaderProps) => (
  <div className='mb-16 flex flex-col gap-4 md:flex-row md:justify-between'>
    <h1 className='flex items-center gap-3 text-2xl font-semibold text-primary md:text-4xl'>
      {icon && <span className='flex items-center justify-center rounded-lg bg-primary-surface p-2'>{icon}</span>}
      {title}
    </h1>
    <div className='flex gap-2'>{children}</div>
  </div>
);
