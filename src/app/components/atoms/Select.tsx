import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, className = '', children, ...props }) => (
  <div>
    {label && <label className="block text-gray-400 text-sm mb-1">{label}</label>}
    <select
      className={`w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    >
      {children}
    </select>
  </div>
);

export default Select; 