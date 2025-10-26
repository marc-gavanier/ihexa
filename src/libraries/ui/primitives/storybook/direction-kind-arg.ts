import type { Direction } from '../direction';

type BlockDirectionArg<TName extends string> = {
  direction: {
    control: 'select';
    options: `${TName}-${Direction}`[];
  };
};

export const directionArg = <TName extends string>(name: TName): BlockDirectionArg<TName> => ({
  direction: {
    control: 'select',
    options: [`${name}-vertical`, `${name}-horizontal`]
  }
});
