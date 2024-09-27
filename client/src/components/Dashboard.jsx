import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import {
	fetchClassData,
	fetchYourClass,
	getClassAssignmnes,
	isValidUrl,
} from "./Helper/classesMethod";
import { Button } from "@mui/material";
import AssignmentDrawer from "./AssignmentDrawer";

const Dashboard = () => {
	const [selectedClass, setSelectedClass] = useState("");
	const [classes, setClasses] = useState([]);
	const [userClass, setUserClass] = useState([]);
	const [userId, setUserId] = useState("");
	const isTeacher = localStorage.getItem("role") === "teacher";
	const [classAssignments, setClassAssignments] = useState([]);

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

	const handleClassSelect = async (classId) => {
		const selected = classes.find((cls) => cls.class_id === classId);
		setSelectedClass(selected);
		try {
			const assignments = await getClassAssignmnes(classId);
			setClassAssignments(assignments || []);
		} catch (error) {
			console.error("Error fetching class assignments:", error);
		}
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
				{userClasses.map((cls) => (
					<li>
						<Button
							className="dashboard-button"
							variant="contained"
							size="large"
							onClick={() => handleClassSelect(cls.class_id)}
						>
							{cls.class_name}
						</Button>
					</li>
				))}
			</div>

			<div className="main-content">
				{selectedClass ? (
					<>
						<h2>{selectedClass.class_name} ~ Assignments</h2>
						{isTeacher && <AssignmentDrawer selectedClass={selectedClass} />}
						<ul className="assignment-list">
							{classAssignments.map((assignment) => (
								<li key={assignment.assignment_id} className="assignment-item">
									<div className="assignment-header">
										<strong>{assignment.title}</strong>
										<span className="due-date">
											Due: {new Date(assignment.due_date).toLocaleDateString()}
										</span>
									</div>
									<p className="assignment-description">
										{assignment.description}
									</p>
									{assignment.attachments && (
										<div className="assignment-attachments">
											<strong>Attachments:</strong>{" "}
											{isValidUrl(assignment.attachments) ? (
												<a
													href={assignment.attachments}
													target="_blank"
													rel="noopener noreferrer"
												>
													{assignment.attachments}
												</a>
											) : (
												<span>{assignment.attachments}</span>
											)}
										</div>
									)}
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
