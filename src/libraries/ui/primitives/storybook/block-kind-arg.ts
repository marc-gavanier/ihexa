import type { Kind } from '../kind';

type BlockKindArg<TName extends string> = {
  kind: {
    control: 'select';
    options: `${TName}-${Kind}`[];
  };
};

export const blockKindArg = <TName extends string>(name: TName): BlockKindArg<TName> => ({
  kind: {
    control: 'select',
    options: [`${name}-outline`, `${name}-dash`, `${name}-soft`]
  }
});
