const db = require("../db/dbConfig.js");

const getAllUsers = async () => {
	try {
		var users = await db.many("SELECT * FROM users");
		return users;
	} catch (error) {
		return error;
	}
};

const getOneUser = async (uid) => {
	try {
		const user = await db.one("SELECT * FROM users WHERE user_id=$1", uid);
		return user;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getAllUsers,
	getOneUser,
};
