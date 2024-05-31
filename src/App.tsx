import { useEffect, useState } from 'react';
import { Button, ToDoItem } from './components';

interface Todo {
  text: string;
  completed: boolean;
}

function App() {
  const [value, setValue] = useState('');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearList = () => {
    setTodos([]);
  };

  const toggleToDo = (index: number) => {
    setTodos((oldTodos) => {
      const newTodos = oldTodos.slice();
      newTodos[index].completed = !newTodos[index].completed;
      return newTodos;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    setTodos((oldTodos) => [...oldTodos, { text: value, completed: false }]);
    setValue('');
  };

  return (
    <main className="container mx-auto p-4 max-w-xl space-y-2">
      <form onSubmit={handleSubmit}>
        <span className="flex flex-row gap-2 py-2">
          <input
            type="text"
            placeholder="What do you want to do?"
            value={value}
            onChange={handleChange}
            className="block w-full rounded-md px-3 py-1.5 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
          />
          <Button type="submit" disabled={!value.trim()}>
            Add
          </Button>
        </span>
        <div className="flex justify-end">
          <Button onClick={clearList}>Clear List</Button>
        </div>
      </form>
      <ul className="space-y-0.5">
        {todos.map((todo, i) => (
          <li key={i + todo.text}>
            <ToDoItem todo={todo} onTodoClick={() => toggleToDo(i)} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
