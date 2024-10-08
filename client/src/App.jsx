import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./components/Profile";
import Classes from "./components/Classes";
import CreateClass from "./components/CreateClass";
import Dashboard from "./components/Dashboard";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

function App() {
	return (
		<div>
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/classes" element={<Classes />} />
					<Route path="/newclass" element={<CreateClass />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
