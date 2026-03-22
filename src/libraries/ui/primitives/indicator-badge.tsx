import { cn } from '../utils';
import type { BadgeProps } from './badge';
import { Indicator, type IndicatorProps } from './indicator';

type IndicatorBadgeProps = IndicatorProps & BadgeProps;

export const IndicatorBadge = ({ color, kind, scale, className, ...props }: IndicatorBadgeProps) => (
  <Indicator className={cn('badge', color, kind, scale, className)} {...props} />
);
