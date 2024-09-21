const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
	const users = await db.many("SELECT * FROM users");
	return users;
};

const getOneUser = async (uid) => {
	const user = await db.one("SELECT * FROM users WHERE user_id=$1", uid);
	return user;
};

const createUser = async (user) => {
	const createdUser = await db.one(
		"INSERT INTO users(username, password_hash) VALUES($1,$2) RETURNING *",
		[user.username, user.password_hash]
	);
	return createdUser;
};

const authUser = async (username, password) => {
	const user = await db.one("SELECT * FROM users WHERE username=$1", username);
	const match = await bcrypt.compare(password, user.password_hash);
	if (match) {
		const userInfo = {
			user_id: user.user_id,
			username: user.username,
		};
		return userInfo;
	}
};

module.exports = {
	getAllUsers,
	getOneUser,
	createUser,
	authUser,
};
