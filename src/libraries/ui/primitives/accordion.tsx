import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils';

type AccordionIndicator = 'collapse-arrow' | 'collapse-plus';

export type AccordionItemProps = ComponentProps<'div'> & {
  title: ReactNode;
  name: string;
  indicator?: AccordionIndicator;
  defaultOpen?: boolean;
  joined?: boolean;
};

export const AccordionItem = ({
  title,
  name,
  indicator,
  defaultOpen,
  joined,
  className,
  children,
  ...props
}: AccordionItemProps) => (
  <div className={cn('collapse bg-base-100 border border-base-300', indicator, joined && 'join-item', className)} {...props}>
    <input type='radio' name={name} defaultChecked={defaultOpen} />
    <div className='collapse-title font-semibold'>{title}</div>
    <div className='collapse-content text-sm'>{children}</div>
  </div>
);

export type AccordionDetailsItemProps = ComponentProps<'details'> & {
  title: ReactNode;
  name: string;
  indicator?: AccordionIndicator;
  defaultOpen?: boolean;
  joined?: boolean;
};

export const AccordionDetailsItem = ({
  title,
  name,
  indicator,
  defaultOpen,
  joined,
  className,
  children,
  ...props
}: AccordionDetailsItemProps) => (
  <details
    className={cn('collapse bg-base-100 border border-base-300', indicator, joined && 'join-item', className)}
    name={name}
    open={defaultOpen}
    {...props}
  >
    <summary className='collapse-title font-semibold'>{title}</summary>
    <div className='collapse-content text-sm'>{children}</div>
  </details>
);

export type AccordionProps = ComponentProps<'div'> & {
  joined?: boolean;
};

export const Accordion = ({ joined, className, children, ...props }: AccordionProps) => (
  <div className={cn(joined && 'join join-vertical bg-base-100', className)} {...props}>
    {children}
  </div>
);
