import type { ReactNode } from 'react';
import { footerId } from '../../blocks/skip-links/skip-links';
import { cn } from '../../utils';
import { type FooterLink, FooterLinks } from './footer-links';

export type Category = {
  name: string;
  links: FooterLink[];
};

export const Footer = ({
  categories = [],
  children,
  className,
  innerClassName
}: {
  categories?: Category[];
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
}) => (
  <div className={className}>
    <footer
      id={footerId}
      className={cn('footer sm:footer-horizontal container mx-auto px-6 py-10 xl:flex xl:gap-12', innerClassName)}
    >
      {children && <aside className='me-4 flex-1'>{children}</aside>}
      {categories.map(({ name, links }, index) => (
        <nav key={name} aria-labelledby={`footer-title-${index}`}>
          <h2 id={`footer-title-${index}`} className='footer-title text-base-content opacity-100'>
            {name}
          </h2>
          <FooterLinks orientation='vertical' links={links} />
        </nav>
      ))}
    </footer>
  </div>
);
