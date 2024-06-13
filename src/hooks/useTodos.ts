import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../types';

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
      const newTodo: Todo = {
        id: uuidv4(),
        text,
        createdTime: Date.now(),
        completedTime: null,
      };
      setTodos((oldTodos) => [...oldTodos, newTodo]);
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((oldTodos) => {
        const newTodos = oldTodos.slice();
        const index = newTodos.findIndex((todo) => todo.id === id);
        if (index === -1) return oldTodos;

        if (oldTodos[index].completedTime) {
          newTodos[index].completedTime = null;
        } else {
          newTodos[index].completedTime = Date.now();
        }

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
