import type { ComponentProps } from 'react';
import { cn } from '../utils';
import type { Color } from './color';
import type { Scale } from './scale';

export type RangeClass<Prefix extends `${string}range` = 'range'> = {
  color?: `${Prefix}-${Color}`;
  scale?: `${Prefix}-${Scale}`;
};

export type RangeProps = Omit<ComponentProps<'input'>, 'onChange'> &
  RangeClass & {
    value: number;
    onChange: (value: number) => void;
  };

export const Range = ({ value, onChange, color, scale, className, min = 0, max = 1, step = 0.01, ...props }: RangeProps) => (
  <input
    type='range'
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    min={min}
    max={max}
    step={step}
    className={cn('range', color, scale, className)}
    {...props}
  />
);
