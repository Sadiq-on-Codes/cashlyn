import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
}

const colorClasses: Record<NonNullable<ButtonProps['color']>, string> = {
  primary: 'bg-[#C8EE44] hover:bg-[#B6E03D] text-black',
  secondary: 'bg-[#EEFEF2] hover:bg-[#D6F5E3] text-gray-800 border border-gray-200',
  default: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200',
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