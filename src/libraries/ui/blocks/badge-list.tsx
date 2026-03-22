import type { ReactNode } from 'react';
import { Badge, type BadgeClass } from '../primitives/badge';
import { cn } from '../utils';

type BadgeListProps<T> = {
  values: readonly T[];
  itemToKey: (value: T) => string;
  itemToString: (value: T) => string;
  className?: string;
} & BadgeClass;

export const BadgeList = <T,>({
  values,
  itemToKey,
  itemToString,
  className,
  color,
  kind,
  scale
}: BadgeListProps<T>): ReactNode =>
  values.length > 0 && (
    <ul className={cn(className, 'flex flex-wrap gap-1')}>
      {values.map((value) => (
        <li key={itemToKey(value)}>
          <Badge color={color} kind={kind} scale={scale}>
            {itemToString(value)}
          </Badge>
        </li>
      ))}
    </ul>
  );
