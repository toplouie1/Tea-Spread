const express = require("express");
const users = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
require("../passport/passportConfig.js");

const {
	getAllUsers,
	getOneUser,
	createUser,
	authUser,
} = require("../queries/users.js");

users.get("/", async (req, res) => {
	const users = await getAllUsers();
	if (users[0]) {
		res.json({ success: true, result: users });
	} else res.status(500).json({ success: false, error: "server error..." });
});

users.get("/:user_id", async (req, res) => {
	const { user_id } = req.params;

	const user = await getOneUser(user_id);
	if (user.user_id) {
		res.json({ success: true, result: user });
	} else
		res.status(500).json({
			success: false,
			error: `server error, no user at index ${user_id}`,
		});
});

users.post("/sign_up", async (req, res) => {
	const { password } = req.body;
	const hashedpassword = await bcrypt.hash(password, 10);
	const user = req.body;
	user.password_hash = hashedpassword;
	const createdUser = await createUser(user);
	if (createdUser.user_id) {
		res.json({ success: true, result: createdUser });
	} else {
		res
			.status(500)
			.json({ success: false, error: "Error/Username already exist" });
	}
});

users.post("/login", passport.authenticate("local"), async (req, res) => {
	const { username, password_hash } = req.body;
	console.log("Received body:", req.body);

	if (!username || !password_hash) {
		return res
			.status(400)
			.json({ success: false, error: "Missing username or password" });
	}

	try {
		const userInfo = await authUser(username, password_hash);

		if (userInfo.error) {
			return res.status(400).json({ success: false, error: userInfo.error });
		}

		res.json({ success: true, result: userInfo });
	} catch (error) {
		res.status(500).json({ success: false, error: "Internal server error" });
	}
});

module.exports = users;
