import type { InjectionKey } from 'piqure/src/Providing';
import { ClientBinder } from './client.binder';

export const withClientBinder =
  <TBind, TTo extends TBind>(bind: InjectionKey<TBind>, to: TTo) =>
  async () => ({
    ctx: {},
    provider: {
      component: ClientBinder<TBind, TTo>,
      props: { bind, to }
    }
  });
