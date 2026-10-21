import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1.5 font-medium"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={twMerge(
              'w-full h-11 px-3.5 rounded border text-sm transition-colors',
              'bg-white dark:bg-brand-900',
              'border-brand-200 dark:border-brand-700',
              'text-brand-950 dark:text-white',
              'placeholder:text-brand-400 dark:placeholder:text-brand-500',
              'focus:outline-none focus:border-brand-950 dark:focus:border-white',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-error focus:border-error',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs text-brand-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
