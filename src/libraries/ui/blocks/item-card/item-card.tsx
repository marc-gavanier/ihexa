'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { cn } from '../../utils';

type ItemCardContextType = { href?: string };

const ItemCardContext = createContext<ItemCardContextType>({});

const baseClasses = 'flex h-full flex-col rounded-xl border border-base-300 bg-base-100 shadow-xl';

const interactiveClasses = 'group transition-all duration-200 hover:border-primary hover:shadow-lg hover:shadow-primary/20';

export type ItemCardProps = {
  href?: string;
  className?: string;
  children?: ReactNode;
};

export const ItemCard = ({ href, className, children }: ItemCardProps) => (
  <ItemCardContext.Provider value={{ href }}>
    {href ? (
      <Link href={href} className={cn(baseClasses, interactiveClasses, className)}>
        <div className='flex flex-1 flex-col p-5'>{children}</div>
      </Link>
    ) : (
      <div className={cn(baseClasses, className)}>
        <div className='flex flex-1 flex-col p-5'>{children}</div>
      </div>
    )}
  </ItemCardContext.Provider>
);

export type ItemCardHeaderProps = ComponentProps<'div'> & { withArrow?: boolean };

export const ItemCardHeader = ({ className, children, withArrow = false, ...props }: ItemCardHeaderProps) => {
  const { href } = useContext(ItemCardContext);

  return (
    <div className={cn('flex justify-between gap-2', className)} {...props}>
      <div className='flex items-center gap-2'>{children}</div>
      {withArrow && href && (
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-surface opacity-0 transition-all duration-200 group-hover:opacity-100'>
          <RiArrowRightLine className='text-sm text-primary' />
        </div>
      )}
    </div>
  );
};

export type ItemCardContentProps = ComponentProps<'div'>;

export const ItemCardContent = ({ className, children, ...props }: ItemCardContentProps) => (
  <div className={cn('flex-1', className)} {...props}>
    {children}
  </div>
);

export type ItemCardFooterProps = ComponentProps<'div'>;

export const ItemCardFooter = ({ className, children, ...props }: ItemCardFooterProps) => (
  <div className={cn('mt-4 flex items-center border-t border-base-300 pt-3', className)} {...props}>
    {children}
  </div>
);
