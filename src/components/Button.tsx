import React from 'react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="my-auto px-2 py-0.5 ring-1 ring-inset ring-gray-300 bg-gray-200 active:bg-gray-400"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
