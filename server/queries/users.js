const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");

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

const createUser = async (user) => {
	try {
		const createdUser = await db.one(
			"INSERT INTO users(username, password_hash) VALUES($1,$2) RETURNING *",
			[user.username, user.password_hash]
		);
		return createdUser;
	} catch (error) {
		return error;
	}
};

const authUser = async (user_name, password) => {
	try {
		const user = await db.one(
			"SELECT * FROM users WHERE username=$1",
			user_name
		);

		const match = await bcrypt.compare(password, user.password_hash);
		if (match) {
			const userInfo = {
				uid: user.user_id,
				user_name: user.username,
			};
			return userInfo;
		}
	} catch (e) {
		return { error: "Username doesn't exist..." };
	}
};

module.exports = {
	getAllUsers,
	getOneUser,
	createUser,
	authUser,
};
