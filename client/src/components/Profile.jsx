import React, { useState } from "react";
import axios from "axios";
import "../css/Profile.css";

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
	const [formData, setFormData] = useState({
		user_id: Number(localStorage.getItem("userId")) || 0,
		email: "",
		first_name: "",
		last_name: "",
		role: "student",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`${API}/profiles`, formData, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				navigate("/");
			})
			.catch((error) => {
				if (error.response && error.response.data) {
					console.log(error);
				}
			});
	};

	return (
		<form className="profile_form" onSubmit={handleSubmit}>
			<div>
				<label className="profile_label">First Name:</label>
				<input
					className="profile_input"
					type="text"
					name="first_name"
					value={formData.first_name}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label className="profile_label">Last Name:</label>
				<input
					className="profile_input"
					type="text"
					name="last_name"
					value={formData.last_name}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Email:</label>
				<input
					className="profile_input"
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label className="profile_label">Role:</label>
				<select
					name="role"
					value={formData.role}
					onChange={handleChange}
					required
				>
					<option value="student">Student</option>
					<option value="teacher">Teacher</option>
				</select>
			</div>
			<button className="profile_button" type="submit">
				Submit
			</button>
		</form>
	);
};

export default Profile;
