export const skipLinksId = 'skip-links';
export const contentId = 'content';
export const footerId = 'footer';

export const SkipLinks = ({ links, label }: { links?: { label: string; anchor: string }[]; label: string }) => (
  <nav aria-label={label} className='p-4 bg-base-200 skip-links'>
    <ul className='flex gap-4'>
      {links?.map((link) => (
        <li key={link.anchor}>
          <a href={link.anchor} className='link link-primary'>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
