const db = require("../db/dbConfig.js");

const getUserClasses = async (userId) => {
	try {
		const classes = await db.many(
			"SELECT class_id FROM class_participants WHERE user_id = $1",
			[userId]
		);
		return classes;
	} catch (error) {
		console.error("Error fetching classes for the user:", error);
		throw new Error("Unable to fetch classes.");
	}
};

module.exports = {
	getUserClasses,
};
