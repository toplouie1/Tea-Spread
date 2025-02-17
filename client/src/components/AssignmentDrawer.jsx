import React, { useState } from "react";
import { Drawer, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentForm from "./CreateAssignment";
import "../css/CreateAssignment.css";

const AssignmentDrawer = ({ selectedClass, setClassAssignments }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerOpen(open);
	};

	const handleSubmit = (assignmentData) => {
		console.log("Assignment Submitted:", assignmentData);
		setClassAssignments((prevAssignments) => [
			...prevAssignments,
			assignmentData,
		]);

		setDrawerOpen(false);
	};

	return (
		<div>
			<Button
				variant="contained"
				style={{ marginBottom: "20px" }}
				onClick={toggleDrawer(true)}
			>
				Create Assignment
			</Button>

			<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
				<div className="drawer-container">
					<div className="drawer-header">
						<h2>{selectedClass.class_name}</h2>
						<IconButton onClick={toggleDrawer(false)}>
							<CloseIcon />
						</IconButton>
					</div>
					<AssignmentForm
						onSubmit={handleSubmit}
						selectedClass={selectedClass}
					/>
				</div>
			</Drawer>
		</div>
	);
};

export default AssignmentDrawer;
