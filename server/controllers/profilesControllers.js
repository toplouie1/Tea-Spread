const express = require("express");
const profiles = express.Router();

const {
	getAllProfiles,
	getOneProfile,
	createProfile,
	updateProfile,
	deleteProfile,
	getProfileByuserID,
} = require("../queries/profiles.js");

profiles.get("/", async (req, res) => {
	const allProfiles = await getAllProfiles();
	if (allProfiles[0]) {
		res.json({ success: true, result: allProfiles });
	} else {
		res.status(500).json({ success: false, error: "Server error..." });
	}
});

profiles.get("/:profile_id", async (req, res) => {
	const { profile_id } = req.params;
	const profile = await getOneProfile(profile_id);
	if (profile.profile_id) {
		res.json({ success: true, result: profile });
	} else {
		res
			.status(500)
			.json({ success: false, error: `No profile found at ID ${profile_id}` });
	}
});

profiles.get("/:user_id", async (req, res) => {
	const { user_id } = req.params;
	const profile = await getProfileByuserID(user_id);
	if (profile && profile.user_id) {
		res.json({ success: true, result: profile });
	} else {
		res
			.status(500)
			.json({
				success: false,
				error: `No profile found for user ID ${user_id}`,
			});
	}
});

profiles.post("/", async (req, res) => {
	const profileData = req.body;
	const createdProfile = await createProfile(profileData);
	if (createdProfile.profile_id) {
		res.json({ success: true, result: createdProfile });
	} else {
		res.status(500).json({ success: false, error: "Failed to create profile" });
	}
});

profiles.put("/:profile_id", async (req, res) => {
	const { profile_id } = req.params;
	const updatedProfile = await updateProfile(profile_id, req.body);
	if (updatedProfile.profile_id) {
		res.json({ success: true, result: updatedProfile });
	} else {
		res.status(500).json({
			success: false,
			error: `Failed to update profile at ID ${profile_id}`,
		});
	}
});

profiles.delete("/:profile_id", async (req, res) => {
	const { profile_id } = req.params;
	const deletedProfile = await deleteProfile(profile_id);
	if (deletedProfile.profile_id) {
		res.json({ success: true, result: deletedProfile });
	} else {
		res.status(500).json({
			success: false,
			error: `Failed to delete profile at ID ${profile_id}`,
		});
	}
});

module.exports = profiles;
