import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

// obviamente tipos precisam ficar antes dos services
import type { Task, TaskState } from "../../types/task";

import TaskService from "../../services/taskService";

import classes from "./sytles.module.css";

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      title: "Task 1",
      description: "Description 1",
      state: "To Do",
    },
    {
      title: "Task 2",
      description: "Description 2",
      state: "Doing",
    },
    {
      title: "Task 3",
      description: "Description 3",
      state: "Done",
    },
    {
      title: "Task 4",
      description: "Description 4",
      state: "To Do",
    },
  ]);
  const [isFetchingTasks, setIsFetchingTasks] = useState(false);

  function handleChangeTaskState(taskTitle: string, state: TaskState) {
    const newTasks = tasks.map((t) => {
      if (t.title === taskTitle) {
        return { ...t, state };
      }
      return t;
    });

    setTasks(newTasks);
  }

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
        <Tasks tasks={tasks} onChangeTaskState={handleChangeTaskState} />
      )}
    </div>
  );
};

interface TasksProps {
  tasks: Task[];
  onChangeTaskState: (taskTitle: string, state: TaskState) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, onChangeTaskState }) => {
  const draftTasks = tasks.filter((task) => task.state === "Draft");
  const todoTasks = tasks.filter((task) => task.state === "To Do");
  const doingTasks = tasks.filter((task) => task.state === "Doing");
  const doneTasks = tasks.filter((task) => task.state === "Done");

  return (
    <div className={classes.task_list_container}>
      <DndContext
        onDragEnd={(e) => {
          const title = e.active.id as string;
          const target = e.over?.id;

          if (target !== "Draft" && target !== "To Do" && target !== "Doing" && target !== "Done")
            return;

          onChangeTaskState(title, target);
        }}
      >
        <Droppable title="Draft">
          {draftTasks.map((task, index) => (
            // TODO: Usar o id das tasks como key, atualizar os tipos e todo o resto
            <TaskComp key={index} task={task} />
          ))}
        </Droppable>

        <Droppable title="To Do">
          {todoTasks.map((task, index) => (
            // TODO: Usar o id das tasks como key, atualizar os tipos e todo o resto
            <TaskComp key={index} task={task} />
          ))}
        </Droppable>

        <Droppable title="Doing">
          {doingTasks.map((task, index) => (
            // TODO: aqui tb
            <TaskComp key={index} task={task} />
          ))}
        </Droppable>

        <Droppable title="Done">
          {doneTasks.map((task, index) => (
            // TODO: e aqui
            <TaskComp key={index} task={task} />
          ))}
        </Droppable>
      </DndContext>
    </div>
  );
};

interface DroppableProps {
  children: React.ReactNode;
  title: string;
}

const Droppable: React.FC<DroppableProps> = ({ children, title }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  const style = {
    backgroundColor: isOver ? "#222" : undefined,
  };

  return (
    <div>
      <h3>{title}</h3>
      <ul style={style} ref={setNodeRef}>
        {children}
      </ul>
    </div>
  );
};

interface TaskProps {
  task: Task;
}

const TaskComp: React.FC<TaskProps> = ({ task }) => {
  const { setNodeRef, transform, listeners, attributes } = useDraggable({
    id: task.title,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  // faz isso ficar bonito
  return (
    <li
      style={style}
      ref={setNodeRef}
      className={classes.task}
      {...listeners}
      {...attributes}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>{task.state}</p>
    </li>
  );
};

export default TasksList;
