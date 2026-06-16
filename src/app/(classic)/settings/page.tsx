import { withOptionalEither } from '@arckit/nextjs/page/middlewares/either';
import { configureSellerAction } from '@/app/_actions/settings/configure-seller.action';
import { searchCompanyAction } from '@/app/_actions/settings/search-company.action';
import { i18n, type MetadataTranslation, metadataTranslation, withI18n } from '@/configuration/i18n';
import { pageBuilder, withClientBinder } from '@/configuration/nextjs';
import { withPageView } from '@/configuration/telemetry/event-tracker/server';
import {
  CONFIGURE_SELLER_KEY,
  ConfigureSellerPage,
  presentSeller,
  SEARCH_COMPANY_KEY
} from '@/features/settings/abilities/configure-seller';
import { getSellerConfiguration } from '@/features/settings/abilities/configure-seller/implementations';

export const generateMetadata: MetadataTranslation = metadataTranslation(i18n)('settings.configure-seller');

export default pageBuilder()
  .use(
    withClientBinder(CONFIGURE_SELLER_KEY, configureSellerAction),
    withClientBinder(SEARCH_COMPANY_KEY, searchCompanyAction),
    withI18n(i18n)('settings.configure-seller', 'global.server-action')
  )
  .use(withOptionalEither('seller', () => getSellerConfiguration()))
  .use(withPageView('Seller Settings'))
  .render(async ({ seller }) => <ConfigureSellerPage seller={presentSeller(seller)} />);
