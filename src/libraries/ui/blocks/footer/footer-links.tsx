import { Link, type LinkProps } from '../../primitives/link';
import { cn } from '../../utils';

export type FooterLink = {
  key: string;
  linkProps: LinkProps;
};

export type FooterLinksProps = {
  links: FooterLink[];
  orientation?: 'vertical' | 'horizontal';
  className?: string;
};

export const FooterLinks = ({ links, orientation = 'horizontal', className }: FooterLinksProps) => (
  <div
    className={cn(
      orientation === 'horizontal' && 'flex flex-row flex-wrap gap-4',
      orientation === 'vertical' && 'flex flex-col flex-wrap gap-1.5',
      className
    )}
  >
    {links.map(({ key, linkProps }) => (
      <Link key={key} color='none' {...linkProps} />
    ))}
  </div>
);
