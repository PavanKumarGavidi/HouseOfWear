import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { twMerge } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonLinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-950 text-white hover:bg-brand-800 active:bg-brand-900 dark:bg-white dark:text-brand-950 dark:hover:bg-brand-100',
  secondary: 'bg-brand-100 text-brand-900 hover:bg-brand-200 active:bg-brand-300 dark:bg-brand-800 dark:text-white dark:hover:bg-brand-700',
  outline: 'border border-brand-300 text-brand-900 hover:bg-brand-50 active:bg-brand-100 dark:border-brand-700 dark:text-white dark:hover:bg-brand-900',
  ghost: 'text-brand-700 hover:bg-brand-100 active:bg-brand-200 dark:text-brand-300 dark:hover:bg-brand-800',
  danger: 'bg-error text-white hover:bg-red-700 active:bg-red-800',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-[11px] gap-1',
  sm: 'h-9 px-3 text-xs gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-sm gap-2',
  xl: 'h-14 px-8 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, leftIcon, rightIcon, className, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={twMerge(
          'inline-flex items-center justify-center font-medium tracking-wide uppercase rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = 'primary', size = 'md', fullWidth, leftIcon, rightIcon, className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={twMerge(
          'inline-flex items-center justify-center font-medium tracking-wide uppercase rounded transition-all duration-200 select-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
