import { Link, type LinkProps } from '@/libraries/ui/primitives/link';
import { useFormContext } from '../form-context';

export const QueryLink = ({
  queryParam,
  pathname,
  ...props
}: {
  queryParam: string;
  pathname: string;
} & Omit<LinkProps, 'href'>) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={({ values }) => String(values[queryParam] ?? '')}>
      {(value) => <Link href={{ pathname, query: value.length > 0 ? { [queryParam]: value } : {} }} {...props} />}
    </form.Subscribe>
  );
};
