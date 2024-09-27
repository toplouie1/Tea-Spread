import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchClassData = async (setClasses) => {
	try {
		const response = await axios.get(`${API}/classes`);
		if (response.data.success) {
			setClasses(response.data.result);
		} else {
			console.error("Error fetching all classes:", response.data.error);
		}
	} catch (error) {
		console.log("Error fetching classes", error);
	}
};

export const fetchYourClass = async (userId, setUserClass) => {
	if (!userId) return;

	try {
		const response = await axios.get(`${API}/userclass/${userId}`);
		if (response.data.success) {
			setUserClass(response.data.result);
		} else {
			console.error("Error fetching your classes:", response.data.error);
		}
	} catch (error) {
		console.error("Error fetching your classes:", error);
	}
};

export const getClassAssignmnents = async (class_id) => {
	try {
		const response = await axios.get(`${API}/assignments/${class_id}`);
		if (response.data.success) {
			return response.data.result;
		} else {
			console.error("Error fetching your assignment", response.data.error);
		}
	} catch (error) {
		console.log(error, "error getting assignments for the selected class");
	}
};

export const isValidUrl = (string) => {
	try {
		new URL(string);
		return true;
	} catch (err) {
		return false;
	}
};
