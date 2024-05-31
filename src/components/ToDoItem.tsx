interface Todo {
  text: string;
  completed: boolean;
}

const ToDoItem: React.FC<{ todo: Todo; onTodoClick: () => void }> = ({
  todo,
  onTodoClick,
}) => {
  return (
    <label className="flex items-center space-x-2 p-1 hover:cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 rounded-md transition">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onTodoClick}
        hidden
      />
      <span
        className={`transition ${
          todo.completed ? 'line-through text-gray-400' : 'dark:text-gray-200'
        }`}
      >
        {todo.text}
      </span>
    </label>
  );
};

export default ToDoItem;
