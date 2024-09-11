const db = require("../db/dbConfig.js");

const getAllProfiles = async () => {
	try {
		const profiles = await db.many("SELECT * FROM profiles");
		return profiles;
	} catch (error) {
		return error;
	}
};

const getOneProfile = async (pid) => {
	try {
		const profile = await db.oneOrNone(
			`SELECT user_id, email, first_name, last_name, role, created_at, updated_at 
			FROM profiles 
			WHERE user_id = $1`,
			[pid]
		);
		return profile;
	} catch (error) {
		console.error("Error fetching profile:", error);
		return error;
	}
};

const createProfile = async (profile) => {
	try {
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
	} catch (error) {
		return error;
	}
};

const updateProfile = async (pid, profile) => {
	try {
		const updatedProfile = await db.one(
			"UPDATE profiles SET email=$1, first_name=$2, last_name=$3, role=$4, updated_at=CURRENT_TIMESTAMP WHERE profile_id=$5 RETURNING *",
			[profile.email, profile.first_name, profile.last_name, profile.role, pid]
		);
		return updatedProfile;
	} catch (error) {
		return error;
	}
};

const deleteProfile = async (pid) => {
	try {
		const deletedProfile = await db.one(
			"DELETE FROM profiles WHERE profile_id=$1 RETURNING *",
			pid
		);
		return deletedProfile;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getAllProfiles,
	getOneProfile,
	createProfile,
	updateProfile,
	deleteProfile,
};
