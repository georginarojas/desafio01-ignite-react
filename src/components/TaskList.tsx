import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [arrayId, setArrayId] = useState<Array<number>>([]);

  function handleCreateNewTask() {
    const task: Task = {
      id: randomId(),
      title: newTaskTitle,
      isComplete: false,
    };
    if (newTaskTitle !== "") {
      setTasks([...tasks, task]);
      clear();
    }
  }

  function randomId() {
    let number = Math.floor(Math.random() * 100);

    while (arrayId.includes(number)) {
      number = Math.floor(Math.random() * 100);
    }
    setArrayId([...arrayId, number]);
    return number;
  }

  function handleToggleTaskCompletion(id: number) {
    let tasklist = tasks;
    for (let i = 0; i < tasklist.length; i++) {
      if (id === tasklist[i].id) {
        tasklist[i].isComplete = !tasklist[i].isComplete;
        break;
      }
    }
    setTasks([...tasklist]);
  }

  function handleRemoveTask(id: number) {
    let tasklist = tasks;
    for (let i = 0; i < tasklist.length; i++) {
      if (tasklist[i].id === id) {
        tasklist.splice(i, 1);
      }
    }
    setTasks([...tasklist]);
  }

  function clear() {
    setNewTaskTitle("");
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name={"checkebox" + task.id}
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
