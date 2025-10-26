import type { ComponentProps } from 'react';
import { cn } from '@/libraries/utils';
import type { Scale } from './scale';

type Modifier = 'zebra' | 'pin-rows' | 'pin-cols';

export type TableClass<Prefix extends `${string}table` = 'table'> = {
  scale?: `${Prefix}-${Scale}`;
  modifier?: `${Prefix}-${Modifier}`;
};

export type TableProps = ComponentProps<'table'> & TableClass;

export const Table = ({ className, scale, modifier, ...props }: TableProps) => (
  <table className={cn('table', scale, modifier, className)} {...props} />
);
