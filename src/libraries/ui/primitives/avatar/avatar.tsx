import Image from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../utils';

type AvatarSize = 'w-8' | 'w-12' | 'w-16' | 'w-20' | 'w-24' | 'w-32';
type AvatarShape = 'rounded' | 'rounded-xl' | 'rounded-full';
type AvatarMask = 'mask-heart' | 'mask-squircle' | 'mask-hexagon-2';
type AvatarStatus = 'avatar-online' | 'avatar-offline';
type AvatarRing = 'ring-primary' | 'ring-secondary' | 'ring-accent' | 'ring-neutral';

export type AvatarProps = Omit<ComponentProps<'div'>, 'children'> & {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  mask?: AvatarMask;
  status?: AvatarStatus;
  ring?: AvatarRing;
  placeholder?: ReactNode;
  background?: `bg-${string}`;
  text?: `text-${string}`;
};

export const Avatar = ({
  src,
  alt,
  size = 'w-24',
  shape = 'rounded-full',
  mask,
  status,
  ring,
  placeholder,
  background = 'bg-neutral',
  text = 'text-neutral-content',
  className,
  ...props
}: AvatarProps) => {
  const isPlaceholder = !src && placeholder;
  const innerClasses = cn(
    size,
    !mask && shape,
    mask && `mask ${mask}`,
    ring && `ring-2 ring-offset-2 ring-offset-base-100 ${ring}`,
    isPlaceholder && `${background} ${text} flex items-center justify-center`
  );

  return (
    <div className={cn('avatar', status, isPlaceholder && 'avatar-placeholder text-sm font-semibold', className)} {...props}>
      <div className={cn(innerClasses, src && 'relative')}>
        {src ? <Image src={src} alt={alt ?? ''} fill className='object-cover' unoptimized /> : placeholder}
      </div>
    </div>
  );
};

export type AvatarGroupProps = ComponentProps<'div'> & {
  spacing?: '-space-x-4' | '-space-x-6' | '-space-x-8';
};

export const AvatarGroup = ({ spacing = '-space-x-6', className, children, ...props }: AvatarGroupProps) => (
  <div className={cn('avatar-group', spacing, className)} {...props}>
    {children}
  </div>
);
