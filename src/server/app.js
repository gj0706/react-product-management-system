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
let users = {
	"feeney.myrna@hotmail.com": {
		email: "feeney.myrna@hotmail.com",
		password: "1111111",
	},
	"xcorkery@gmail.com": { email: "xcorkery@gmail.com", password: "2222222" },
	"brekke.timothy@hotmail.com": {
		email: "brekke.timothy@hotmail.com",
		password: "3333333",
	},
	"gayle.gorczany@wisoky.com": {
		email: "gayle.gorczany@wisoky.com",
		password: "4444444",
	},
	"ferry.zoila@gmail.com": {
		email: "ferry.zoila@gmail.com",
		password: "5555555",
	},
};

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
		for (let email of Object.keys(users)) {
			if (
				email === req.body.email &&
				users[email].password === req.body.password
			) {
				res.json({
					message: `You've successfully signed in with Email: ${req.body.email}`,
				});
				return;
			} else {
				return res
					.status(400)
					.json({ message: "Email or passrod doesn't match" });
			}
		}
	}
	res.json({ message: "Failed to sign in" });
});

// 2. add a customer(POST) todo content will be put in the req.body => exapmple: {user: "email@address", password: "3333333"}
// to get content, use : req.body.content
app.post("/signup", (req, res) => {
	//happy path
	if (req.body && req.body.email && req.body.password) {
		for (let email of Object.keys(users)) {
			if (email === req.body.email) {
				res.json({
					message: "Account already exists",
				});
				return;
			}
		}
		users[req.body.email] = req.body;

		res.json({
			message: `You've successfully signed up with Email: ${req.body.email}`,
		});
		return;
	}
	// error handling
	res.json({ message: "failed to add a user" });
});

