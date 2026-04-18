import type { ReactNode } from 'react';
import { contentId } from '@/libraries/ui/blocks/skip-links/skip-links';

const ClassicLayout = ({ children }: { children: ReactNode }) => (
  <div className='mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8'>
    <main id={contentId}>{children}</main>
  </div>
);

export default ClassicLayout;
