interface Todo {
  text: string;
  completed: boolean;
}

const ToDoItem: React.FC<{ todo: Todo; onTodoClick: () => void }> = ({
  todo,
  onTodoClick,
}) => {
  return (
    <label className="flex items-center space-x-2 hover:cursor-pointer">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onTodoClick}
        hidden
      />
      <span
        className={
          todo.completed ? 'line-through text-gray-400' : 'dark:text-gray-200'
        }
      >
        {todo.text}
      </span>
    </label>
  );
};

export default ToDoItem;
