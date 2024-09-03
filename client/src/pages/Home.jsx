import "../css/Home.css";
import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

function Home() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get(API + "/users")
			.then((response) => {
				setUsers(response.data.result[0].username);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="Home">
			<div className="Hero">
				<div className="Hero-text">
					<h1>
						TEA SPREAD <br />
					</h1>
					<img
						src="https://pictarts.com/04/material/09-school-study/0898-free-image-m.png"
						className="image"
					/>
					<>{users}</>
				</div>
			</div>
		</div>
	);
}

export default Home;
