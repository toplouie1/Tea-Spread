const db = require("../db/dbConfig.js");

const getAllAssignments = async () => {
	const assignments = await db.many("SELECT * FROM assignments");
	return assignments;
};

const getAssignmentsByClassId = async (class_id) => {
	const assignments = await db.many(
		"SELECT * FROM assignments WHERE class_id=$1",
		class_id
	);
	return assignments;
};

const updateAssignment = async (assignment_id, assignmentData) => {
	const updatedAssignment = await db.one(
		"UPDATE assignments SET class_id=$2, title=$3, description=$4, due_date=$5, attachments=$6, updated_at=CURRENT_TIMESTAMP WHERE assignment_id=$1 RETURNING *",
		[
			assignment_id,
			assignmentData.class_id,
			assignmentData.title,
			assignmentData.description,
			assignmentData.due_date,
			assignmentData.attachments,
		]
	);
	return updatedAssignment;
};

const deleteAssignment = async (assignment_id) => {
	const deletedAssignment = await db.one(
		"DELETE FROM assignments WHERE assignment_id=$1 RETURNING *",
		assignment_id
	);
	return deletedAssignment;
};

const createAssignment = async (assignmentData) => {
	const createdAssignment = await db.one(
		"INSERT INTO assignments (class_id, title, description, due_date, attachments) VALUES ($1, $2, $3, $4, $5) RETURNING *",
		[
			assignmentData.class_id,
			assignmentData.title,
			assignmentData.description,
			assignmentData.due_date,
			assignmentData.attachments,
		]
	);
	return createdAssignment;
};

const deleteAssignmentsByClassId = async (class_id) => {
	const deletedAssignments = await db.any(
		"DELETE FROM assignments WHERE class_id=$1 RETURNING *",
		class_id
	);
	return deletedAssignments;
};

module.exports = {
	getAllAssignments,
	getAssignmentsByClassId,
	updateAssignment,
	deleteAssignment,
	createAssignment,
	deleteAssignmentsByClassId,
};
