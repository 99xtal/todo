const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <input
      type="text"
      className="w-full rounded-md px-3 py-1.5 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-700 ring-1 ring-inset ring-zinc-600 focus:ring-2 focus:ring-inset dark:focus:ring-zinc-600 focus:outline-none transition-colors"
      {...props}
    />
  );
};

export default TextInput;
