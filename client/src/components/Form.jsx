import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

const API = import.meta.env.VITE_API_URL;

function Form({ route, method }) {
	const [user, setUser] = useState({
		username: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const handleTextChange = (event) => {
		setUser({ ...user, [event.target.id]: event.target.value });
	};

	const name = method === "login" ? "Login" : "Register";

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			await axios.post(`${API}/users/sign_up`, user);
			navigate(`/users/login`);
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
		<form onSubmit={handleSubmit} className="form-container">
			<h1>{name}</h1>
			<input
				className="form-input"
				type="text"
				id="username"
				value={user.username}
				onChange={handleTextChange}
				placeholder="Username"
			/>
			<input
				className="form-input"
				type="password"
				id="password"
				value={user.password}
				onChange={handleTextChange}
				placeholder="Password"
			/>
			{loading && <LoadingIndicator />}
			<button className="form-button" type="submit">
				{name}
			</button>
		</form>
	);
}

export default Form;
