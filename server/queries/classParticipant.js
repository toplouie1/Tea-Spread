const db = require("../db/dbConfig.js");

const getAllParticipants = async () => {
	const participants = await db.many("SELECT * FROM class_participants");
	return participants;
};

const getOneParticipant = async (participant_id) => {
	const participant = await db.one(
		"SELECT * FROM class_participants WHERE participant_id=$1",
		participant_id
	);
	return participant;
};

const existingParticipant = async (participantData) => {
	const existingParticipant = await db.oneOrNone(
		"SELECT * FROM class_participants WHERE user_id=$1 AND class_id=$2",
		[participantData.user_id, participantData.class_id]
	);
	return existingParticipant;
};

const createParticipant = async (participantData) => {
	const createdParticipant = await db.one(
		"INSERT INTO class_participants (class_id, user_id, role) VALUES ($1, $2, $3) RETURNING *",
		[participantData.class_id, participantData.user_id, participantData.role]
	);
	return createdParticipant;
};

const updateParticipant = async (participant_id, participantData) => {
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
};

const deleteParticipant = async (participant_id) => {
	const deletedParticipant = await db.one(
		"DELETE FROM class_participants WHERE participant_id=$1 RETURNING *",
		participant_id
	);
	return deletedParticipant;
};

module.exports = {
	getAllParticipants,
	getOneParticipant,
	createParticipant,
	updateParticipant,
	deleteParticipant,
	existingParticipant,
};
