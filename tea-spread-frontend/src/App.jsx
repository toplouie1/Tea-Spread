import NavBar from "./components/NavBar";
import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div>
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
