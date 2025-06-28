import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities";
import styles from './TodoFormFields.module.css';


export function TodoFormFields({todo={}, showAllFields }) {

  return (
    <div className={styles.FormFields}>
      <div className={styles.FormField}>
        <input required
          type="text"
          aria-label="Name*"
          placeholder="Name*"
          name="name"
          autoComplete="off"
          defaultValue={todo.name}
          minLength={3}
          maxLength={50}
        />
      </div>

      {showAllFields && <>
        <div className={styles.FormField}>
          <textarea
            aria-label="Description"
            placeholder="Description"
            name="description"
            rows="3"
            defaultValue={todo.description}
            maxLength={200}
          />
        </div>

        <div className={styles.FormGroup}>
          <div className={styles.FormField}>
            <label htmlFor="deadline">Deadline</label>
            <input 
            type="date" 
            id="deadline" 
            name="deadline" 
            defaultValue={todo.deadline}
            min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className={styles.FormField}>
            <label htmlFor="priority">Priority</label>
            <select
              defaultValue={todo.priority ?? PRIORITY_DEFAULT}
              id="priority"
              name="priority">
              {Object.entries(PRIORITIES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
              {/* second way if priorities is an array */}
              {/* {PRIORITIES.map(({ label, id }) => (
                    <option key={id}>
                      {label}
                    </option>
                  ))} */}

            </select>
          </div>
        </div>
      </>}

    </div>
  );
}