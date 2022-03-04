import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <div className="todo-box">
        <h1 style={{ marginTop: 0 }}>Todo App </h1>
        <Form />
      </div>
    </div>
  );
}

export default App;
