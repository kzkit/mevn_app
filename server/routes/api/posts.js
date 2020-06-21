const express = require("express");
const mongodb = require("mongodb");
//setup the router to export back to index.js
const router = express.Router();

//Get posts
router.get("/", async (req, res) => {
	const posts = await loadPostsCollection();
	res.send(await posts.find({}).toArray());
});

//Add posts
router.post("/", async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.insertOne({
		message: req.body.message,
		createdAt: new Date(),
	});
	res.status(201).send();
});

// Delete
router.delete("/:id", async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
	res.status(200).send();
});

async function loadPostsCollection() {
	const client = await mongodb.MongoClient.connect(
		"mongodb+srv://coh0rt:coh0rt@mevnapp-ronqk.mongodb.net/<dbname>?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);

	return client.db("mevnApp").collection("posts");
}

module.exports = router;
