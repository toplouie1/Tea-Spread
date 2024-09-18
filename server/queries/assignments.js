const db = require("../db/dbConfig.js");

const getAllAssignments = async () => {
	try {
		const assignments = await db.many("SELECT * FROM assignments");
		return assignments;
	} catch (error) {
		return error;
	}
};

const getAssignmentsByClassId = async (class_id) => {
	try {
		const assignments = await db.many(
			"SELECT * FROM assignments WHERE class_id=$1",
			class_id
		);
		return assignments;
	} catch (error) {
		return error;
	}
};

const updateAssignment = async (assignment_id, assignmentData) => {
	try {
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
	} catch (error) {
		return error;
	}
};

const deleteAssignment = async (assignment_id) => {
	try {
		const deletedAssignment = await db.one(
			"DELETE FROM assignments WHERE assignment_id=$1 RETURNING *",
			assignment_id
		);
		return deletedAssignment;
	} catch (error) {
		return error;
	}
};

const createAssignment = async (assignmentData) => {
	try {
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
	} catch (error) {
		return error;
	}
};

const deleteAssignmentsByClassId = async (class_id) => {
	try {
		const deletedAssignments = await db.any(
			"DELETE FROM assignments WHERE class_id=$1 RETURNING *",
			class_id
		);
		return deletedAssignments;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getAllAssignments,
	getAssignmentsByClassId,
	updateAssignment,
	deleteAssignment,
	createAssignment,
	deleteAssignmentsByClassId,
};