const products = {
	"item_cell_34-360-174__0": {
		id: "item_cell_34-360-174__0",
		price: "699.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-360-174-05.jpg",
		description:
			'Acer Nitro 5 AN515-57-59F7, 15.6" 144 Hz IPS Intel Core i5 11th Gen 11400H (2.70GHz) NVIDIA GeForce RTX 3050 Laptop GPU 16GB Memory 512 GB NVMe SSD Windows 11 Home 64-bit Gaming Laptop',
	},
	"item_cell_34-273-562__0": {
		id: "item_cell_34-273-562__0",
		price: "399.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-273-562-V01.jpg",
		description:
			'HP Laptop Intel Core i5, 11th Gen 1155G7 (2.50GHz) 12GB Memory 1TB HDD Intel Iris Xe Graphics 17.3" Windows 11 Home 64-bit 17-cn1053cl',
	},
	"item_cell_34-236-186__0": {
		id: "item_cell_34-236-186__0",
		price: "999.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-236-186-V15.jpg",
		description:
			'ASUS TUF Gaming A17 Gaming Laptop, 17.3" 144Hz Full HD IPS-Type, AMD Ryzen 7 5800H Processor, GeForce RTX 3050 Ti, 16GB DDR4, 512GB PCIe SSD, Wi-Fi 6, RGB Keyboard, Windows 10 Home, TUF706QE-MS74',
	},
	item_cell_9SIBE13J9N2512__0: {
		id: "item_cell_9SIBE13J9N2512__0",
		price: "409.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/A8X5S22050310LWNM1D.jpg",
		description:
			'Acer Swift 3 Intel Evo Thin & Light Laptop, 13.5" 2256 x 1504 IPS, Intel Core i5-1135G7, Intel Iris Xe Graphics, 8GB LPDDR4X, 512GB NVMe SSD, Wi-Fi 6, Fingerprint Reader, Back-lit KB, SF313-53-56UU',
	},
	"item_cell_34-236-012__0": {
		id: "item_cell_34-236-012__0",
		price: "999.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-236-012-V14.jpg",
		description:
			'ASUS VivoBook Pro 16X OLED Laptop, 16" WQUXGA 16:10 Display, Intel Core i7-11370H CPU, NVIDIA GeForce RTX 3050, 16GB RAM, 1TB SSD, Windows 11 Pro, DialPad, Comet Grey, N7600PC-NB74',
	},
	"item_cell_34-233-521__0": {
		id: "item_cell_34-233-521__0",
		price: "1,549.00",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-233-521-V01.jpg",
		description:
			'GIGABYTE AERO 5 XE4, - 15.6" 4K/UHD Samsung AMOLED - Intel Core i7-12700H - NVIDIA GeForce RTX 3070 Ti Laptop GPU - 16GB DDR4 - 1TB SSD - Win11 Home - Creator & Gaming Laptop (AERO 5 XE4-73US614SH)',
	},
	item_cell_9SIBDSAHZ56888__0: {
		id: "item_cell_9SIBDSAHZ56888__0",
		price: "229.00",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-271-969-S01.jpg",
		description:
			'HP EliteBook 840 G3 Laptop, Intel Core i5 6th Gen 6300U (2.40 GHz) 16 GB Memory 256 GB SSD Intel HD Graphics 520 14.0" Windows 10 Pro 64-bit',
	},
	item_cell_9SIA6PFDAV1885__0: {
		id: "item_cell_9SIA6PFDAV1885__0",
		price: "52.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/A6PFS2101049MMCq.jpg",
		description:
			"WAVLINK USB C Docking Station,13 in 1 Multiport USB C Adapter Triple Display for MacOS and Windows,USB C Hub with 2 HDMI 4K, DisplayPort, 4 USB, 87W PD, Gigabit Ethernet, SD/TF Card Reader, Mic/Audio",
	},
	"item_cell_34-236-180__0": {
		id: "item_cell_34-236-180__0",
		price: "1,199.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-236-180-V01.jpg",
		description:
			'ASUS ZenBook Pro 15, OLED Laptop 15.6" FHD Touch Display AMD Ryzen 7 5800H CPU, NVIDIA GeForce RTX 3050 Ti GPU, 16GB RAM, 1TB PCIe SSD, Windows 11 Pro, Pine Grey, UM535QE-NH71T',
	},
	item_cell_9SIADG3J0E1893__0: {
		id: "item_cell_9SIADG3J0E1893__0",
		price: "1,399.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-725-184-V01.jpg",
		description:
			'Aorus 15P XD-73US224SO, 15.6" 240 Hz IPS Intel Core i7 11th Gen 11800H (2.30GHz) NVIDIA GeForce RTX 3070 Laptop GPU 16GB Memory 1 TB Gen4 SSD Windows 11 Home 64-bit Gaming Laptop',
	},
	"item_cell_34-156-238__0": {
		id: "item_cell_34-156-238__0",
		price: "649.00",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-156-238-V01.jpg",
		description:
			'MSI Laptop AMD Ryzen 5 5000 Series, 5500U (2.10GHz) 8GB Memory 512 GB NVMe SSD AMD Radeon Graphics 15.6" Windows 11 Home 64-bit Modern 15 A5M-287',
	},
	"item_cell_34-236-212__0": {
		id: "item_cell_34-236-212__0",
		price: "899.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-236-212-01.jpg",
		description:
			'ASUS VivoBook S 15 Slim Laptop, 15.6" FHD Display, AMD Ryzen 7 5800H CPU, AMD Radeon Graphics, 16GB RAM, 1TB SSD, Windows 11 Home, Fingerprint Reader, Indie Black, S3502QA-NS77',
	},
	"item_cell_34-236-240__0": {
		id: "item_cell_34-236-240__0",
		price: "799.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-236-240-V12.jpg",
		description:
			'ASUS TUF Gaming A17 (2021) Gaming Laptop, 17.3" 144Hz FHD IPS-Type Display, AMD Ryzen 5 4600H, GeForce GTX 1650, 8GB DDR4, 512GB PCIe SSD, RGB Keyboard, Windows 11 Home, FA706IHR-RS53',
	},
	item_cell_9SIAA0SJK40439__0: {
		id: "item_cell_9SIAA0SJK40439__0",
		price: "749.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-236-025-S07.jpg",
		description:
			'ASUS VivoBook 15 F515, Thin and Light Laptop 15.6" FHD Display, Core i7-1165G7 Processor, Iris Xe Graphics, 8GB DDR4 RAM, 512GB SSD, Fingerprint, Windows 11 Home, Slate Grey, F515EA-DH75',
	},
	"item_cell_34-236-241__0": {
		id: "item_cell_34-236-241__0",
		price: "899.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-236-241-V15.jpg",
		description:
			'ASUS TUF Gaming F15 Gaming Laptop, 15.6" 144Hz Full HD IPS-Type, Intel Core i5-11400H, GeForce RTX 3050, 8GB DDR4, 512GB PCIe SSD, Gigabit Wi-Fi 6, Windows 11 Home, FX506HCB-US51',
	},
	item_cell_9SIB0WNJ9H4961__0: {
		id: "item_cell_9SIB0WNJ9H4961__0",
		price: "1,194.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-233-514-01.jpg",
		description:
			'GIGABYTE G5 KD-52US123SO, 15.6" 144 Hz IPS Intel Core i5 11th Gen 11400H (2.70GHz) NVIDIA GeForce RTX 3060 Laptop GPU 16GB Memory 512 GB Gen4 SSD Windows 11 Home 64-bit Gaming Laptop',
	},
	"item_cell_34-236-026__0": {
		id: "item_cell_34-236-026__0",
		price: "599.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-236-026-S01.jpg",
		description:
			'ASUS VivoBook S14 S435 Laptop, 14" FHD Display, Intel Evo Platform, i7-1165G7 CPU, 8GB RAM, 512GB PCIe SSD, Windows 11 Home, AI Noise-Cancellation, Deep Green, S435EA-DH71-GR',
	},
	item_cell_9SIB0WNFNK3557__0: {
		id: "item_cell_9SIB0WNFNK3557__0",
		price: "1,279.99",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-155-806-01.jpg",
		description:
			'MSI SUMMIT E13FLIP Evo, 13.4" FHD+ TOUCH Ultra Thin and Light Professional 2-in-1 Laptop Intel Core i7-1185G7 IRIS Xe 16 GB DDR4 512 GB NVMe SSD Win10 with MSI Pen',
	},
	item_cell_9SIA4R8JK33162__0: {
		id: "item_cell_9SIA4R8JK33162__0",
		price: "188.00",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-343-796-04.jpg",
		description:
			'DELL Laptop Latitude 5480, Intel Core i5 6th Gen 6300U (2.40GHz) 16GB Memory 256 GB SSD Intel HD Graphics 520 14.0" Windows 10 Pro 64-bit 6R2TF',
	},
	"item_cell_34-725-205__0": {
		id: "item_cell_34-725-205__0",
		price: "1,249.00",
		imageUrl:
			"https://c1.neweggimages.com/ProductImageCompressAll300/34-725-205-V01.jpg",
		description:
			'GIGABYTE AORUS 5 SE4, - 15.6" FHD 1920x1080 360Hz- Intel Core i7-12700H - NVIDIA GeForce RTX 3070 Laptop GPU 8GB GDDR6 - 16GB DDR4 RAM - 512GB SSD - Win11 Home - Gaming Laptop (AORUS 5 SE4-73US513SH)',
	},
};

app.get("/getProducts", (_, res) => {
	console.log("Succeeded to retrive all products");
	res.json(products);
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
	res.json({ message: "Deletion failed" });
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
