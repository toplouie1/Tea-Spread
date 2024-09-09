import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import "../css/LogIn.css";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function SignUpUser() {
	const [user, setUser] = useState({
		username: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleTextChange = (event) => {
		setUser({ ...user, [event.target.id]: event.target.value });
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			await axios.post(`${API}/users/sign_up`, user, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			navigate(`/login`);
		} catch (c) {
			if (c.response) {
				setError(c.response.data.error);
				setOpen(true);
			} else {
				alert(c.message || "An error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="user-login-form">
			<div className="loginDivider">
				<div>
					<form onSubmit={handleSubmit} className="login-form">
						<h2>SIGN UP</h2>
						<input
							className="form-input"
							type="text"
							id="username"
							value={user.username}
							onChange={handleTextChange}
							placeholder="Username"
							required
						/>
						<input
							className="form-input"
							type="password"
							id="password"
							value={user.password}
							onChange={handleTextChange}
							placeholder="Password"
							required
						/>
						{loading && <LoadingIndicator />}
						<button className="sign-up-submit" type="submit">
							Sign Up
						</button>
						<div>
							Already have an account? &nbsp;
							<Link to="/login">Log in here !!</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignUpUser;
