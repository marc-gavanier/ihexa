import type { ComponentProps } from 'react';
import { cn } from '../utils';

export type ListProps = ComponentProps<'ul'>;

export const List = ({ className, ...props }: ListProps) => (
  <ul className={cn('list bg-base-100 rounded-box', className)} {...props} />
);

export type ListRowProps = ComponentProps<'li'>;

export const ListRow = ({ className, ...props }: ListRowProps) => <li className={cn('list-row', className)} {...props} />;

export type ListHeaderProps = ComponentProps<'li'>;

export const ListHeader = ({ className, ...props }: ListHeaderProps) => (
  <li className={cn('p-4 pb-2 text-xs opacity-60 tracking-wide', className)} {...props} />
);

export type ListColGrowProps = ComponentProps<'div'>;

export const ListColGrow = ({ className, ...props }: ListColGrowProps) => (
  <div className={cn('list-col-grow', className)} {...props} />
);

export type ListColWrapProps = ComponentProps<'p'>;

export const ListColWrap = ({ className, ...props }: ListColWrapProps) => (
  <p className={cn('list-col-wrap text-xs', className)} {...props} />
);
