import { deleteDoc, doc } from "firebase/firestore";
import { todosRef } from "../firebase-config";
const TodoList = ({ todos }) => {
  const deleteTodo = (obj) => {
    // console.log(obj.target.dataset.deletethis);
    const docRef = doc(todosRef, obj.target.dataset.deletethis);
    deleteDoc(docRef);
  };
  return (
    <div className="todo-list">
      <ul className="todo-list-container">
        {todos.map((todo) => (
          <li className="todo-list-item" key={todo.id}>
            <p>{todo.todo}</p>
            <div>
              <button>e</button>
              <button data-deletethis={todo.id} onClick={deleteTodo}>
                d
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
