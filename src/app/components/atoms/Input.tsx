import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, className = '', ...props }, ref) => (
  <div>
    {label && <label className="block text-gray-400 text-sm mb-1">{label}</label>}
    <input
      ref={ref}
      className={`w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  </div>
));

Input.displayName = 'Input';

export default Input; 