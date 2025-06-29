import { useState } from 'react';
import { PRIORITIES, PRIORITY_DEFAULT } from '../../constants/priorities';
import styles from './TodoListItem.module.css';
import { TodoFormFields } from '../TodoFormFields/TodoFormFields';
import { useForm } from 'react-hook-form';
import { getTodoSchema} from "../../schemas/todo";
import { yupResolver } from "@hookform/resolvers/yup";

export function TodolistItem({ todo, onUpdate, onDelete }) {

  const [isEditing, setIsEditing] = useState(false);
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver : yupResolver(getTodoSchema()),
    defaultValues: todo
  });

  function handleCompleted(event) {
    onUpdate(todo.id, { ...todo, completed: event.target.checked });
  }

  function handleEdit(data){
    onUpdate(todo.id, data);
    setIsEditing(false);
  }

  const viewingTemplate = (
    <div className={styles.Content}>
      <input
        type="checkbox"
        name="completed"
        checked={todo.completed}
        onChange={handleCompleted}
        className={styles.Status}
      />
      <div className={styles.Info}>
        {todo.name}
        {todo.description && (
          <span className={styles.Description}>{todo.description}</span>
        )}

        <div className={styles.AdditionalInfo}>
          {todo.deadline}{" "}
          {todo.priority !== PRIORITY_DEFAULT && (
            <span style={{ color: PRIORITIES[todo.priority].color }}>
              {PRIORITIES[todo.priority].label}
            </span>
          )}
        </div>
      </div>

          <div className={styles.Controls}>
            <button onClick={() => setIsEditing(true)}>📝</button>
            <button onClick={()=>{onDelete(todo.id)}}>🗑️</button>
          </div>
    </div>
  );

  const editingTemplate = (
    <form
    className={styles.Content} 
    onReset={()=>{setIsEditing(false)}}
    onSubmit={ handleSubmit(handleEdit)}
    >
      <TodoFormFields 
      todo={todo} 
      showAllFields={true} 
      register={register}
      errors={errors}
      />
      <div className={styles.Controls}>
        <input type='submit' value="💾" />
        <input type='reset' value="❌" />
      </div>
    </form>
  );

  return (
    <li
    className={styles.TodoListItem}
    data-completed={todo.completed}>
      {isEditing ? editingTemplate : viewingTemplate}
    </li>
  );
}