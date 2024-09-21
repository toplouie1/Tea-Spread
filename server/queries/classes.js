const db = require("../db/dbConfig.js");

const getAllClasses = async () => {
	const classes = await db.many("SELECT * FROM classes");
	return classes;
};

const getOneClass = async (class_id) => {
	const classDetail = await db.one(
		"SELECT * FROM classes WHERE class_id=$1",
		class_id
	);
	return classDetail;
};

const createClass = async (classData) => {
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
};

const updateClass = async (class_id, classData) => {
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
};

const deleteClass = async (class_id) => {
	const deletedClass = await db.one(
		"DELETE FROM classes WHERE class_id=$1 RETURNING *",
		class_id
	);
	return deletedClass;
};

module.exports = {
	getAllClasses,
	getOneClass,
	createClass,
	updateClass,
	deleteClass,
};
