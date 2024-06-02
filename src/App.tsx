import { useMemo, useState } from 'react';
import { Button, SunIcon, ToDoItem } from './components';
import MoonIcon from './components/MoonIcon';
import useTheme from './hooks/useTheme';
import useTodos from './hooks/useTodos';

const todoPrompts = [
  'What do you want to do?',
  'What do you want to accomplish?',
  'What do you want to achieve?',
  'What do you want to complete?',
  'What do you want to finish?',
  'What do you want to work on?',
  'What do you want to start?',
  'What do you want to improve?',
];

function App() {
  const [value, setValue] = useState('');
  const { todos, addTodo, toggleTodo } = useTodos();
  const { theme, toggleTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    addTodo(value);
    setValue('');
  };

  const placeholder = useMemo(
    () => todoPrompts[Math.floor(Math.random() * todoPrompts.length)],
    []
  );

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
    <div className={theme === 'dark' ? 'dark' : ''}>
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
        <main className="container mx-auto max-w-xl px-4 space-y-2">
          <form onSubmit={handleSubmit}>
            <span className="flex flex-row gap-2 py-2">
              <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="w-full rounded-md px-3 py-1.5 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-700 ring-1 ring-inset ring-zinc-600 focus:ring-2 focus:ring-inset dark:focus:ring-zinc-600 focus:outline-none transition-colors"
              />
              <Button
                type="submit"
                aria-label="add-todo"
                disabled={!value.trim()}
              >
                +
              </Button>
            </span>
          </form>
          <ul className="space-y-0.5 overflow-y-auto">
            {sortedTodos.map((todo) => (
              <li key={todo.id} className="w-fit">
                <ToDoItem todo={todo} onTodoClick={() => toggleTodo(todo.id)} />
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
