import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import {
	fetchClassData,
	fetchYourClass,
	getClassAssignments,
	isValidUrl,
} from "./Helper/classesMethod";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AssignmentDrawer from "./AssignmentDrawer";

const Dashboard = () => {
	const [selectedClass, setSelectedClass] = useState(null);
	const [classes, setClasses] = useState([]);
	const [userClass, setUserClass] = useState([]);
	const [userId, setUserId] = useState("");
	const [classAssignments, setClassAssignments] = useState([]);
	const isTeacher = localStorage.getItem("role") === "teacher";
	const currentDate = new Date();

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");
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
			const assignments = await getClassAssignments(classId);
			setClassAssignments(assignments || []);
		} catch (error) {
			console.error("Error fetching class assignments:", error);
		}
	};

	const getStatusMessage = (dueDate) => {
		const timeDifference = new Date(dueDate).getTime() - currentDate.getTime();
		const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

		if (dayDifference > 0)
			return `${dayDifference} day(s) left until the due date.`;
		if (dayDifference < 0) return `${Math.abs(dayDifference)} day(s) late.`;
		return "Due today!";
	};

	const userClasses = classes.filter((classItem) =>
		userClass.some(
			(yourClassItem) => yourClassItem.class_id === classItem.class_id
		)
	);

	const NoClasses = () => (
		<>
			<h2>Please join classes to view assignments</h2>
			<Link
				to="/classes"
				style={{
					color: "blue",
					textDecoration: "underline",
					cursor: "pointer",
					filter: "blur(0.5px)",
				}}
			>
				Navigate to Classes
			</Link>
		</>
	);

	const ClassAssignments = ({
		selectedClass,
		classAssignments,
		isTeacher,
		getStatusMessage,
	}) => (
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
						<p className="assignment-description">{assignment.description}</p>
						{assignment.attachments && (
							<AssignmentAttachments attachments={assignment.attachments} />
						)}
						<span className="due-date">
							{getStatusMessage(assignment.due_date)}
						</span>
					</li>
				))}
			</ul>
		</>
	);

	const AssignmentAttachments = ({ attachments }) => (
		<div className="assignment-attachments">
			<strong>Attachments:</strong>{" "}
			{isValidUrl(attachments) ? (
				<a href={attachments} target="_blank" rel="noopener noreferrer">
					{attachments}
				</a>
			) : (
				<span>{attachments}</span>
			)}
		</div>
	);

	return (
		<div className="dashboard-container">
			<div className="sidebar">
				<h2>Your Classes</h2>
				<ul>
					{userClasses.map((cls) => (
						<li key={cls.class_id}>
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
				</ul>
			</div>

			<div className="main-content">
				{userClasses.length === 0 ? (
					<NoClasses />
				) : !selectedClass ? (
					<h2>Please select a class to view assignments</h2>
				) : (
					<ClassAssignments
						selectedClass={selectedClass}
						classAssignments={classAssignments}
						isTeacher={isTeacher}
						getStatusMessage={getStatusMessage}
					/>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
