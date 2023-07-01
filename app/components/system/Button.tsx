import clsx from 'clsx';
import Link, { type LinkProps } from 'next/link';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ForwardedRef,
  type ReactNode,
} from 'react';

const sizes = {
  sm: 'text-sm py-1 px-2',
  md: 'text-base py-2 px-4',
} satisfies Record<string, string>;

const variants = {
  none: '',
  primary: 'bg-sky-500 font-semibold rounded text-white',
  secondary: 'bg-gray-500 font-semibold rounded text-white',
} satisfies Record<string, string>;

export type ButtonProps = (
  | ComponentPropsWithoutRef<'button'>
  | (Pick<LinkProps, 'href'> & Pick<ComponentPropsWithoutRef<'a'>, 'target'>)
) & {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
};

const spinner = (
  <div className="mx-auto w-[1.5em] aspect-square border-2 border-[currentColor] border-b-transparent border-l-transparent rounded-full animate-spin" />
);

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      isLoading = false,
      className: className_,
      children,
      ...props
    },
    ref,
  ) => {
    const className = clsx(sizes[size], variants[variant], className_);
    const content = <>{isLoading ? spinner : children}</>;

    if ('href' in props) {
      return (
        <Link ref={ref as ForwardedRef<HTMLAnchorElement>} className={className} {...props}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref as ForwardedRef<HTMLButtonElement>} className={className} {...props}>
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
