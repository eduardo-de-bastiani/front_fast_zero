import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TasksList from "./tasks_list";
import Home from "./home";
import AppLayout from "./app_layout";
import NewTask from "./new_task";
import Login from "./login";
import CreateAccount from "./create_account";
import EditAccount from "./edit_account";
import DeleteAccount from "./delete_account";
import EditTask from "./edit_task";
import ProtectedRoute from "../components/protected_route";

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/create_account" element={<CreateAccount />} />

				{/* Rotas Protegidas */}
				<Route element={<ProtectedRoute />}>
					<Route path="/app" element={<AppLayout />}>
						<Route index element={<TasksList />} />
						<Route path="new" element={<NewTask />} />
						<Route path="edit_account" element={<EditAccount />} />
						<Route path="delete_account" element={<DeleteAccount />} />
						<Route path="edit_task/:taskId" element={<EditTask />}/>
					</Route>
				</Route>

				{/* Redirecionamento para páginas não encontradas */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
