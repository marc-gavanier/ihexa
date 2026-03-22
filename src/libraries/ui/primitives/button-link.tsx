import type { LinkProps as NextLinkProps } from 'next/dist/client/link';
import NextLink from 'next/link';
import type { HTMLAttributeAnchorTarget, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';
import type { ButtonClass } from './button';

export type ButtonLinkProps = NextLinkProps &
  ButtonClass & {
    icon?: ReactNode;
    iconOnly?: boolean;
    target?: HTMLAttributeAnchorTarget;
    disabled?: boolean;
  } & HTMLAttributes<HTMLAnchorElement>;

export const ButtonLink = ({
  className,
  children,
  target,
  color,
  icon,
  iconOnly,
  kind,
  behavior,
  scale,
  modifier,
  disabled,
  title,
  ...props
}: ButtonLinkProps) => {
  const buttonClasses = cn('btn', color, kind, behavior, scale, modifier, disabled && 'btn-disabled', className);
  const titleAttr = title ?? (iconOnly && typeof children === 'string' ? children : undefined);

  return disabled ? (
    <span className={buttonClasses} title={titleAttr} aria-disabled='true'>
      {icon && icon}
      {children && !iconOnly && children}
    </span>
  ) : (
    <NextLink
      className={buttonClasses}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      title={titleAttr}
      {...props}
    >
      {icon && icon}
      {children && !iconOnly && children}
    </NextLink>
  );
};
