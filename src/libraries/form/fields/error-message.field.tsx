import type { ReactNode } from 'react';
import { useFieldContext } from '../form-context';

const hasExactlyOne = <T,>(items: T[]): items is [T] => items.length === 1;

export const ErrorMessage = ({
  errors: errorsProp = [],
  formatMessage,
  template,
  className = 'text-error mt-1 text-xs'
}: {
  errors?: Error[];
  formatMessage?: (...args: never) => string;
  template?: (field: string, message: string) => string;
  className?: string;
}): ReactNode => {
  const format = (formatMessage as ((key: string) => string) | undefined) ?? ((message: string) => message);
  const { name, state } = useFieldContext<string>();
  const errors: Error[] = [...state.meta.errors, ...errorsProp];

  return errors.length > 0 ? (
    hasExactlyOne(errors) ? (
      <p className={className}>{format(template ? template(name, errors[0].message) : errors[0].message)}</p>
    ) : (
      <ul className={className}>
        {errors.map(({ message }) => (
          <li key={message}>{format(template ? template(name, message) : message)}</li>
        ))}
      </ul>
    )
  ) : null;
};
