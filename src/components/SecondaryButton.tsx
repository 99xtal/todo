import React from 'react';

const SecondaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      className="px-2 py-1 text-gray-500 hover:cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 rounded-md transition"
      {...props}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
