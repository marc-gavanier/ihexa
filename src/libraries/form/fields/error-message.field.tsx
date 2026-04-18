import type { ReactNode } from 'react';
import { useFieldContext } from '../form-context';
import { hasError } from './has-error';

const hasExactlyOne = <T,>(items: T[]): items is [T] => items.length === 1;

export const ErrorMessage = ({
  errors: errorsProp = [],
  formatMessage,
  template,
  className = 'text-error mt-1 text-xs'
}: {
  errors?: Error[];
  formatMessage?: (key: never) => string;
  template?: (field: string, message: string) => string;
  className?: string;
}): ReactNode => {
  const { name, state } = useFieldContext<string>();
  const errors: Error[] = [...state.meta.errors, ...errorsProp];
  const format = (message: string) => {
    const key = template ? template(name, message) : message;
    return formatMessage ? (formatMessage as (key: string) => string)(key) : key;
  };

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
