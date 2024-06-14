import React, { useState } from 'react';
import { PrimaryButton, TextInput } from '../elements';

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
        <TextInput
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <PrimaryButton
          type="submit"
          aria-label="add-todo"
          disabled={!value.trim()}
        >
          +
        </PrimaryButton>
      </span>
    </form>
  );
};

export default ToDoForm;
