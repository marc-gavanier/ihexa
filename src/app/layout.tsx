import { i18n } from '@/configuration/i18n';
import { type TranslationProps, withI18n, withLang, withTranslation } from '@/libraries/i18n';
import '@/libraries/i18n/resource-loader.node';
import { layoutBuilder } from '@/libraries/nextjs/layout';
import '@/styles/globals.css';
import { contentId, skipLinksId } from '@/libraries/ui/blocks/skip-links/skip-links';
import { SkipLinksPortalClient } from '@/libraries/ui/blocks/skip-links/skip-links-portal-client';
import { ToasterClient } from '@/libraries/ui/blocks/toaster-client';

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
      <body className='antialiased'>
        <ToasterClient directionY='toast-top' />
        <div id={skipLinksId} />
        <header className='navbar bg-base-100 border-base-300 border-b'>
          <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'></div>
        </header>
        <div className='mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8'>
          <SkipLinks />
          <main id={contentId}>{children}</main>
        </div>
      </body>
    </html>
  ));
