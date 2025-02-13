import TaskForm from "../components/task_form";
import { TaskFormData } from "../types/task";

const NewTask: React.FC = () => {
  const handleSubmit = (data: TaskFormData) => {
    console.log("Dados do formulário:", data);
    // logica de envio das tarefas para o back
  };

  return (
    <>
      <TaskForm onSubmit={handleSubmit} />
    </>
  );
};

export default NewTask;
