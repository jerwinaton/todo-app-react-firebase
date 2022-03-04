import useFetch from "../custom_hooks/useFetch";

const TodoList = () => {
  const {
    data: todos,
    isPending,
    error,
  } = useFetch("http://localhost:8000/todos");

  return (
    <div className="todo-list">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {todos && (
        <div className="todo-list-container">
          {todos.map((todo) => (
            <div className="todo-list-item" key={todo.id}>
              <p>{todo.todo}</p>
              <div>
                <button>e</button>
                <button>d</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
