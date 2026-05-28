import {
  actionBuilder as baseActionBuilder,
  createPageBuilder,
  createWithClientBinder,
  type PageBuilder
} from '@arckit/nextjs';
import { withActionScope, wrapWithScope } from '@/configuration/telemetry/context/server';
import { ClientBinder } from './client';

const errorPrefix = 'global.server-action:error';

export const withClientBinder = createWithClientBinder(ClientBinder);

export const pageBuilder = (): PageBuilder<object> => createPageBuilder(withClientBinder)({ errorPrefix, wrap: wrapWithScope });

export const actionBuilder = (): ReturnType<typeof baseActionBuilder> =>
  baseActionBuilder({ errorPrefix }).use(withActionScope);
