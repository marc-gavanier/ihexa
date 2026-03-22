import type { ComponentProps } from 'react';
import { cn } from '../utils';

export type TimelineProps = ComponentProps<'ul'> & {
  vertical?: boolean;
  compact?: boolean;
  snapIcon?: boolean;
};

export const Timeline = ({ vertical, compact, snapIcon, className, ...props }: TimelineProps) => (
  <ul
    className={cn(
      'timeline',
      vertical && 'timeline-vertical',
      compact && 'max-md:timeline-compact',
      snapIcon && 'timeline-snap-icon',
      className
    )}
    {...props}
  />
);

export type TimelineItemProps = ComponentProps<'li'>;

export const TimelineItem = ({ className, ...props }: TimelineItemProps) => <li className={cn(className)} {...props} />;

export type TimelineStartProps = ComponentProps<'div'> & {
  box?: boolean;
};

export const TimelineStart = ({ box, className, ...props }: TimelineStartProps) => (
  <div className={cn('timeline-start', box && 'timeline-box', className)} {...props} />
);

export type TimelineMiddleProps = ComponentProps<'div'>;

export const TimelineMiddle = ({ className, ...props }: TimelineMiddleProps) => (
  <div className={cn('timeline-middle', className)} {...props} />
);

export type TimelineEndProps = ComponentProps<'div'> & {
  box?: boolean;
};

export const TimelineEnd = ({ box, className, ...props }: TimelineEndProps) => (
  <div className={cn('timeline-end', box && 'timeline-box', className)} {...props} />
);

export type TimelineConnectorProps = ComponentProps<'hr'>;

export const TimelineConnector = ({ className, ...props }: TimelineConnectorProps) => (
  <hr className={cn(className)} {...props} />
);
