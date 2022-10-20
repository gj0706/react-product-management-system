export const mockApi = {
	users: {
		"user1@gmail.com": {
			email: "user1@gmail.com",
			password: "ddh83939",
		},
		"user2@gmail.com": { email: "user2@gmail.com", password: "ewp0d48e" },
	},
	signIn({ email, password }) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (!email || !this.users[email] || !emailReg.test(email)) {
					reject({
						message: "User does not exist.",
						status: false,
					});
					alert(message);
				} else if (this.users[email].password !== password) {
					reject({ message: "Password is not correct.", status: false });
					alert(message);
				} else {
					resolve({
						json() {
							return Promise.resolve({
								message: "Login succeed",
								status: true,
							});
						},
					});
				}
			}, 2000);
		});
	},
	signUp({ email, password }) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (!email || !emailReg.test(email)) {
					reject({
						message: "Email is not valid.",
						status: false,
					});
				} else if (!password) {
					reject({
						message: "Password is not valid.",
						status: false,
					});
				} else if (this.users[email]) {
					reject({
						message: "User email already exists.",
						status: false,
					});
				} else {
					this.users[email] = {
						email,
						password,
					};
					resolve({
						json() {
							console.log(message);
							return Promise.resolve({
								message: "Sign up succeed",
								status: true,
							});
						},
					});
				}
			}, 2000);
		});
	},
};
