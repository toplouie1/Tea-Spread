const db = require("../db/dbConfig.js");

const getAllSubmissions = async () => {
	const submissions = await db.many("SELECT * FROM submissions");
	return submissions;
};

const getSubmissionsByAssignmentId = async (assignment_id) => {
	const submissions = await db.many(
		"SELECT * FROM submissions WHERE assignment_id=$1",
		assignment_id
	);
	return submissions;
};

const getSubmissionsByStudentId = async (student_id) => {
	const submissions = await db.many(
		"SELECT * FROM submissions WHERE student_id=$1",
		student_id
	);
	return submissions;
};

const createSubmission = async (submissionData) => {
	const createdSubmission = await db.one(
		"INSERT INTO submissions (assignment_id, student_id, submission_date,  content, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
		[
			submissionData.assignment_id,
			submissionData.student_id,
			submissionData.submission_date,
			submissionData.content,
			submissionData.status,
		]
	);
	return createdSubmission;
};

const updateSubmission = async (submission_id, submissionData) => {
	const updatedSubmission = await db.one(
		"UPDATE submissions SET grade=$2, feedback=$3, graded_at=CURRENT_TIMESTAMP, graded_by=$4, status=$5 WHERE submission_id=$1 RETURNING *",
		[
			submission_id,
			submissionData.grade,
			submissionData.feedback,
			submissionData.graded_at,
			submissionData.graded_by,
			submissionData.status,
		]
	);
	return updatedSubmission;
};

const deleteSubmission = async (submission_id) => {
	const deletedSubmission = await db.one(
		"DELETE FROM submissions WHERE submission_id=$1 RETURNING *",
		submission_id
	);
	return deletedSubmission;
};

module.exports = {
	getAllSubmissions,
	getSubmissionsByAssignmentId,
	getSubmissionsByStudentId,
	createSubmission,
	updateSubmission,
	deleteSubmission,
};
