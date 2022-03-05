import { deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { todosRef } from "../firebase-config";
import { useState } from "react";
const TodoList = ({ todos }) => {
  const [editedTodo, setEditedTodo] = useState("");
  // delete function
  const deleteTodo = (obj) => {
    // console.log(obj.target.dataset.deletethis);
    const todoToDelete = obj.target.dataset.deletethis;
    const docRef = doc(todosRef, todoToDelete);
    deleteDoc(docRef);
  };
  // edit function
  const editTodo = (obj) => {
    // get id of document/todo
    const todoToEdit = obj.target.dataset.editthis;

    // get input field and p elements of the selected list item
    // show input field
    const editField = document.querySelector(`input[data-id="${todoToEdit}"`);
    editField.removeAttribute("hidden");

    // get value of <p> element and put it to input field
    const todoText = document.querySelector(`p[data-id="${todoToEdit}"`);
    editField.setAttribute("value", todoText.textContent);

    // hide p element
    todoText.setAttribute("hidden", true);

    // get buttons
    // hide delete and edit button
    document
      .querySelector(`.edit-btn[data-editthis="${todoToEdit}"]`)
      .setAttribute("hidden", true);
    document
      .querySelector(`.delete-btn[data-deletethis="${todoToEdit}"]`)
      .setAttribute("hidden", true);
    document
      .querySelector(`.save-btn[data-savethis="${todoToEdit}"]`)
      .removeAttribute("hidden");
  };
  // save function
  const saveTodo = async (obj) => {
    let id = obj.target.dataset.savethis;

    // reset the form/input and <p> element
    const reset = () => {
      // get input field and p elements of the selected list item
      const editField = document.querySelector(`input[data-id="${id}"`);
      const todoText = document.querySelector(`p[data-id="${id}"`);

      // get value of <p> element and put it to input field
      editField.setAttribute("value", todoText.textContent);
      // get buttons
      const editBtn = document.querySelector(
        `.edit-btn[data-editthis="${id}"]`
      );
      const delBtn = document.querySelector(
        `.delete-btn[data-deletethis="${id}"]`
      );
      const saveBtn = document.querySelector(
        `.save-btn[data-savethis="${id}"]`
      );

      // hide save button
      saveBtn.setAttribute("hidden", true);

      // show delete and edit button
      editBtn.removeAttribute("hidden");
      delBtn.removeAttribute("hidden");

      // hide input field
      editField.setAttribute("hidden", true);

      // show p element
      todoText.removeAttribute("hidden");
    };

    const todoDocRef = doc(todosRef, id);
    try {
      await updateDoc(todoDocRef, {
        todo: editedTodo,
        timestamp: serverTimestamp(),
      });
      //  reset
      reset();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="todo-list">
      <ul className="todo-list-container">
        {todos.map((todo) => (
          <li className="todo-list-item" key={todo.id}>
            <p data-id={todo.id}>{todo.todo}</p>
            <input
              type="text"
              data-id={todo.id}
              data-savethis={todo.id}
              className="edit-field"
              onChange={(e) => setEditedTodo(e.target.value)}
              hidden
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveTodo(e);
                }
              }}
            />
            <div>
              <button
                className="edit-btn"
                data-editthis={todo.id}
                onClick={editTodo}
              >
                e
              </button>
              <button
                className="delete-btn"
                data-deletethis={todo.id}
                onClick={deleteTodo}
              >
                d
              </button>
              <button
                className="save-btn"
                data-savethis={todo.id}
                onClick={saveTodo}
                hidden
              >
                s
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
