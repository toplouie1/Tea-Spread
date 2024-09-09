const db = require("../db/dbConfig.js");

const getAllClasses = async () => {
	try {
		const classes = await db.many("SELECT * FROM classes");
		return classes;
	} catch (error) {
		return error;
	}
};

const getOneClass = async (class_id) => {
	try {
		const classDetail = await db.one(
			"SELECT * FROM classes WHERE class_id=$1",
			class_id
		);
		return classDetail;
	} catch (error) {
		return error;
	}
};

const createClass = async (classData) => {
	try {
		const createdClass = await db.one(
			"INSERT INTO classes(class_name, class_description, class_code, start_date, end_date, max_students) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
			[
				classData.class_name,
				classData.class_description,
				classData.class_code,
				classData.start_date,
				classData.end_date,
				classData.max_students,
			]
		);
		return createdClass;
	} catch (error) {
		return error;
	}
};

const updateClass = async (class_id, classData) => {
	try {
		const updatedClass = await db.one(
			"UPDATE classes SET class_name=$2, class_description=$3, class_code=$4, start_date=$5, end_date=$6, max_students=$7, updated_at=CURRENT_TIMESTAMP WHERE class_id=$1 RETURNING *",
			[
				class_id,
				classData.class_name,
				classData.class_description,
				classData.class_code,
				classData.start_date,
				classData.end_date,
				classData.max_students,
			]
		);
		return updatedClass;
	} catch (error) {
		return error;
	}
};

const deleteClass = async (class_id) => {
	try {
		const deletedClass = await db.one(
			"DELETE FROM classes WHERE class_id=$1 RETURNING *",
			class_id
		);
		return deletedClass;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getAllClasses,
	getOneClass,
	createClass,
	updateClass,
	deleteClass,
};
