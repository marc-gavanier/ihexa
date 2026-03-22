import type { StatusColor } from '../color';

type StatusColorArg<TName extends string> = {
  color: {
    control: 'select';
    options: `${TName}-${StatusColor}`[];
  };
};

export const statusColorArg = <TName extends string>(name: TName): StatusColorArg<TName> => ({
  color: {
    control: 'select',
    options: [`${name}-info`, `${name}-success`, `${name}-warning`, `${name}-error`]
  }
});
