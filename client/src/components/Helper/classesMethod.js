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
