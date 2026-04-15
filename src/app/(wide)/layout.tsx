import type { ReactNode } from 'react';
import { contentId } from '@/libraries/ui/blocks/skip-links/skip-links';

const WideLayout = ({ children }: { children: ReactNode }) => (
  <div className='w-full flex-1 px-4 py-6 sm:px-6 lg:px-8'>
    <main id={contentId}>{children}</main>
  </div>
);

export default WideLayout;
