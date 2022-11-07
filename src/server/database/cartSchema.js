const mongoose = require("mongoose");

const ObjectID = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema(
	{
		userId: {
			// type: ObjectID,
			// ref: "User",
			type: String,
			required: true,
		},
		cartItems: [
			{
				productId: {
					type: String,
					// type: ObjectID,
					// ref: "Product",
					required: true,
				},
				quantity: {
					type: String,
				},
				name: { type: String },
				price: { type: String },
				imageUrl: { type: String },
			},
		],
	},
	{ timestamps: true }
);

module.exports = cartSchema;
