import clsx from 'clsx';
import { forwardRef, type ComponentPropsWithRef, type FC } from 'react';

interface InputProps extends ComponentPropsWithRef<'input'> {}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx('border border-gray-400 rounded py-1 px-2 w-full', className)}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
