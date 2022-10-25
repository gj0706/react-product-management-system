import { ContextExclusionPlugin } from "webpack";

const ajaxConfigHelper = (data, method = "POST") => {
	return {
		method, // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	};
};

const getUsersApi = async () => {
	try {
		const response = await fetch("/getUsers", {
			method: "GET",
			headers: {
				"Content-Type": "aapplication/json",
			},
		});
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.log(error);
	}
};

const getProductsApi = async () => {
	try {
		const response = await fetch("/getProducts", {
			method: "GET",
			headers: {
				"Content-Type": "aapplication/json",
			},
		});
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.log(error);
	}
};
const signinApi = async (accountInfo) => {
	try {
		const response = await fetch("/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(accountInfo),
		});
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.log(error);
	}
};

const signupApi = async (accountInfo) => {
	try {
		const response = await fetch("/signup", ajaxConfigHelper(accountInfo));
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.log(error);
	}
};

const logoutApi = async () => {
	try {
		const response = await fetch("", {
			method: "POST",
		});
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export default { getUsersApi, signinApi, signupApi, logoutApi, getProductsApi };
