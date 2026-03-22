import type { ComponentProps } from 'react';
import { cn } from '../utils';
import type { Color } from './color';
import type { Scale } from './scale';

type Animation = 'ping' | 'bounce';

export type StatusClass<Prefix extends `${string}status` = 'status'> = {
  scale?: `${Prefix}-${Scale}`;
  color?: `${Prefix}-${Color}`;
};

export type StatusProps = ComponentProps<'span'> &
  StatusClass & {
    animation?: `animate-${Animation}`;
    ping?: boolean;
  };

export const Status = ({ scale, color, animation, ping, className, ...props }: StatusProps) => {
  const statusClasses = cn('status', scale, color, !ping && animation, className);

  if (ping) {
    return (
      <span className='inline-grid *:[grid-area:1/1]'>
        <span className={cn(statusClasses, 'animate-ping')} />
        <span className={statusClasses} {...props} />
      </span>
    );
  }

  return <span className={statusClasses} {...props} />;
};
