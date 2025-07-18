import { useEffect, useState } from "react";
import { api } from "../api";

export function useTodos(){
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ completed: "", priority: "" });
  const [errorMessage, setErrorMessage] = useState();
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
      setErrorMessage("failed to create todo, please try again later");
    }
  }

  async function handleUpdate(id, newTodo) {
    try {
      await api.todos.update(id, newTodo);
      await fetchTodos(); 
    } catch (error) {
      setErrorMessage("failed to update todo, please try again later");
    }
  }

  async function handleDelete(id) {
    try {
      await api.todos.delete(id);
      await fetchTodos();
    } catch (error) {
      setErrorMessage("failed to delete todo, please try again later");
    }
  }
  
  return {
    data: todos,
    fetch: fetchTodos,
    filter: setFilters,
    create: handleCreate,
    update: handleUpdate,
    delete: handleDelete,
    error : {
      message : errorMessage,
      clear: () => setErrorMessage(),
    },

  };
}