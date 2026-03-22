import type { Scale } from '../scale';

type ScaleArg<TName extends string> = {
  scale: {
    control: 'select';
    options: `${TName}-${Scale}`[];
  };
};

export const scaleArg = <TName extends string>(name: TName): ScaleArg<TName> => ({
  scale: {
    control: 'select',
    options: [`${name}-xl`, `${name}-lg`, `${name}-md`, `${name}-sm`, `${name}-xs`]
  }
});
