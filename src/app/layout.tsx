import type { ReactNode } from 'react';
import '@/libraries/i18n/resource-loader.node';
import '@/styles/globals.css';

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang='fr' suppressHydrationWarning>
      <body className='antialiased'>
        <div className='flex flex-col min-h-screen'>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
