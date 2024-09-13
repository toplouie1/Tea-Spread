import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Classes.css";

const API = import.meta.env.VITE_API_URL;

const Classes = () => {
	const [classes, setClasses] = useState([]);

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

							<div className="class-code-container">
								<input
									type="text"
									placeholder="Enter class code"
									value=""
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
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Classes;
