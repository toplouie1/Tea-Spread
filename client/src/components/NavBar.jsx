import "../css/NavBar.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<div className="navBar">
			<div className="logo">
				<Link to="/">
					<div>Tea Spread</div>
				</Link>
			</div>
			<ul className="rightNav">
				<li>ClassWork</li>
				<li>Assignments</li>
				<li>Mates</li>
				<li>Dashboard</li>
				<li>
					<Link to="/register">
						<Button
							variant="contained"
							size="small"
							style={{
								fontSize: "16px",
							}}
						>
							SIGN IN
						</Button>
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default NavBar;
