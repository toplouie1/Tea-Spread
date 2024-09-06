import React, { useState } from "react";
import "../css/Profile.css";

const Profile = () => {
	const [formData, setFormData] = useState({
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
		console.log("Form submitted:", formData);
	};

	return (
		<form className="profile_form" onSubmit={handleSubmit}>
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
