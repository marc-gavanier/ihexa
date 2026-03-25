import { Textarea as TextareaBase, type TextareaProps as TextareaBaseProps } from '@/libraries/ui/primitives/textarea';
import { cn } from '@/libraries/ui/utils';
import { useFieldContext } from '../form-context';
import { hasError } from './has-error';

type TextareaProps = Omit<TextareaBaseProps, 'name'> & {
  isPending: boolean;
};

export const Textarea = ({ className = 'w-full', isPending, ...props }: TextareaProps) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>();

  return (
    <TextareaBase
      id={name}
      name={name}
      value={state.value ?? ''}
      disabled={isPending ?? props.disabled}
      onBlur={handleBlur}
      onChange={(e) => handleChange(e.target.value)}
      className={cn(hasError(state) && 'textarea-error', className)}
      {...props}
    />
  );
};
