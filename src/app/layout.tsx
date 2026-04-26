import type { TranslationProps } from '@arckit/i18n';
import type { Metadata } from 'next';
import Link from 'next/link';
import { i18n, withI18n, withLang, withTranslation } from '@/configuration/i18n';
import '@/configuration/i18n/resource-loader.node';
import { layoutBuilder } from '@arckit/nextjs';
import '@/styles/globals.css';
import { contentId, Footer, skipLinksId } from '@arckit/daisyui/blocks';
import { SkipLinksPortalClient, ThemeChanger, ToasterClient } from '@arckit/daisyui/blocks-client';
import { ThemeProvider } from '@arckit/daisyui/theme';
import { Logo } from '@/features/brand/logo';

export const metadata: Metadata = {
  title: {
    template: '%s | IHexa',
    default: 'IHexa'
  },
  description:
    'IHexa — training project for feature-based vertical slice architecture with Next.js, React, TypeScript, and Effect.'
};

const SkipLinks = withTranslation(({ t }: TranslationProps) => (
  <SkipLinksPortalClient links={[{ label: t('skip-links.content'), anchor: `#${contentId}` }]}>
    {t('skip-links.label')}
  </SkipLinksPortalClient>
));

export default layoutBuilder()
  .use(withLang(i18n))
  .use(withI18n(i18n)('global.skip-links'))
  .render(async ({ lang }, { children }) => (
    <html lang={lang} suppressHydrationWarning>
      <body className='flex min-h-screen flex-col antialiased'>
        <ThemeProvider attribute='data-theme' defaultTheme='system' enableSystem disableTransitionOnChange>
          <ToasterClient directionY='toast-top' />
          <div id={skipLinksId} />
          <SkipLinks />
          <header className='navbar bg-base-100 border-base-300 border-b'>
            <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
              <Link href='/' className='flex items-center gap-2'>
                <Logo width={28} height={28} title='IHexa' />
                <span className='font-bold text-lg'>IHexa</span>
              </Link>
              <nav className='flex items-center gap-4'>
                <Link href='/clients/create' className='link link-hover text-sm'>
                  Clients
                </Link>
              </nav>
            </div>
          </header>
          {children}
          <Footer className='bg-base-200 mt-auto' innerClassName='max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <Logo width={100} height={100} color='color-base-content' className='mb-6 opacity-20' />
              <ThemeChanger />
            </div>
          </Footer>
        </ThemeProvider>
      </body>
    </html>
  ));
