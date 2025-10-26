import type { ReactNode } from 'react';

export type ComponentErrorHandler<T extends { _tag: string }> = {
  [K in T['_tag']]: {
    render: (value: Extract<T, { _tag: K }> extends { value: infer V } ? V : never) => ReactNode;
  };
};

export const componentErrorFor =
  <T extends { _tag: string }, K extends keyof ComponentErrorHandler<T> & T['_tag']>(error: Extract<T, { _tag: K }>) =>
  (errorHandler: ComponentErrorHandler<T>): ReactNode => {
    const value = 'value' in error ? error.value : undefined;

    return errorHandler[error._tag].render(value as never);
  };
