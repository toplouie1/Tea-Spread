import React from "react";
import "../css/Home.css";

function Home() {
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
				<h1> Àbout ŤÈĀ </h1>
				<div className="intro-container">
					<img
						alt="homeimg"
						src="https://media.istockphoto.com/vectors/computer-lab-abstract-concept-vector-illustration-vector-id1353786683?k=20&m=1353786683&s=612x612&w=0&h=qOnTLR1tqTPTsqtZl1wKi6tiuDxF-Le0KRKnuUZ7oBU="
					/>
					<p>
						Welcome to TeaSpread, the all-in-one platform designed to streamline
						and enhance the teaching experience. TeaSpread is your virtual
						classroom assistant, allowing you to effortlessly assign homework,
						manage classwork, create quizzes, leave messages for students, and
						grade their work—all in one convenient place.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
