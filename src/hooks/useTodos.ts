import { useCallback, useEffect, useState } from 'react';

interface Todo {
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
      setTodos((oldTodos) => [...oldTodos, { text, completed: false }]);
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (index: number) => {
      setTodos((oldTodos) => {
        const newTodos = oldTodos.slice();
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
