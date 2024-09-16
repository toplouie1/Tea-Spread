const express = require("express");
const yourclass = express.Router();

const { getUserClasses } = require("../queries/userClass");

yourclass.get("/:userId", async (req, res) => {
	const { userId } = req.params;

	try {
		const classes = await getUserClasses(userId);
		return res.status(200).json({
			success: true,
			result: classes,
		});
	} catch (error) {
		console.error("Error fetching user's classes:", error);
		return res.status(500).json({
			success: false,
			error: "Unable to fetch classes for the user.",
		});
	}
});

module.exports = yourclass;
