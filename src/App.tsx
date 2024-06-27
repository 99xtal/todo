import { useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { MoonIcon, SunIcon, ToDoForm, ToDoItem } from './components';
import { useInstallPrompt, useSettings, useTheme, useTodos } from './hooks';
import { getRandomElement } from './utils';
import { prompts } from '../config.json';
import { SecondaryButton } from './elements';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { todos, addTodo, toggleTodo, clearTodos } = useTodos();
  const { theme, toggleTheme } = useTheme();
  const { isInstallable, promptInstall } = useInstallPrompt();
  const { settings, setSetting } = useSettings();

  useEffect(() => {
    if (isInstallable && !settings.hideInstallPrompt) {
      toast("Install 'Todo' to your device", {
        onClick: async () => {
          const userChoice = await promptInstall();

          if (userChoice?.outcome === 'accepted') {
            toast('Installed successfully!');
          } else if (userChoice?.outcome === 'dismissed') {
            setSetting('hideInstallPrompt', true);
          }
        },
        onClose: () => {
          setSetting('hideInstallPrompt', true);
        },
      });
    }
  }, [isInstallable, settings.hideInstallPrompt, promptInstall, setSetting]);

  const placeholder = useMemo(() => getRandomElement(prompts), []);

  return (
    <div className="h-screen bg-zinc-100 dark:bg-zinc-800 transition-colors">
      <header className="flex justify-end px-4 py-2">
        <button
          onClick={toggleTheme}
          aria-label={
            theme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'
          }
        >
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
          {todos.map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onTodoClick={() => toggleTodo(todo.id)}
            />
          ))}
        </ul>
        {todos.length > 0 && (
          <SecondaryButton onClick={clearTodos}>Clear All</SecondaryButton>
        )}
      </main>
      <ToastContainer hideProgressBar position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
