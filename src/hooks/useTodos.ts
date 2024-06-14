import { useCallback, useEffect, useMemo, useState } from 'react';
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

  const sortedTodos = useMemo(
    () =>
      todos.slice().sort((a, b) => {
        if (a.completedTime && b.completedTime) {
          return b.completedTime - a.completedTime;
        }
        if (!a.completedTime && !b.completedTime) {
          return b.createdTime - a.createdTime;
        }
        return a.completedTime ? 1 : -1;
      }),
    [todos]
  );

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
    todos: sortedTodos,
    addTodo,
    clearTodos,
    toggleTodo,
  };
}
