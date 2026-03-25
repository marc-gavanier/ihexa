import type { ReactNode } from 'react';
import { useFieldContext } from '../form-context';

const hasExactlyOne = <T,>(items: T[]): items is [T] => items.length === 1;

export const Info = ({
  errors: errorsProp = [],
  formatMessage,
  className = 'text-error mt-1 text-xs'
}: {
  errors?: Error[];
  formatMessage?: (...args: never) => string;
  className?: string;
}): ReactNode => {
  const format = (formatMessage as ((key: string) => string) | undefined) ?? ((message: string) => message);
  const { state } = useFieldContext<string>();
  const errors: Error[] = [...state.meta.errors, ...errorsProp];

  return errors.length > 0 ? (
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
