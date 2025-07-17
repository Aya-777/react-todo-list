import { useEffect, useState } from "react";
import { TodoForm } from "./components/TodoForm/TodoForm";
import styles from "./App.module.css";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoFilters } from "./components/TodoFilters/TodoFilters";
import { api } from "./api.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ completed: "", priority: "" });
  useEffect(() => { fetchTodos(); }, [filters]);

  function fetchTodos() {
    api.todos.getAll(filters).then(setTodos);
  }

  function handleCreate(newTodo) {
    api.todos.create(newTodo).then(fetchTodos);
  }

  function handleUpdate(id, newTodo) {
    api.todos.update(id, newTodo).then(fetchTodos);
  }

  function handleDelete(id) {
      api.todos.delete(id).then(fetchTodos);  
    }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do.png" />
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}>
        <TodoForm onCreate={handleCreate} />
        <TodoFilters onFilter={setFilters} />
        <TodoList
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;