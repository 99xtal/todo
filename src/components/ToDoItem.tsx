import { Todo } from '../types';

interface Props {
  todo: Todo;
  onTodoClick: () => void;
}

const ToDoItem: React.FC<Props> = ({ todo, onTodoClick }) => {
  return (
    <li className="space-x-2 px-2 py-1 hover:cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 rounded-md transition">
      <label className="flex items-center hover:cursor-pointer">
        <input
          type="checkbox"
          checked={!!todo.completedTime}
          onChange={onTodoClick}
          hidden
        />
        <span
          className={`transition ${
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
