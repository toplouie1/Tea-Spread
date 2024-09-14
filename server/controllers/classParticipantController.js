const express = require("express");
const participants = express.Router();

const {
	getAllParticipants,
	getOneParticipant,
	createParticipant,
	updateParticipant,
	deleteParticipant,
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
		const createdParticipant = await createParticipant(participantData);
		if (createdParticipant.participant_id) {
			res.json({ success: true, result: createdParticipant });
		} else {
			res
				.status(500)
				.json({ success: false, error: "Error creating participant" });
		}
	} catch (error) {
		res.status(500).json({
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
