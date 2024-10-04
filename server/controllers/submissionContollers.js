const express = require("express");
const submissions = express.Router();

const {
	getAllSubmissions,
	getSubmissionsByAssignmentId,
	getSubmissionsByStudentId,
	createSubmission,
	updateSubmission,
	deleteSubmission,
} = require("../queries/submission.js");

submissions.get("/", async (req, res) => {
	try {
		const submissionsList = await getAllSubmissions();
		if (submissionsList.length > 0) {
			res.json({ success: true, result: submissionsList });
		} else {
			res.status(404).json({
				success: false,
				error: "No submissions found.",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

submissions.get("/assignment/:assignment_id", async (req, res) => {
	const { assignment_id } = req.params;
	try {
		const submissionsList = await getSubmissionsByAssignmentId(assignment_id);
		if (submissionsList.length > 0) {
			res.json({ success: true, result: submissionsList });
		} else {
			res.status(404).json({
				success: false,
				error: "No submissions found for the assignment.",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

submissions.get("/student/:student_id", async (req, res) => {
	const { student_id } = req.params;
	try {
		const submissionsList = await getSubmissionsByStudentId(student_id);
		if (submissionsList.length > 0) {
			res.json({ success: true, result: submissionsList });
		} else {
			res.status(404).json({
				success: false,
				error: "No submissions found for the student.",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

submissions.post("/", async (req, res) => {
	const submissionData = req.body;
	try {
		const createdSubmission = await createSubmission(submissionData);
		if (createdSubmission.submission_id) {
			res.json({ success: true, result: createdSubmission });
		} else {
			res.status(500).json({
				success: false,
				error: "Error creating submission",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

submissions.put("/:submission_id", async (req, res) => {
	const { submission_id } = req.params;
	const submissionData = req.body;

	try {
		const updatedSubmission = await updateSubmission(
			submission_id,
			submissionData
		);
		if (updatedSubmission.submission_id) {
			res.json({ success: true, result: updatedSubmission });
		} else {
			res.status(404).json({
				success: false,
				error: `No submission found with ID ${submission_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

submissions.delete("/:submission_id", async (req, res) => {
	const { submission_id } = req.params;

	try {
		const deletedSubmission = await deleteSubmission(submission_id);
		if (deletedSubmission.submission_id) {
			res.json({ success: true, result: deletedSubmission });
		} else {
			res.status(404).json({
				success: false,
				error: `No submission found with ID ${submission_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server error...",
		});
	}
});

module.exports = submissions;
