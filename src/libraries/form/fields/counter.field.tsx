import { cn } from '@/libraries/ui/utils';
import { useFieldContext } from '../form-context';

type CounterProps = {
  max: number;
  className?: string;
};

export const Counter = ({ max, className }: CounterProps) => {
  const { state } = useFieldContext<string>();
  const count = state.value?.length ?? 0;

  return (
    <span className={cn('ml-auto mt-1 text-xs text-neutral', className)}>
      {count}/{max}
    </span>
  );
};
