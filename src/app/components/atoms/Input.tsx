import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, className = '', ...props }, ref) => (
  <div>
    {label && <label className="block text-[var(--muted-foreground)] text-sm mb-1">{label}</label>}
    <input
      ref={ref}
      className={`w-full px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] ${className}`}
      {...props}
    />
  </div>
));

Input.displayName = 'Input';

export default Input; 