import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState, useEffect, useRef } from "react";
import { Add } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import type { Task, TaskState, TaskFilters } from "../../types/task";

import TaskService from "../../services/taskService";

import SideBar from "../../components/sidebar";

import classes from "./sytles.module.css";
import theme from "../../theme";

const TasksList: React.FC = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isFetchingTasks, setIsFetchingTasks] = useState(false);
	const [currentFilters, setCurrentFilters] = useState<TaskFilters>({});

	const handleApplyFilters = (filters: TaskFilters) => {
		setCurrentFilters(filters);
	};

	const handleResetFilters = () => {
		setCurrentFilters({});
	};

	useEffect(() => {
		const fetchTasks = async () => {
			setIsFetchingTasks(true);
			try {
				const tasks = await TaskService.listTasks(currentFilters);
				setTasks(tasks);
			} catch (error) {
				console.error("Error fetching tasks:", error);
			} finally {
				setIsFetchingTasks(false);
			}
		};

		fetchTasks();
	}, [currentFilters]);

	// TODO: aplicar servico de updateTask
	function handleChangeTaskState(taskId: string, state: TaskState) {
		const newTasks = tasks.map((t) => {
			if (t.id === taskId) {
				return { ...t, state };
			}
			return t;
		});

		setTasks(newTasks);
	}

	return (
		<div>
			<SideBar
				open={sidebarOpen}
				toggle={() => setSidebarOpen((p) => !p)}
				onOpen={() => setSidebarOpen(true)}
				onClose={() => setSidebarOpen(false)}
				onApplyFilters={handleApplyFilters}
				onResetFilters={handleResetFilters}
			/>

			<header className={classes.header}>
				<h3>Tasks List</h3>
				<Link
					style={{
						background: theme.palette.primary.dark,
						color: theme.palette.primary.contrastText,
					}}
					to="new"
				>
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
	const draftTasks = tasks.filter((task) => task.state === "draft");
	const todoTasks = tasks.filter((task) => task.state === "todo");
	const doingTasks = tasks.filter((task) => task.state === "doing");
	const doneTasks = tasks.filter((task) => task.state === "done");

	return (
		<>
			<div className={classes.task_list_container}>
				<DndContext
					onDragEnd={(e) => {
						const taskId = e.active.id as string;
						const target = e.over?.id;

						if (
							target !== "draft" &&
							target !== "todo" &&
							target !== "doing" &&
							target !== "done"
						)
							return;

						onChangeTaskState(taskId, target);
					}}
				>
					<Droppable title="draft">
						{draftTasks.map((task) => (
							<TaskComp key={task.id} task={task} />
						))}
					</Droppable>

					<Droppable title="todo">
						{todoTasks.map((task) => (
							<TaskComp key={task.id} task={task} />
						))}
					</Droppable>

					<Droppable title="doing">
						{doingTasks.map((task) => (
							<TaskComp key={task.id} task={task} />
						))}
					</Droppable>

					<Droppable title="done">
						{doneTasks.map((task) => (
							<TaskComp key={task.id} task={task} />
						))}
					</Droppable>
				</DndContext>
			</div>
		</>
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

	return (
		<div className={classes.column}>
			<h3>{title}</h3>
			<ul
				ref={setNodeRef}
				style={{
					backgroundColor: isOver ? "rgba(81, 45, 168, 0.1)" : "transparent",
				}}
			>
				<div className={classes.scrollContent}>{children}</div>
			</ul>
		</div>
	);
};

interface TaskProps {
	task: Task;
}

const TaskComp: React.FC<TaskProps> = ({ task }) => {
	const { setNodeRef, transform, listeners, attributes } = useDraggable({
		id: task.id,
	});
	const [showMenu, setShowMenu] = useState(false);
  	const menuRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const handleMenuToggle = (e: React.MouseEvent) => {
	e.stopPropagation();
	e.preventDefault();
	setShowMenu(!showMenu);
	};

	const handleClickOutside = (e: MouseEvent) => {
	if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
		setShowMenu(false);
	}
	};

	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		// Redireciona para a página de edição da task, passando o id da task
		navigate(`/app/edit_task/${task.id}`);
	  };

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	  }, []);


	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: {
				transition: "transform 0.2s ease-in",
			};

	return (
		<li
      style={{
        ...style,
        cursor: transform ? "grabbing" : "grab",
      }}
      ref={setNodeRef}
      className={classes.task}
      {...attributes}
    >
      {/* Área arrastável */}
      <div className={classes.dragArea} {...listeners}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>{task.state}</p>
      </div>

      {/* Botão de menu (não arrastável) */}
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button 
        onClick={handleMenuToggle}
        className={classes.menuButton}
        aria-label="Task options"
      >
        •••
      </button>

      {showMenu && (
        <div ref={menuRef} className={classes.optionsMenu}>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className={classes.menuItem} onClick={handleEdit}>
			Edit
			</button>          
        </div>
      )}
    </li>
	);
};

export default TasksList;
