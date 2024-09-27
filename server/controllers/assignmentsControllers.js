const express = require("express");
const assignments = express.Router();

const {
	getAllAssignments,
	getAssignmentsByClassId,
	updateAssignment,
	deleteAssignment,
	deleteAssignmentsByClassId,
	createAssignment,
} = require("../queries/assignments.js");

assignments.get("/", async (req, res) => {
	try {
		const assignmentsList = await getAllAssignments();
		if (assignmentsList.length > 0) {
			res.json({ success: true, result: assignmentsList });
		} else {
			res.status(404).json({
				success: false,
				error: "No assignments found.",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

assignments.get("/:class_id", async (req, res) => {
	const { class_id } = req.params;
	try {
		const assignmentsList = await getAssignmentsByClassId(class_id);
		if (assignmentsList.length > 0) {
			res.json({ success: true, result: assignmentsList });
		} else {
			res.status(404).json({
				success: false,
				error: "No assignments found for the class.",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

assignments.post("/", async (req, res) => {
	const assignmentData = req.body;
	try {
		const createdAssignment = await createAssignment(assignmentData);
		if (createdAssignment.assignment_id) {
			res.json({ success: true, result: createdAssignment });
		} else {
			res.status(500).json({
				success: false,
				error: "Error creating assignment",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

assignments.put("/:assignment_id", async (req, res) => {
	const { assignment_id } = req.params;
	const assignmentData = req.body;

	try {
		const updatedAssignment = await updateAssignment(
			assignment_id,
			assignmentData
		);
		if (updatedAssignment.assignment_id) {
			res.json({ success: true, result: updatedAssignment });
		} else {
			res.status(404).json({
				success: false,
				error: `No assignment found with ID ${assignment_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

assignments.delete("/:assignment_id", async (req, res) => {
	const { assignment_id } = req.params;

	try {
		const deletedAssignment = await deleteAssignment(assignment_id);
		if (deletedAssignment.assignment_id) {
			res.json({ success: true, result: deletedAssignment });
		} else {
			res.status(404).json({
				success: false,
				error: `No assignment found with ID ${assignment_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

assignments.delete("/class/:class_id", async (req, res) => {
	const { class_id } = req.params;

	try {
		const deletedAssignments = await deleteAssignmentsByClassId(class_id);
		if (deletedAssignments.length > 0) {
			res.json({ success: true, result: deletedAssignments });
		} else {
			res.status(404).json({
				success: false,
				error: `No assignments found for class ID ${class_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

module.exports = assignments;
