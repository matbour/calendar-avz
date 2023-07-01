import clsx from 'clsx';
import { forwardRef, type ComponentPropsWithRef, type FC } from 'react';

interface FieldProps extends ComponentPropsWithRef<'div'> {}

const Field: FC<FieldProps> = forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={clsx('mb-4', className)} {...props} />;
});

Field.displayName = 'Field';

export default Field;
