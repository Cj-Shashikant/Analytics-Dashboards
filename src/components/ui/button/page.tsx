import React from 'react';
import { buttonStyles, ButtonVariant, ButtonSize } from './style';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'default',
      children,
      ...props
    },
    ref
  ) => {
    const buttonClass = buttonStyles({ variant, size, className });

    return (
      <button ref={ref} data-slot="button" className={buttonClass} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
