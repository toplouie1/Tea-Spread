import NavBar from "./Components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<div>
			<Router>
				<NavBar />
			</Router>
		</div>
	);
}

export default App;
