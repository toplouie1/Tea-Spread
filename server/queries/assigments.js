const db = require("../db/dbConfig.js");

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
			"UPDATE assignments SET class_id=$2, title=$3, description=$4, due_date=$5, updated_at=CURRENT_TIMESTAMP WHERE assignment_id=$1 RETURNING *",
			[
				assignment_id,
				assignmentData.class_id,
				assignmentData.title,
				assignmentData.description,
				assignmentData.due_date,
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

const deleteAssignmentsByClassId = async (class_id) => {
	try {
		const deletedAssignments = await db.many(
			"DELETE FROM assignments WHERE class_id=$1 RETURNING *",
			class_id
		);
		return deletedAssignments;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getAssignmentsByClassId,
	updateAssignment,
	deleteAssignment,
	deleteAssignmentsByClassId,
};
