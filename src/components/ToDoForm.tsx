import React, { useState } from 'react';
import Button from './Button';

interface TodoFormProps {
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

const ToDoForm: React.FC<TodoFormProps> = ({ onSubmit, placeholder }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    onSubmit?.(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className="flex flex-row gap-2 py-2">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full rounded-md px-3 py-1.5 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-700 ring-1 ring-inset ring-zinc-600 focus:ring-2 focus:ring-inset dark:focus:ring-zinc-600 focus:outline-none transition-colors"
        />
        <Button type="submit" aria-label="add-todo" disabled={!value.trim()}>
          +
        </Button>
      </span>
    </form>
  );
};

export default ToDoForm;
