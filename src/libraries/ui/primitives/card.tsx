import type { ComponentProps } from 'react';
import { cn } from '../utils';
import type { Scale } from './scale';

type Kind = 'dash' | 'border';
type Layout = 'card-side';
type Shadow = 'shadow-sm' | 'shadow-md' | 'shadow-lg' | 'shadow-xl';

export type CardClass<Prefix extends `${string}card` = 'card'> = {
  scale?: `${Prefix}-${Scale}`;
  kind?: `${Prefix}-${Kind}`;
};

export type CardProps = ComponentProps<'div'> &
  CardClass & {
    layout?: Layout;
    imageFull?: boolean;
    shadow?: Shadow;
  };

export const Card = ({ className, scale, kind, layout, imageFull, shadow, ...props }: CardProps) => (
  <div className={cn('card bg-base-100', scale, kind, layout, imageFull && 'image-full', shadow, className)} {...props} />
);

export type CardBodyProps = ComponentProps<'div'>;

export const CardBody = ({ className, ...props }: CardBodyProps) => <div className={cn('card-body', className)} {...props} />;

export type CardTitleProps = ComponentProps<'h2'>;

export const CardTitle = ({ className, ...props }: CardTitleProps) => <h2 className={cn('card-title', className)} {...props} />;

export type CardActionsProps = ComponentProps<'div'> & {
  justify?: 'justify-start' | 'justify-center' | 'justify-end';
};

export const CardActions = ({ className, justify = 'justify-end', ...props }: CardActionsProps) => (
  <div className={cn('card-actions', justify, className)} {...props} />
);

export type CardFigureProps = ComponentProps<'figure'>;

export const CardFigure = ({ className, ...props }: CardFigureProps) => <figure className={cn(className)} {...props} />;
