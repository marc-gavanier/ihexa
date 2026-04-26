import {
  actionBuilder as baseActionBuilder,
  createPageBuilder,
  createWithClientBinder,
  type PageBuilder
} from '@arckit/nextjs';
import { ClientBinder } from './client';

const errorPrefix = 'global.server-action:error';

export const withClientBinder = createWithClientBinder(ClientBinder);

export const pageBuilder = (): PageBuilder<object> => createPageBuilder(withClientBinder)({ errorPrefix });
export const actionBuilder = (): ReturnType<typeof baseActionBuilder> => baseActionBuilder({ errorPrefix });
