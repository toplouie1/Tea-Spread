const cors = require("cors");
const express = require("express");
const passport = require("passport");
const session = require("express-session");

const app = express();
const usersController = require("./controllers/usersControllers.js");
const profilesController = require("./controllers/profilesControllers.js");
app.use(cors());

app.use(express.json());

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersController);
app.use("/profiles", profilesController);
app.get("/", (req, res) => {
	res.send("Welcome To Tea Spread");
});

app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});

module.exports = app;
