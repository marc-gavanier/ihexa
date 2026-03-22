import type { ReactNode } from 'react';
import { cn } from '../utils';

type SeparatedListProps = {
  items: ReactNode[];
  separator?: ReactNode;
  className?: string;
};

export const SeparatedList = ({ items, separator = '•', className }: SeparatedListProps) => (
  <div className={cn('flex items-center gap-1', className)}>
    {items.map((item, index) => (
      <span key={item?.toString()} className='contents'>
        {index > 0 && <span>{separator}</span>}
        <span>{item}</span>
      </span>
    ))}
  </div>
);
