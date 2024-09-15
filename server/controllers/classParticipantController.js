const express = require("express");
const participants = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db/dbConfig.js");

const {
	getAllParticipants,
	getOneParticipant,
	createParticipant,
	updateParticipant,
	deleteParticipant,
	existingParticipant,
} = require("../queries/classParticipant.js");

participants.get("/", async (req, res) => {
	try {
		const participantsList = await getAllParticipants();
		if (participantsList.length > 0) {
			res.json({ success: true, result: participantsList });
		} else {
			res.status(404).json({
				success: false,
				error: "No participants found.",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error...",
		});
	}
});

participants.get("/:participant_id", async (req, res) => {
	const { participant_id } = req.params;
	try {
		const participantDetail = await getOneParticipant(participant_id);
		if (participantDetail) {
			res.json({ success: true, result: participantDetail });
		} else {
			res.status(404).json({
				success: false,
				error: `No participant found with ID ${participant_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error...",
		});
	}
});

participants.post("/", async (req, res) => {
	const participantData = req.body;
	try {
		const classData = await db.one(
			"SELECT class_code FROM classes WHERE class_id = $1",
			[participantData.class_id]
		);

		const isClassCodeValid = await bcrypt.compare(
			participantData.class_code,
			classData.class_code
		);

		if (!isClassCodeValid) {
			return res.status(400).json({
				success: false,
				error: "Invalid class code.",
			});
		}

		const userExist = await existingParticipant(participantData);
		if (userExist) {
			return res.status(400).json({
				success: false,
				error: `User ${participantData.user_id} is already enrolled in this class.`,
			});
		}

		const createdParticipant = await createParticipant(participantData);
		return res.status(201).json({
			success: true,
			result: createdParticipant,
		});
	} catch (error) {
		console.error("Error handling participant:", error);
		return res.status(500).json({
			success: false,
			error: "Server error...",
		});
	}
});

participants.put("/:participant_id", async (req, res) => {
	const { participant_id } = req.params;
	const participantData = req.body;

	try {
		const updatedParticipant = await updateParticipant(
			participant_id,
			participantData
		);
		if (updatedParticipant.participant_id) {
			res.json({ success: true, result: updatedParticipant });
		} else {
			res.status(404).json({
				success: false,
				error: `No participant found with ID ${participant_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error...",
		});
	}
});

participants.delete("/:participant_id", async (req, res) => {
	const { participant_id } = req.params;

	try {
		const deletedParticipant = await deleteParticipant(participant_id);
		if (deletedParticipant.participant_id) {
			res.json({ success: true, result: deletedParticipant });
		} else {
			res.status(404).json({
				success: false,
				error: `No participant found with ID ${participant_id}`,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error...",
		});
	}
});

module.exports = participants;
