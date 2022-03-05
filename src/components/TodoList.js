const TodoList = ({ todos }) => {
  return (
    <div className="todo-list">
      <ul className="todo-list-container">
        {todos.map((todo) => (
          <li className="todo-list-item" key={todo.id}>
            <p>{todo}</p>
            <div>
              <button>e</button>
              <button>d</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
