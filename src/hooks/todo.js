import { useEffect, useState } from "react";
import { api } from "../api";

export function useTodos(){
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ completed: "", priority: "" });
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { fetchTodos(); }, [filters]);

  async function fetchTodos() {
    setIsLoading(true);
    try {
      const data = await api.todos.getAll(filters);
      setTodos(data);
    } catch (error) {
      console.log("Failed to get todos. please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate(newTodo) {
    setIsLoading(true);
    try {
      await api.todos.create(newTodo);
      await fetchTodos(); 
    } catch (error) {
      setErrorMessage("failed to create todo, please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(id, newTodo) {
    setIsLoading(true);
    try {
      await api.todos.update(id, newTodo);
      await fetchTodos(); 
    } catch (error) {
      setErrorMessage("failed to update todo, please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    setIsLoading(true);
    try {
      await api.todos.delete(id);
      await fetchTodos();
    } catch (error) {
      setErrorMessage("failed to delete todo, please try again later");
    } finally {
      setIsLoading(false);
    }
  }
  
  return {
    isLoading,
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