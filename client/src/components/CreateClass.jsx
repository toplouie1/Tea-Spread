import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/CreateClass.css";

const API = import.meta.env.VITE_API_URL;

const CreateClass = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		class_name: "",
		class_description: "",
		class_code: "",
		start_date: "",
		end_date: "",
		max_students: "",
	});
	const [profile, setProfile] = useState("");

	useEffect(() => {
		const storedProfile = localStorage.getItem("role") || "";
		setProfile(storedProfile);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const today = new Date();
			const startDate = new Date(formData.start_date);
			const endDate = new Date(formData.end_date);

			today.setHours(0, 0, 0, 0);
			startDate.setHours(0, 0, 0, 0);
			endDate.setHours(0, 0, 0, 0);

			if (startDate < today) {
				alert("The start date cannot be before today.");
				return;
			}

			if (endDate < today) {
				alert("The end date cannot be before today.");
				return;
			}

			if (endDate < startDate) {
				alert("The end date cannot be before the start date.");
				return;
			}

			if (profile !== "teacher") {
				alert("haha nice try");
				return;
			}

			const response = await axios.post(`${API}/classes`, formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.data.success) {
				navigate("/classes");
			}
		} catch (error) {
			console.error("Error during class creation:", error);
		}
	};

	return (
		<form className="create_class_form" onSubmit={handleSubmit}>
			<div>
				<label className="class_label">Class Name:</label>
				<input
					className="class_input"
					type="text"
					name="class_name"
					value={formData.class_name}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label className="class_label">Class Description:</label>
				<textarea
					className="class_textarea"
					name="class_description"
					value={formData.class_description}
					onChange={handleChange}
					required
				></textarea>
			</div>
			<div>
				<label className="class_label">Class Code:</label>
				<input
					className="class_input"
					type="text"
					name="class_code"
					value={formData.class_code}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label className="class_label">Start Date:</label>
				<input
					className="class_input"
					type="date"
					name="start_date"
					value={formData.start_date}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label className="class_label">End Date:</label>
				<input
					className="class_input"
					type="date"
					name="end_date"
					value={formData.end_date}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label className="class_label">Max Students:</label>
				<input
					className="class_input"
					type="number"
					name="max_students"
					value={formData.max_students}
					onChange={handleChange}
					required
				/>
			</div>
			<button className="class_button" type="submit">
				Create Class
			</button>
		</form>
	);
};

export default CreateClass;
