const db = require("../db/dbConfig.js");

const getAllProfiles = async () => {
	const profiles = await db.many("SELECT * FROM profiles");
	return profiles;
};

const getOneProfile = async (pid) => {
	const profile = await db.oneOrNone(
		`SELECT user_id, email, first_name, last_name, role, created_at, updated_at 
			FROM profiles 
			WHERE user_id = $1`,
		[pid]
	);
	return profile;
};

const createProfile = async (profile) => {
	const createdProfile = await db.one(
		"INSERT INTO profiles(user_id, email, first_name, last_name, role) VALUES($1, $2, $3, $4, $5) RETURNING *",
		[
			profile.user_id,
			profile.email,
			profile.first_name,
			profile.last_name,
			profile.role,
		]
	);
	return createdProfile;
};

const updateProfile = async (pid, profile) => {
	const updatedProfile = await db.one(
		"UPDATE profiles SET email=$1, first_name=$2, last_name=$3, role=$4, updated_at=CURRENT_TIMESTAMP WHERE user_id=$5 RETURNING *",
		[profile.email, profile.first_name, profile.last_name, profile.role, pid]
	);
	return updatedProfile;
};

const deleteProfile = async (pid) => {
	const deletedProfile = await db.one(
		"DELETE FROM profiles WHERE profile_id=$1 RETURNING *",
		pid
	);
	return deletedProfile;
};

module.exports = {
	getAllProfiles,
	getOneProfile,
	createProfile,
	updateProfile,
	deleteProfile,
};
