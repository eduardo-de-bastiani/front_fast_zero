import { BrowserRouter, Route, Routes } from "react-router-dom";
import TasksList from "./tasks_list";
import Home from "./home";
import AppLayout from "./app_layout";
import NewTask from "./new_task";
import Login from "./login";
import CreateAccount from "./create_account";
import EditAccount from "./edit_account";

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/create_account" element={<CreateAccount />} />
				<Route path="/app" element={<AppLayout />}>
					<Route index element={<TasksList />} />
					<Route path="new" element={<NewTask />} />
					<Route path="edit_account" element={<EditAccount />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
