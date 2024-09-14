import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Classes.css";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const Classes = () => {
	const [classes, setClasses] = useState([]);
	const [classCodes, setClassCodes] = useState({});
	const [userId, setUserId] = useState("");

	let navigate = useNavigate();

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId") || "";
		if (storedUserId) setUserId(storedUserId);
	}, []);

	useEffect(() => {
		const fetchClassData = async () => {
			try {
				const response = await axios.get(`${API}/classes`);
				if (response.data.success) {
					setClasses(response.data.result);
				} else {
					console.error(response.data.error);
				}
			} catch (error) {
				console.log("Error fetching classes", error);
			}
		};
		fetchClassData();
	}, []);

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
				alert("Successfully joined the class!");
			} else {
				alert(response.data.error);
			}
		} catch (error) {
			console.error("Error joining class", error);
		}
	};

	return (
		<div className="container">
			<div className="classes-container">
				<h3>Active Classes</h3>
				<div className="class-list">
					{classes.map((classItem) => (
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
			</div>
		</div>
	);
};

export default Classes;
