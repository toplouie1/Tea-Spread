import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import { fetchClassData, fetchYourClass } from "./Helper/classesMethod";
import AssignmentForm from "./CreateAssignment";

const Dashboard = () => {
	const [selectedClass, setSelectedClass] = useState("");
	const [classes, setClasses] = useState([]);
	const [userClass, setUserClass] = useState([]);
	const [userId, setUserId] = useState("");
	const isTeacher = localStorage.getItem("role") === "teacher";

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId") || "";
		if (storedUserId) {
			setUserId(storedUserId);
		} else {
			console.log("No userId found in localStorage");
		}
	}, []);

	useEffect(() => {
		fetchClassData(setClasses);
		fetchYourClass(userId, setUserClass);
	}, [userId]);

	const handleClassSelect = (classId) => {
		const selected = classes.find((cls) => cls.class_id === classId);
		setSelectedClass(selected);
	};

	const userClasses = classes.filter((classItem) =>
		userClass.some(
			(yourClassItem) => yourClassItem.class_id === classItem.class_id
		)
	);

	return (
		<div className="dashboard-container">
			<div className="sidebar">
				<h2>Your Classes</h2>
				<ul>
					{userClasses.map((cls) => (
						<li
							key={cls.class_id}
							onClick={() => handleClassSelect(cls.class_id)}
						>
							{cls.class_name}
						</li>
					))}
				</ul>
			</div>

			<div className="main-content">
				{selectedClass ? (
					<>
						<h2>{selectedClass.class_name} ~ Assignments</h2>
						{isTeacher && (
							<>
								<button className="create-assignment-btn">
									Create New Assignment
								</button>
								<AssignmentForm />
							</>
						)}
						<ul>
							{/* {selectedClass.assignments.map((assignment) => (
								<li key={assignment.id}>
									<strong>{assignment.title}</strong> (Due: {assignment.dueDate}
									) - {assignment.status}
								</li>
							))} */}
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
