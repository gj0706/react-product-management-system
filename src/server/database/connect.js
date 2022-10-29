const mongoose = require("mongoose");

const connectiongStr =
	"mongodb+srv://gj0706:fEbjun-2cyhky-tyjfuq@product-management.t0ytpwp.mongodb.net/?retryWrites=true&w=majority";

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
