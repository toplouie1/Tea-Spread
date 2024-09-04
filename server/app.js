const cors = require("cors");
const express = require("express");
const passport = require("passport");
const session = require("express-session");

const app = express();
const usersController = require("./controllers/usersControllers.js");
app.use(cors());

app.use(express.json());

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			// httpOnly: true,
			// sameSite: "none",
			// secure: true,
			// maxAge: 1000 * 60 * 60 * 24,
		},
	})
);

// initialize the passport js middleware ;
app.use(passport.initialize());
// serialize and desarilize
app.use(passport.session());

app.use("/users", usersController);
app.get("/", (req, res) => {
	res.send("Welcome To Tea Spread");
});

app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});

module.exports = app;
