const db = require("../db/dbConfig.js");

const getUserClasses = async (userId) => {
	const classes = await db.many(
		"SELECT class_id FROM class_participants WHERE user_id = $1",
		[userId]
	);
	return classes;
};

module.exports = {
	getUserClasses,
};
