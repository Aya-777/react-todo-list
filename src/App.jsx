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

  async function fetchTodos() {

    try {
      const data = await api.todos.getAll(filters);
      setTodos(data);
    } catch (error) {
      console.log("Failed to get todos. please try again later");
    }

  }

  async function handleCreate(newTodo) {
    try {
      await api.todos.create(newTodo);
      await fetchTodos(); 
    } catch (error) {
      console.log("failed to create todo, please try again later");
    }
  }

  async function handleUpdate(id, newTodo) {
    try {
      await api.todos.update(id, newTodo);
      await fetchTodos(); 
    } catch (error) {
      console.log("failed to update todo, please try again later");
    }
  }

  async function handleDelete(id) {
    try {
      await api.todos.delete(id);
      await fetchTodos();
    } catch (error) {
      console.log("failed to delete todo, please try again later");
    }
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