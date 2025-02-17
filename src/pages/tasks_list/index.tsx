import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// obviamente tipos precisam ficar antes dos services
import type { Task } from "../../types/task";

import TaskService from "../../services/TaskService";

import classes from "./sytles.module.css";

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFetchingTasks, setIsFetchingTasks] = useState(false);

  useEffect(() => {
    setIsFetchingTasks(true);

    // essa coisa aqui é uma IIFE
    // https://developer.mozilla.org/en-US/docs/Glossary/IIFE
    // effects não podem ser async, então tem que fazer gambiarra
    (async () => {
      try {
        const tasks = await TaskService.listTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsFetchingTasks(false);
      }
    })();
  }, []);

  return (
    <div>
      <header className={classes.header}>
        <h3>Tasks List</h3>
        <Link to="new">
          <Add />
          New Task
        </Link>
      </header>

      {isFetchingTasks ? (
        <div>Loading...</div>
      ) : (
        <ul className={classes.task_list}>
          {tasks.map((task) => (
            <Task key={task.title} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

interface TaskProps {
  task: Task;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  // faz isso ficar bonito
  return (
    <li className={classes.task}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>{task.state}</p>
    </li>
  );
};

export default TasksList;
