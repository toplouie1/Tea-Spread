import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Profile.css";

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
	const storedProfile = JSON.parse(localStorage.getItem("profile")) || {};
	const [formData, setFormData] = useState({
		user_id: localStorage.getItem("userId") || 0,
		first_name: storedProfile.first_name || "",
		last_name: storedProfile.last_name || "",
		email: storedProfile.email || "",
		role: storedProfile.role || "student",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [profileExists, setProfileExists] = useState(
		Boolean(localStorage.getItem("profile"))
	);
	const [isFormChanged, setIsFormChanged] = useState(false);
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				setIsLoading(true);
				const userId = localStorage.getItem("userId");
				const response = await axios.get(`${API}/profiles/${userId}`);

				if (response.data.success) {
					setFormData(response.data.result);
					setProfileExists(true);
				} else {
					setProfileExists(false);
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfileData();
	}, []);

	useEffect(() => {
		const isChanged =
			formData?.first_name !== storedProfile?.first_name ||
			formData?.last_name !== storedProfile?.last_name ||
			formData?.email !== storedProfile?.email ||
			formData?.role !== storedProfile?.role;

		setIsFormChanged(isChanged);
	}, [formData, storedProfile]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => {
			const updatedData = { ...prevData, [name]: value };
			localStorage.setItem("profile", JSON.stringify(updatedData));
			return updatedData;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userId = localStorage.getItem("userId");

		try {
			if (!profileExists) {
				const response = await axios.post(`${API}/profiles`, formData, {
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (response.data.success) {
					localStorage.setItem("profile", JSON.stringify(response.data.result));
					setProfileExists(true);
				} else {
					console.error("Failed to create the profile:", response.data.error);
				}
			} else {
				const response = await axios.put(
					`${API}/profiles/${userId}`,
					formData,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.data.success) {
					localStorage.setItem("profile", JSON.stringify(response.data.result));
					setProfileExists(true);
				} else {
					console.log("Failed to update the profile:", response.data.error);
				}
			}
		} catch (error) {
			console.error("Error during profile submission:", error);
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
					disabled={!userId}
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
					disabled={!userId}
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
					disabled={!userId}
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
					disabled={!userId}
				>
					<option value="student">Student</option>
					<option value="teacher">Teacher</option>
				</select>
			</div>
			<button className="profile_button" type="submit" disabled={isFormChanged}>
				{profileExists ? "Update" : "Submit"}
			</button>
		</form>
	);
};

export default Profile;
