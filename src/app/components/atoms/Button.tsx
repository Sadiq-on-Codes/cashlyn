import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
}

const colorClasses: Record<NonNullable<ButtonProps['color']>, string> = {
  primary: 'bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)]',
  secondary: 'bg-[var(--muted)] hover:bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)]',
  default: 'bg-[var(--card)] hover:bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)]',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', children, color = 'default', icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-400 ${colorClasses[color]} ${className}`}
        {...props}
      >
        {icon && <span className="mr-2 flex items-center">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 