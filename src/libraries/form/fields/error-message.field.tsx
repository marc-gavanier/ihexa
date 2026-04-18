import type { ReactNode } from 'react';
import { useFieldContext } from '../form-context';
import { hasError } from './has-error';

const hasExactlyOne = <T,>(items: T[]): items is [T] => items.length === 1;

export const ErrorMessage = ({
  errors: errorsProp = [],
  formatMessage = (message) => message,
  template,
  className = 'text-error mt-1 text-xs'
}: {
  errors?: Error[];
  // biome-ignore lint/suspicious/noExplicitAny: must accept any translation function signature (e.g. i18next TFunction)
  formatMessage?: (key: any) => string;
  template?: (field: string, message: string) => string;
  className?: string;
}): ReactNode => {
  const { name, state } = useFieldContext<string>();
  const errors: Error[] = [...state.meta.errors, ...errorsProp];
  const format = (message: string) => formatMessage(template ? template(name, message) : message);

  return hasError(state) || errorsProp.length > 0 ? (
    hasExactlyOne(errors) ? (
      <p className={className}>{format(errors[0].message)}</p>
    ) : (
      <ul className={className}>
        {errors.map(({ message }) => (
          <li key={message}>{format(message)}</li>
        ))}
      </ul>
    )
  ) : null;
};
