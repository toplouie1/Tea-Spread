import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LogIn.css";
import { Link } from "react-router-dom";
import GeneralShowMessage from "./GeneralShowMessage";

const API = import.meta.env.VITE_API_URL;

function LogInUser() {
	let navigate = useNavigate();
	const [user, setUser] = useState({
		username: "",
		password_hash: "",
	});

	const [open, setOpen] = useState(false);

	const logIn = async () => {
		try {
			const response = await axios.post(`${API}/users/login`, user, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const userInfo = response.data.result;
			const userId = userInfo.user_id;

			const profileExists = await fetchProfileData(userId);

			if (!isNaN(userId) && profileExists) {
				localStorage.setItem("userId", `${userId}`);
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				navigate("/");
			} else {
				localStorage.setItem("userId", `${userId}`);
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				navigate("/profile");
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	const fetchProfileData = async (userId) => {
		try {
			const response = await axios.get(`${API}/profiles/${userId}`);
			localStorage.setItem("role", response.data.result.role);
			return response.data.success;
		} catch (error) {
			console.error("Error fetching profile:", error);
			return false;
		}
	};

	const handleChange = (event) => {
		setUser({ ...user, [event.target.id]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		logIn();
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	const messages = [
		"Uh-oh! Did you forget your password or did it just go on vacation? 😅🔑",
		"Looks like something went awry! Maybe your password is taking a nap? 💤🔐",
		"Whoopsie! Either your password is playing hide and seek or it's on a coffee break. ☕🕵️",
		"Yikes! Your login just had a tiny hiccup. Give it another shot, superhero! 🦸‍♂️💥",
	];

	const getRandomMessage = () => {
		const randomIndex = Math.floor(Math.random() * messages.length);
		return messages[randomIndex];
	};

	return (
		<div className="user-login-form">
			<GeneralShowMessage
				severity="error"
				message={getRandomMessage()}
				open={open}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				handleClose={handleClose}
			/>
			<div className="loginDivider">
				<div>
					<form onSubmit={handleSubmit} className="login-form">
						<h2>SIGN IN</h2>
						<input
							placeholder="Username"
							type="text"
							id="username"
							onChange={handleChange}
							value={user.username}
							required
						/>
						<input
							placeholder="Password"
							type="password"
							id="password_hash"
							onChange={handleChange}
							value={user.password_hash}
							required
						/>

						<button className="login-submit">Sign In</button>
						<div>
							Welcome To Tea Spread ? &nbsp;
							<Link to="/register">Sign up here !!</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
export default LogInUser;
