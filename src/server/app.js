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

// 1. get all customers(GET)
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
				message: "Email or passrod doesn't match",
				status: 400,
			});
		}
	}
	res.json({ message: "Failed to sign in" });
});

// 2. add a customer(POST) todo content will be put in the req.body => exapmple: {user: "email@address", password: "3333333"}
// to get content, use : req.body.content
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

app.get("/signout", (req, res) => {
	res.json("Successfully signedout");
});

app.get("/getProducts", async (_, res) => {
	try {
		const productData = await Product.find({});

		res.json(productData);
	} catch (err) {
		console.log.error("something went wrong");
	}
});

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

app.put("/updateProduct", async (req, res) => {
	try {
		if (req.body && req.body.id) {
			const id = req.body.id;
			const updatedData = req.body;
			const result = await Product.findOne({ id });
			const { modifiedCount } = await result.updateOne(updatedData);

			if (modifiedCount) {
				res.json({ message: "Update succeed" });
				return;
			}
		}
	} catch (error) {
		res.json({ message: "Update failed", status: 400 });
	}
});

// 3. update a user (PUT) email as id
//  req.body => {email:  "ferry.zoila@gmail.com", password: 777777} =>
app.put("/updateUser", (req, res) => {
	if (req.body && req.body.email && req.body.password) {
		for (let i = 0; i < users.length; i++) {
			if (users[i].email === req.body.email) {
				users[i] = { ...users[i], ...req.body };
				res.json({ message: "Update succeeded" });
			}
		}
		return;
	}
	// error handling
	res.json({ message: "Update failed" });
});

app.delete("/deleteUser", (req, res) => {
	if (req.body && req.body.email && req.body.password) {
		for (let i = 0; i < users.length; i++) {
			if (users[i].email === req.body.email) {
				users = [...users.slice(0, i), ...users.slice(i + 1)];
				res.json({ message: "Deletion succeeded" });
			}
		}
		return;
	}
	// error handling
	res.json({ message: "Deletion failed", status: 400 });
});

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
