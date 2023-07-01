import clsx from 'clsx';
import { forwardRef, type ComponentPropsWithRef, type FC } from 'react';

interface FieldErrorProps extends ComponentPropsWithRef<'p'> {}

const FieldError: FC<FieldErrorProps> = forwardRef(({ className, ...props }, ref) => {
  return <p ref={ref} className={clsx('text-red-700', className)} {...props} />;
});

FieldError.displayName = 'FieldError';

export default FieldError;
