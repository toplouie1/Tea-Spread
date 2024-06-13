const express = require("express");
const app = express();

app.get("/api", (req, res) => {
	res.json({ users: ["userOne", "userTwo"] });
});

app.listen(8888, () => {
	console.log("server started on 8888");
});
