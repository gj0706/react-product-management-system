const mongoose = require("mongoose");
const { schema } = require("webpack-dev-server");

// mongodb => setup schema => setup model => use model to query and update entity in the database

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
	{ tiimestamp: true }
);

module.exports = userSchema;
