const db = require("../db/dbConfig.js");

const getAllParticipants = async () => {
	try {
		const participants = await db.many("SELECT * FROM class_participants");
		return participants;
	} catch (error) {
		return error;
	}
};

const getOneParticipant = async (participant_id) => {
	try {
		const participant = await db.one(
			"SELECT * FROM class_participants WHERE participant_id=$1",
			participant_id
		);
		return participant;
	} catch (error) {
		return error;
	}
};

const createParticipant = async (participantData) => {
	try {
		const createdParticipant = await db.one(
			"INSERT INTO class_participants (class_id, user_id, role) VALUES ($1, $2, $3) RETURNING *",
			[participantData.class_id, participantData.user_id, participantData.role]
		);
		return createdParticipant;
	} catch (error) {
		return error;
	}
};

const updateParticipant = async (participant_id, participantData) => {
	try {
		const updatedParticipant = await db.one(
			"UPDATE class_participants SET class_id=$2, user_id=$3, role=$4, enrollment_date=CURRENT_TIMESTAMP WHERE participant_id=$1 RETURNING *",
			[
				participant_id,
				participantData.class_id,
				participantData.user_id,
				participantData.role,
			]
		);
		return updatedParticipant;
	} catch (error) {
		return error;
	}
};

const deleteParticipant = async (participant_id) => {
	try {
		const deletedParticipant = await db.one(
			"DELETE FROM class_participants WHERE participant_id=$1 RETURNING *",
			participant_id
		);
		return deletedParticipant;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getAllParticipants,
	getOneParticipant,
	createParticipant,
	updateParticipant,
	deleteParticipant,
};
