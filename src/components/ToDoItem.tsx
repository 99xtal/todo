import { useState } from 'react';
import { Todo } from '../types';

interface Props {
  todo: Todo;
  onTodoClick: () => void;
}

const ToDoItem: React.FC<Props> = ({ todo, onTodoClick }) => {
  const [startX, setStartX] = useState<number>(0);
  const [left, setLeft] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    setLeft(diffX);
  };

  const handleTouchEnd = () => {
    setLeft(0);
  };

  return (
    <li
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ transform: `translateX(${left}px)` }}
      className="space-x-2 px-2 py-1 hover:cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 rounded-md transition"
    >
      <label className="flex items-center hover:cursor-pointer">
        <input
          type="checkbox"
          checked={!!todo.completedTime}
          onChange={onTodoClick}
          hidden
        />
        <span
          className={`transition text-left ${
            todo.completedTime
              ? 'line-through text-gray-400'
              : 'dark:text-gray-200'
          }`}
        >
          {todo.text}
        </span>
      </label>
    </li>
  );
};

export default ToDoItem;
