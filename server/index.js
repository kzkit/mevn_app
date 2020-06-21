const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const posts = require("./routes/api/posts");
app.use(cors());
//any request to api/posts will be directed to posts
app.use(express.json());

app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(__dirname + "/public/"));

	app.get(/.*/);
}

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
