import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div>
    {label && <label className="block text-gray-400 text-sm mb-1">{label}</label>}
    <input
      className={`w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  </div>
);

export default Input; 