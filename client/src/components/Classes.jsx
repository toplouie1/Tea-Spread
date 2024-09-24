import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Classes.css";
import { useNavigate } from "react-router-dom";
import { fetchClassData, fetchYourClass } from "./Helper/classesMethod";

const API = import.meta.env.VITE_API_URL;

const Classes = () => {
	const [classes, setClasses] = useState([]);
	const [userClass, setUserClass] = useState([]);
	const [classCodes, setClassCodes] = useState({});
	const [userId, setUserId] = useState("");
	let navigate = useNavigate();
	const today = new Date();
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

	const unregisteredClasses = classes.filter(
		(classItem) =>
			!userClass.some(
				(yourClassItem) => yourClassItem.class_id === classItem.class_id
			) && new Date(classItem.end_date) >= today
	);

	const userClasses = classes.filter((classItem) =>
		userClass.some(
			(yourClassItem) => yourClassItem.class_id === classItem.class_id
		)
	);

	const handleInputChange = (e, classId) => {
		setClassCodes({
			...classCodes,
			[classId]: e.target.value,
		});
	};

	const handleJoinClass = async (classId) => {
		const enteredClassCode = classCodes[classId];

		if (!enteredClassCode) {
			alert("Please enter a class code.");
			return;
		}
		if (!userId) {
			alert("Please Sign in");
			navigate("/login");
		}

		try {
			const response = await axios.post(`${API}/participants`, {
				class_id: classId,
				class_code: enteredClassCode,
				user_id: userId,
				role: "student",
			});

			if (response.data.success) {
				fetchClassData();
				fetchYourClass(userId);
				alert("Successfully joined the class!");
			} else {
				alert(response.data.error);
			}
		} catch (error) {
			console.error("Error joining class", error);
		}
	};

	const navigateToNewClass = () => {
		navigate("/newclass");
	};

	return (
		<div className="container">
			{userId && (
				<div className="user-class-container">
					<h3>
						{" "}
						{userClass.length > 1 ? "Enrolled Classes" : "Enrolled Class"}
					</h3>
					<div className="class-list">
						{userClasses.map((classItem) => (
							<div key={classItem.class_id} className="class-item">
								<h4>{classItem.class_name}</h4>
								<p>
									<strong>Description:</strong> {classItem.class_description}
								</p>
								<p>
									<strong>Start Date:</strong>{" "}
									{new Date(classItem.start_date).toLocaleDateString()}
								</p>
								<p>
									<strong>End Date:</strong>{" "}
									{new Date(classItem.end_date).toLocaleDateString()}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
			<div className="classes-container">
				<h3>Active Classes</h3>
				<div className="class-list">
					{unregisteredClasses.map((classItem) => (
						<div key={classItem.class_id} className="class-item">
							<h4>{classItem.class_name}</h4>
							<p>
								<strong>Description:</strong> {classItem.class_description}
							</p>
							<p>
								<strong>Start Date:</strong>{" "}
								{new Date(classItem.start_date).toLocaleDateString()}
							</p>
							<p>
								<strong>End Date:</strong>{" "}
								{new Date(classItem.end_date).toLocaleDateString()}
							</p>

							{userId && (
								<div className="class-code-container">
									<input
										type="text"
										placeholder="Enter class code"
										value={classCodes[classItem.class_id] || ""}
										onChange={(e) => handleInputChange(e, classItem.class_id)}
										className="class-code-input"
									/>
									<button
										onClick={() => handleJoinClass(classItem.class_id)}
										className="join-class-button"
									>
										Join Class
									</button>
								</div>
							)}
						</div>
					))}
				</div>
				{isTeacher && (
					<div className="create-class-section">
						<button
							onClick={navigateToNewClass}
							className="create-class-button"
						>
							Create a New Class
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Classes;
