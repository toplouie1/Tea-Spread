const express = require("express");
const users = express.Router();

const { getAllUsers, getOneUser } = require("../queries/users.js");

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

module.exports = users;
