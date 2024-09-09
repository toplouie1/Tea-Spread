const express = require("express");
const classes = express.Router();

const {
	getAllClasses,
	getOneClass,
	createClass,
	updateClass,
	deleteClass,
} = require("../queries/classes.js");

classes.get("/", async (req, res) => {
	try {
		const classesList = await getAllClasses();
		if (classesList.length > 0) {
			res.json({ success: true, result: classesList });
		} else {
			res.status(404).json({
				success: false,
				error: "No classes found.",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error...",
		});
	}
});

classes.get("/:class_id", async (req, res) => {
	const { class_id } = req.params;

	try {
		const classDetail = await getOneClass(class_id);
		if (classDetail) {
			res.json({ success: true, result: classDetail });
		} else {
			res.status(404).json({
				success: false,
				error: `No class found with ID ${class_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error...",
		});
	}
});

// Create a new class
classes.post("/", async (req, res) => {
	const classData = req.body;
	try {
		const createdClass = await createClass(classData);
		if (createdClass.class_id) {
			res.json({ success: true, result: createdClass });
		} else {
			res.status(500).json({ success: false, error: "Error creating class" });
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error...",
		});
	}
});

classes.put("/:class_id", async (req, res) => {
	const { class_id } = req.params;
	const classData = req.body;

	try {
		const updatedClass = await updateClass(class_id, classData);
		if (updatedClass.class_id) {
			res.json({ success: true, result: updatedClass });
		} else {
			res.status(404).json({
				success: false,
				error: `No class found with ID ${class_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error...",
		});
	}
});

classes.delete("/:class_id", async (req, res) => {
	const { class_id } = req.params;

	try {
		const deletedClass = await deleteClass(class_id);
		if (deletedClass.class_id) {
			res.json({ success: true, result: deletedClass });
		} else {
			res.status(404).json({
				success: false,
				error: `No class found with ID ${class_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error...",
		});
	}
});

module.exports = classes;
