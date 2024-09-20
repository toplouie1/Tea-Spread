import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";

const sampleClasses = [
	{
		id: 1,
		name: "Math 101",
		assignments: [
			{
				id: 1,
				title: "Algebra Homework",
				dueDate: "2024-09-22",
				status: "Pending",
			},
			{
				id: 2,
				title: "Geometry Quiz",
				dueDate: "2024-09-25",
				status: "Submitted",
			},
		],
	},
	{
		id: 2,
		name: "History 201",
		assignments: [
			{ id: 1, title: "WWII Essay", dueDate: "2024-09-20", status: "Pending" },
		],
	},
];

const Dashboard = ({ role }) => {
	const [selectedClass, setSelectedClass] = useState(null);
	const [classes, setClasses] = useState([]);

	useEffect(() => {
		setClasses(sampleClasses);
	}, []);

	const handleClassSelect = (classId) => {
		const selected = classes.find((cls) => cls.id === classId);
		setSelectedClass(selected);
	};

	return (
		<div className="dashboard-container">
			<div className="sidebar">
				<h2>Your Classes</h2>
				<ul>
					{classes.map((cls) => (
						<li key={cls.id} onClick={() => handleClassSelect(cls.id)}>
							{cls.name}
						</li>
					))}
				</ul>
			</div>

			<div className="main-content">
				{selectedClass ? (
					<>
						<h2>{selectedClass.name} - Assignments</h2>
						{role === "teacher" && (
							<button className="create-assignment-btn">
								Create New Assignment
							</button>
						)}
						<ul>
							{selectedClass.assignments.map((assignment) => (
								<li key={assignment.id}>
									<strong>{assignment.title}</strong> (Due: {assignment.dueDate}
									) - {assignment.status}
								</li>
							))}
						</ul>
					</>
				) : (
					<h2>Please select a class to view assignments</h2>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
