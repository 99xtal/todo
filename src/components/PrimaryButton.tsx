import React from 'react';

const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      className="px-3 py-1 bg-indigo-500 active:bg-indigo-700 text-gray-100 dark:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 focus:ring-opacity-50 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
