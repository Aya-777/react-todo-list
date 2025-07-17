import { useEffect, useState } from "react";
import { TodoForm } from "./components/TodoForm/TodoForm";
import styles from "./App.module.css";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoFilters } from "./components/TodoFilters/TodoFilters";

function App() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ completed: "", priority: "" });
  useEffect(() => { fetchTodos(); }, [filters]);

  function fetchTodos() {
    const searchParams = new URLSearchParams(filters).toString();
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos?${searchParams}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if(res.ok) return res.json();
        if(res.status === 404) return [];
      })
      .then(setTodos);
  }


  function handleCreate(newTodo) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTodo)
    })
      .then((res) => !!res.ok && res.json())
      .then(fetchTodos);
  }

  function handleUpdate(id, newTodo) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTodo)
    })
      .then((res) => !!res.ok && res.json())
      .then(fetchTodos);
  }

  function handleDelete(id) {
      fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => !!res.ok && res.json())
      .then(fetchTodos);  
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