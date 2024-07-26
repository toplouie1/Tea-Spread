const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
// app.use(express.json());

const PORT = 8000;

app.get("/users", (req, res) => {
	res.json({ users: ["userOne", "userTwo", "userThree"] });
});
app.get("/", (req, res) => {
	res.send("Welcome To Tea Spread");
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
