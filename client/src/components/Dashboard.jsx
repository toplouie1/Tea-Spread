import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import { fetchClassData, fetchYourClass } from "./Helper/classesMethod";
import { Button } from "@mui/material";
import {
	handleClassSelect,
	filterUserClasses,
	NoClasses,
	ClassAssignments,
} from "./Helper/dashboardHelper";

const Dashboard = () => {
	const [selectedClass, setSelectedClass] = useState(null);
	const [classes, setClasses] = useState([]);
	const [userClass, setUserClass] = useState([]);
	const [userId, setUserId] = useState("");
	const [classAssignments, setClassAssignments] = useState([]);
	const isTeacher = localStorage.getItem("role") === "teacher";

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

	const userClasses = filterUserClasses(classes, userClass);

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
								onClick={() =>
									handleClassSelect(
										cls.class_id,
										classes,
										setSelectedClass,
										setClassAssignments
									)
								}
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
					/>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
