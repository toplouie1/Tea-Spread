import React, { useState } from "react";
import "../css/CreateAssignment.css";

const AssignmentForm = ({ onSubmit }) => {
	const [assignmentData, setAssignmentData] = useState({
		title: "",
		description: "",
		due_date: "",
		attachments: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setAssignmentData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(assignmentData);
	};

	return (
		<form className="assignment-form" onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					name="title"
					value={assignmentData.title}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="description">Description</label>
				<textarea
					id="description"
					name="description"
					value={assignmentData.description}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="due_date">Due Date</label>
				<input
					type="date"
					id="due_date"
					name="due_date"
					value={assignmentData.due_date}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="attachments">Attachments (Link or Text)</label>
				<input
					type="text"
					id="attachments"
					name="attachments"
					value={assignmentData.attachments}
					onChange={handleChange}
					placeholder="Enter a link or text"
					required
				/>
			</div>

			<button type="submit">Submit Assignment</button>
		</form>
	);
};

export default AssignmentForm;
