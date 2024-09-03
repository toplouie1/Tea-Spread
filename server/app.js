const cors = require("cors");
const express = require("express");
const app = express();
const usersController = require("./controllers/usersControllers.js");
app.use(cors());

app.use(express.json());

app.use("/users", usersController);
app.get("/", (req, res) => {
	res.send("Welcome To Tea Spread");
});

app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});

module.exports = app;
