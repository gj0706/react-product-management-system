const mongoose = require("mongoose");
require("dotenv").config();

const connectiongStr = process.env.MONGO_URL;

const connectToMongoose = () => {
	mongoose.connect(connectiongStr, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = mongoose.connection;
	db.on("error", console.error.bind(console), "connection error");
	db.on("open", () => {
		console.log("Connected to mongodb");
	});
};

module.exports = connectToMongoose;
