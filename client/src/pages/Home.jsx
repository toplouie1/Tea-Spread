import React, { useEffect, useState } from "react";
import "../css/Home.css";

function Home() {
	const [checking, setChecking] = useState({});
	useEffect(() => {
		fetch("http://localhost:8000/users")
			.then((res) => {
				return res.json();
			})
			.then((data) => setChecking(data))
			.catch((err) => console.log(err));
	}, []);

	const users = ["userOne", "userTwo", "userThree"];
	console.log(checking.users);

	return (
		<div className="Home">
			<div className="Hero">
				<div className="Hero-text">
					<h1>
						ŤÈĀ SPREAD <br />
					</h1>
					<h3>
						Welcome to Tea Spread, the all-in-one platform designed to
						streamline classroom management by enabling teachers to assign
						homework, create quizzes, communicate with students, and grade their
						work effortlessly.
					</h3>
				</div>
			</div>
			<div className="introduction">
				<div className="intro-container">
					<img
						alt="homeimg"
						src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNV8zZF9yZW5kZXJfY2hhcmFjdGVyX29mX2FfeW91bmdfYXNpYW5fdGVhY2hlcl9zdF84OTk0MWU2NC1lNDM3LTQ0MTEtOWEyNi01MjcxZDlhMzUwMzNfMS5qcGc.jpg"
					/>
					{/* <p>
						Welcome to TeaSpread, the all-in-one platform designed to streamline
						and enhance the teaching experience. TeaSpread is your virtual
						classroom assistant, allowing you to effortlessly assign homework,
						manage classwork, create quizzes, leave messages for students, and
						grade their work—all in one convenient place.
					</p> */}
					{checking.users && (
						<p>
							{checking.users.map((user) => (
								<p key={user}>{user}</p>
							))}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
