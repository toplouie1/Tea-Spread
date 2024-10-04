import React, { useState } from "react";
import { Drawer, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../css/CreateAssignment.css";

const SubmitAssignmentDrawer = ({ selectedClass, selectedAssignment }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [content, setContent] = useState("");

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerOpen(open);
	};

	const handleChange = (e) => {
		setContent(e.target.value);
	};

	const handleSubmit = (assignmentData) => {
		console.log("Assignment Submitted:", assignmentData);
		setDrawerOpen(false);
	};

	return (
		<div>
			<Button
				variant="contained"
				style={{ marginBottom: "20px" }}
				onClick={toggleDrawer(true)}
			>
				Submit
			</Button>

			<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
				<div className="drawer-container">
					<div className="drawer-header">
						<h2>{selectedClass.class_name}</h2>
						<IconButton onClick={toggleDrawer(false)}>
							<CloseIcon />
						</IconButton>
					</div>
					<form className="content-form">
						<div className="form-group">
							<label htmlFor="content">{`Submit the Assignment for (${selectedAssignment.title})`}</label>
							<input
								type="text"
								id="content"
								name="content"
								value={content}
								onChange={handleChange}
								placeholder="link or text"
								required
							/>
						</div>
						<Button
							variant={content ? "contained" : "outlined"}
							style={{ marginTop: "20px" }}
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</form>
				</div>
			</Drawer>
		</div>
	);
};

export default SubmitAssignmentDrawer;
