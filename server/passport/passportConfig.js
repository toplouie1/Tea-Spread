const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");

// verify password using passport , passport local
async function authenticateUser(username, password_hash, done) {
	try {
		const user = await db.oneOrNone(
			"SELECT * FROM users WHERE username=$1",
			username
		);

		if (!user) {
			return done(null, false, { message: "User not found" });
		}
		const isValid = await bcrypt.compare(password_hash, user.password_hash);

		if (isValid) {
			return done(null, user);
		} else {
			return done(null, false, { message: "Invalid password" });
		}
	} catch (error) {
		return done(error);
	}
}

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password_hash",
			session: true,
		},
		authenticateUser
	)
);

// Stores user details inside session. serializeUser determines which data of the user
// object should be stored in the session. The result of the serializeUser method is attached
// to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
//  the user id as the key) req.session.passport.user = {id: 'xyz'}
passport.serializeUser((user, done) => done(null, user.user_id));

// In deserializeUser that key is matched with the in-memory array / database or any data resource.
// The fetched object is attached to the request object as req.user
passport.deserializeUser(async function (userId, done) {
	try {
		const user = await db.oneOrNone(
			"SELECT * FROM users WHERE user_id=$1",
			userId
		);
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	} catch (error) {
		done(error);
	}
});
