import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
const Form = () => {
  const [todo, setTodo] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoItem = { todo };
    setIsPending(true);
    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoItem),
    }).then(() => {
      setIsPending(false);
      console.log("A new todo added");
      document.querySelector(".todo-form").reset();
    });
  };

  return (
    <React.Fragment>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a todo"
          required
        />
        {!isPending && <button>Add</button>}
        {isPending && <button disabled>Adding...</button>}
      </form>
      <TodoList />
    </React.Fragment>
  );
};

export default Form;
