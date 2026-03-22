import type { ReactNode } from 'react';
import '@/libraries/i18n/resource-loader.node';
import '@/styles/globals.css';
import { contentId } from '@/libraries/ui/blocks/skip-links/skip-links';

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang='fr' suppressHydrationWarning>
      <body className='antialiased'>
        <header className='navbar bg-base-100 border-base-300 border-b'>
          <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'></div>
        </header>
        <div className='mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8'>
          <main id={contentId}>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
