import "./App.css";
import { todosRef } from "./firebase-config.js";
import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import {
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, listen to db and fetch new records when todos state changes
  useEffect(() => {
    // set focus to add todo input field
    document.querySelector(".todo-form input").focus();
    // real time collection data
    const todosQuery = query(todosRef, orderBy("timestamp", "desc"), limit(10));
    onSnapshot(todosQuery, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
      );
    });
  }, []);

  // function to add todos
  const addTodo = (e) => {
    e.preventDefault();
    // diabale input and add button
    const inputField = document.querySelector(".todo-form input");
    inputField.setAttribute("disabled", true);
    const button = document.querySelector(".todo-form button");
    button.setAttribute("disabled", true);
    button.textContent = "Adding...";
    // adding documents
    addDoc(todosRef, {
      todo: input,
      timestamp: serverTimestamp(),
    }).then(() => {
      setInput("");
      inputField.removeAttribute("disabled");
      button.textContent = "Add";
      // set focus to add todo input field
      document.querySelector(".todo-form input").focus();
    });
  };

  // delete function

  return (
    <div className="App">
      <div className="todo-box">
        <h1 style={{ marginTop: 0 }}>Todo App </h1>
        <form className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a todo"
            required
            value={input}
          />
          {/* <button type="submit">Add</button> */}
          <button disabled={!input} type="submit">
            Add
          </button>
        </form>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
