import { useMemo } from 'react';
import { MoonIcon, SunIcon, ToDoForm, ToDoItem } from './components';
import { useTheme, useTodos } from './hooks';
import { getRandomElement } from './utils';
import { prompts } from '../config.json';

function App() {
  const { todos, addTodo, toggleTodo, clearTodos } = useTodos();
  const { theme, toggleTheme } = useTheme();

  const placeholder = useMemo(() => getRandomElement(prompts), []);

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

  return (
    <div className="h-screen bg-zinc-100 dark:bg-zinc-800 transition-colors">
      <header className="flex justify-end px-4 py-2">
        <button onClick={toggleTheme}>
          {theme === 'dark' ? (
            <SunIcon className="w-6 h-6 text-zinc-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-zinc-500" />
          )}
        </button>
      </header>
      <main className="container mx-auto max-w-xl px-4 space-y-2 text-right">
        <ToDoForm onSubmit={addTodo} placeholder={placeholder} />
        <ul className="space-y-0.5 overflow-y-auto">
          {sortedTodos.map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onTodoClick={() => toggleTodo(todo.id)}
            />
          ))}
        </ul>
        {todos.length > 0 && (
          <button
            onClick={clearTodos}
            className="px-2 py-1 text-gray-500 hover:cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 rounded-md transition"
          >
            Clear All
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
