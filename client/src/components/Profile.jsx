import React, { useState } from "react";
import axios from "axios";
import "../css/Profile.css";

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
	const storedProfile = JSON.parse(localStorage.getItem("profile")) || {};
	const [formData, setFormData] = useState({
		first_name: storedProfile.first_name || "",
		last_name: storedProfile.last_name || "",
		email: storedProfile.email || "",
		role: storedProfile.role || "student",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => {
			const updatedData = { ...prevData, [name]: value };
			localStorage.setItem("profile", JSON.stringify(updatedData));
			return updatedData;
		});
	};

	async function fetchUserProfile(user_id) {
		try {
			const response = await axios.get(`${API}/profiles/${user_id}`);
			if (response.data.success) {
				localStorage.setItem("profile", JSON.stringify(response.data.result));
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error("Error fetching profile:", error);
			return false;
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userId = localStorage.getItem("userId");
		const profileExists = await fetchUserProfile(userId);

		if (!profileExists) {
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
						console.error("Error during profile creation:", error);
					}
				});
		} else {
			axios
				.put(`${API}/profiles/${userId}`, formData, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					if (res.data.success) {
						localStorage.setItem("profile", JSON.stringify(res.data.result));
						navigate("/");
					} else {
						console.log("Failed to update the profile:", res.data.error);
					}
				})
				.catch((error) => {
					if (error.response && error.response.data) {
						console.error("Error during profile update:", error);
					}
				});
		}
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
