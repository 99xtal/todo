import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback(
    (text: string) => {
      const id = uuidv4();
      setTodos((oldTodos) => [...oldTodos, { id, text, completed: false }]);
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((oldTodos) => {
        const newTodos = oldTodos.slice();
        const index = newTodos.findIndex((todo) => todo.id === id);
        if (index === -1) return oldTodos;

        newTodos[index].completed = !newTodos[index].completed;
        return newTodos;
      });
    },
    [setTodos]
  );

  const clearTodos = useCallback(() => {
    setTodos([]);
  }, [setTodos]);

  return {
    todos,
    addTodo,
    clearTodos,
    toggleTodo,
  };
}
