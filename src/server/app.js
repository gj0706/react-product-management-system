var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");
// connect to database

const connectToMongoose = require("./database/connect");
const User = require("./database/userModel");
const Product = require("./database/productModel");
const Cart = require("./database/cartModel");
connectToMongoose();

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
const { get } = require("http");
const { electron } = require("webpack");
const { resolveWatchPlugin } = require("jest-resolve");
const { query } = require("express");

var app = express();

// 1. allCustomers => return all the customer info(emial, pw, type) => GET
// 2. signIn => add a new customer to the backend, return a boolean flag/status => POST
// 3. updateInfo => update a customer's information, return a boolean flag/status => PUT
// 4. deleteInfo => delete a customer's info from backend, return a boolean flag/ status => DELETE

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// get all users
app.get("/getUsers", async (_, res) => {
	try {
		const usersData = await User.find({});
		const allUsers = usersData.map(({ email, id, password, type }) => {
			return { email, id, password, type };
		});
		res.json(allUsers);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.post("/getOneUser", async (req, res) => {
	try {
		const user = await User.findById(req.body.id);
		res.json(user);
	} catch {
		res.status(500).json({ message: error.message });
	}
});

// sign in
app.post("/signin", async (req, res) => {
	if (req.body && req.body.email && req.body.password) {
		const email = req.body.email;
		const password = req.body.password;
		const queryResult = await User.findOne({ email });

		if (password === queryResult.password) {
			res.json({
				message: `You've successfully signed in with Email: ${req.body.email}`,
				data: queryResult,
			});
			return;
		} else {
			return res.json({
				message: "Email or password doesn't match",
				status: 400,
			});
		}
	}
	res.json({ message: "Failed to sign in" });
});

// sign up
app.post("/signup", async (req, res) => {
	//happy path
	if (req.body && req.body.email && req.body.password && req.body.id) {
		const user = new User({
			type: req.body.type,
			id: req.body.id,
			email: req.body.email,
			password: req.body.password,
		});
		try {
			const newUser = await user.save();
			if (user === newUser) {
				res.status(201).json({
					message: "Sign up succeed",
					newUser: {
						id: newUser.id,
						email: newUser.email,
					},
				});
				return;
			}
		} catch (error) {
			// error handling
			res.json({ message: "Failed to add a user", status: 400 });
		}
	}
	res.json({ message: "Failed to sign up" });
});

// get all products
app.get("/getProducts", async (_, res) => {
	try {
		const productData = await Product.find({});

		res.json(productData);
	} catch (err) {
		console.log.error("something went wrong");
	}
});

// add a product
app.post("/addProduct", async (req, res) => {
	//happy path

	if (
		req.body &&
		req.body.id &&
		req.body.name &&
		req.body.description &&
		req.body.quantity &&
		req.body.price &&
		req.body.imageUrl
	) {
		const product = new Product({
			id: req.body.id,
			name: req.body.name,
			price: req.body.price,
			quantity: req.body.quantity,
			imageUrl: req.body.imageUrl,
			description: req.body.description,
		});

		const newProduct = await product.save();
		if (product === newProduct) {
			res.status(201).json({
				message: "Product added",
				newProduct: {
					id: newProduct.id,
					name: newProduct.name,
					price: newProduct.price,
					quantity: newProduct.quantity,
					imageUrl: newProduct.imageUrl,
					description: newProduct.description,
				},
			});
			return;
		}
		// error handling
		res.json({ message: "Failed to add a user", status: 400 });
	}
	res.json({ message: "Failed to sign up" });
});

app.get("/signout", (req, res) => {
	res.json("Successfully signedout");
});

// update product infomation
app.put("/updateProduct", async (req, res) => {
	try {
		if (req.body && req.body.id) {
			const id = req.body.id;
			const updatedData = req.body;
			const result = await Product.findOne({ id });
			const { modifiedCount } = await result.updateOne(updatedData);

			if (modifiedCount) {
				res.status(200).json({ message: "Update succeed", data: updatedData });
				return;
			}
		}
	} catch (error) {
		res.status(400).json({ message: "Update failed" });
	}
});

// get all cart info from a user
app.get("/getCart/:id", async (req, res) => {
	const userId = req.params.id;
	try {
		const cart = await Cart.findOne({ userId });
		const cartItems = cart.cartItems;
		// if (cartItems.length > 0) {
		res.status(200).json(cartItems);
		// } else {
		// 	res.json("Cart is empty");
		// }
	} catch (err) {
		res.status(400).send(err);
	}
});

// app.post("/getCart/:id", async (req, res) => {
// 	const userId = req.params.id;
// 	try {
// 		const cart = await Cart.findOne({ userId });
// 		if (!cart) {
// 			const newCart = new Cart({
// 				userId: userId,
// 				cartItems: [],
// 			});
// 			const savedCart = await newCart.save();
// 			res.status(200).json({
// 				message: "No cart found. Created a new cart for you.",
// 				cartItems: cartItems,
// 			});
// 		} else {
// 			const cartItems = cart.cartItems;
// 			if (cartItems.length > 0) {
// 				res
// 					.status(200)
// 					.json({ message: "Fetch success", cartItems: cartItems });
// 			} else {
// 				res.send({ message: "Cart is empty", cartItems: cartItems });
// 			}
// 		}
// 	} catch (err) {
// 		res.status(500).send(err);
// 	}
// });

// create a new cart
app.post("/newCart/:id", async (req, res) => {
	const userId = req.params.id;
	const newCart = new Cart({
		userId: userId,
		cartItems: [],
	});
	try {
		const savedCart = await newCart.save();
		res.status(200).json(savedCart);
	} catch (err) {
		res.status(400).send(err);
	}
});

// update a cart

app.put("/updateCart/:id", async (req, res) => {
	const userId = req.params.id;
	const updatedData = req.body;
	try {
		const result = await Cart.findOne({ userId });
		const { modifiedCount } = await result.updateOne(updatedData);

		if (modifiedCount) {
			res.status(200).json({ message: "Cart update succeed", data: result });
			return;
		}
	} catch (err) {
		res.status(400).json(err);
	}
});
// app.put("/updateCart", async (req, res) => {
// 	const userId = req.body.userId;
// 	try {
// 		const updatedCart = await Cart.findByIdAndUpdate(
// 			userId,
// 			{
// 				$push: req.body.cartItems,
// 			},
// 			{ new: true, upsert: true }
// 		);
// 		res.status(200).json(updatedCart);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// delete a cart
app.delete("/deleteCart", async (req, res) => {
	const userId = req.body.userId;
	try {
		await Cart.findByIdAndDelete(userId);
		res.status(200).json("Cart has been deleted...");
	} catch (err) {
		res.status(400).json(err);
	}
});

// app.post("/addItemToCart", async (req, res) => {
// 	Cart.findOne({ user: req.body.userId }).exec((error, cart) => {
// 		if (error) return res.status(400).json({ error });
// 		if (cart) {
// 			const productId = req.body.cartItems.productId;
// 			const item = cart.cartItems.find((c) => c.product_id == product_id);
// 			if (item) {
// 				Cart.findOneAndUpdate(
// 					{ user: req.user._id, "cartItems.product_id": product_id },
// 					{
// 						$cartItems: {
// 							...req.body.cartItems,
// 							quantity: item.quantity + req.body.cartItems.quantity,
// 						},
// 					}
// 				).exec((error, _cart) => {
// 					if (error) return res.status(400).json({ error });
// 					if (_cart) {
// 						return res.status(201).json({ cart: _cart });
// 					}
// 				});
// 				// if user cart does't exist create a list of cart for the user
// 			} else {
// 				Cart.findOneAndUpdate(
// 					{ user: req.user._id },
// 					{
// 						$push: {
// 							cartItems: req.body.cartItems,
// 						},
// 					}
// 				).exec((error, _cart) => {
// 					if (error) return res.status(400).json({ error });
// 					if (_cart) {
// 						return res.status(201).json({ cart: _cart });
// 					}
// 				});
// 			}
// 		} else {
// 			// if cart not exist create a new cart
// 			const cart = new Cart({
// 				user: req.user._id,
// 				cartItems: req.body.cartItems,
// 			});
// 			cart.save((error, cart) => {
// 				if (error) return res.status(400).json({ error });
// 				if (cart) {
// 					return res.status(200).json({ cart });
// 				}
// 			});
// 		}
// 	});
// });

// app.post("/addToCart", async (req, res) => {
// 	const userId = req.body.userId;
// 	try {
// 		const cart = await User.findOne({ userId });
// 		const cartItems = user.cartItems;
// 		if (cartItems) {
// 			const itemIndex = cartItems.findIndex(
// 				(item) => item.productId === req.body.cartItem.productId
// 			);

// 			if (itemIndex > -1) {
// 				// product already in the cart, update quantity
// 				const cartItem = cartItems[itemIndex];
// 				cartItem.quantity += req.body.cartItem.quantity;
// 				cartItems[itemIndex] = cartItem;
// 			} else {
// 				// product not in the cart, add to the cartItems list
// 				cartItems.push(req.body.cartItem);
// 			}

// 			await cartItems.save();
// 			return res.status(201).send(cartItems);
// 		} else {
// 			// if there is no cart for the user, create a new cart

// 			const newCart = await user.insert({
// 				cartItems: [{ ...req.body.cartItem }],
// 			});
// 			return res.status(201).send(newCart);
// 		}
// 	} catch (error) {
// 		res.json({ message: "Update failed", status: 400 });
// 	}
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
