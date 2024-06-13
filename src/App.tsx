import { useMemo } from 'react';
import { MoonIcon, SunIcon, ToDoForm, ToDoItem } from './components';
import { useTheme, useTodos } from './hooks';

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
  const { todos, addTodo, toggleTodo, clearTodos } = useTodos();
  const { theme, toggleTheme } = useTheme();

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
    <div>
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
              <li
                key={todo.id}
                className="space-x-2 px-2 py-1 hover:cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 rounded-md transition"
              >
                <ToDoItem todo={todo} onTodoClick={() => toggleTodo(todo.id)} />
              </li>
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
    </div>
  );
}

export default App;
