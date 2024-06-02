interface Todo {
  text: string;
  completedTime: number | null;
}

const ToDoItem: React.FC<{ todo: Todo; onTodoClick: () => void }> = ({
  todo,
  onTodoClick,
}) => {
  return (
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
  );
};

export default ToDoItem;
