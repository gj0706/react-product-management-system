var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { get } = require("http");
const { electron } = require("webpack");
const { resolveWatchPlugin } = require("jest-resolve");

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

// mock database
let users = [
	{ email: "feeney.myrna@hotmail.com", password: 111111 },
	{ email: "xcorkery@gmail.com", password: 222222 },
	{ email: "brekke.timothy@hotmail.com", password: 333333 },
	{ email: "gayle.gorczany@wisoky.com", password: 444444 },
	{ email: "ferry.zoila@gmail.com", password: 555555 },
];

// 1. get all customers(GET)
app.get("/getUsers", (_, res) => {
	console.log("Succeeded to retrive all users");
	res.json(users);
});

// app.get("/getAccInfo", (_, res)=>{
// 	let email = req.body.email;
// 	let password = req.body.password;
// 	res.send(`You've signed in with Email: ${email} Password: ${password}`);
// })

app.post("/signin", (req, res) => {
	if (req.body && req.body.email && req.body.password) {
		for (let i = 0; i < users.length; i++) {
			if (users[i].email === req.body.email) {
				res.json({
					message: `You've signed in with Email: ${req.body.email}`,
				});
			}
		}
	}
});

// 2. add a customer(POST) todo content will be put in the req.body => exapmple: {user: "email@address", password: "3333333"}
// to get content, use : req.body.content
app.post("/signup", (req, res) => {
	//happy path
	if (req.body && req.body.email && req.body.password) {
		for (let i = 0; i < users.length; i++) {
			if (users[i].email === req.body.email) {
				res.json({
					message: "Account already exists",
				});
				return;
			}
		}

		users = [...users, req.body];
		res.json({
			message: `You've signed up with Email: ${req.body.email}`,
		});
		return;
	}
	// error handling
	res.json({ message: "failed to add a user" });
});

// 3. update a user (PUT) email as id
//  req.body => {email:  "ferry.zoila@gmail.com", password: 777777} =>
app.put("/update", (req, res) => {
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

app.delete("/delete", (req, res) => {
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
	res.json({ message: "Delete failed" });
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
