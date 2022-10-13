import { useState } from "react";
// import FormInput from "../form-input/form-input";
// import SubmitButton from "../submit-button/submit-button";

import "./sign-in-modal.css";

const Signin = ({ users, setUsers, modalOn, setModalOn, error, setError }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const ERROR_MESSAGE = {
		emailError: "Invalid email format.",
		emptyFieldError: "Field cannot be empty.",
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email.includes("@")) {
			setEmail("");
			setPassword("");
			setError(true);
			setErrorMessage(ERROR_MESSAGE.emailError);
			alert(ERROR_MESSAGE.emailError);
			return;
		}
		if (!email.trim() || !password.trim()) {
			setEmail("");
			setPassword("");
			setError(true);
			setErrorMessage(ERROR_MESSAGE.emptyFieldError);
			alert(ERROR_MESSAGE.emptyFieldError);
			return;
		}
		setError(false);
		setErrorMessage("");
		const newUser = {
			email: email,
			password: password,
			errorMessage: "",
			error: !error,
		};
		setUsers((prev) => {
			return [...prev, newUser];
		});
		console.log(users);

		console.log({
			email: email,
			password: password,
			error: error,
			errorMessage: errorMessage,
		});
		setEmail("");
		setPassword("");
	};

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const togglePassword = (e) => {
		e.target.classList.toggle("fa-eye-slash");
		// e.target.type === "password" ? "text" : "password";
		console.log(e.target);
	};

	const closeModal = () => {
		setModalOn((modalOn) => !modalOn);
	};

	return (
		<div
			className="sign-in-container"
			style={{ display: modalOn ? "block" : "none" }}
		>
			<span className="close" onClick={closeModal}>
				&times;
			</span>
			<form className="sign-in-form" onSubmit={handleSubmit}>
				<h3>Sign in to your account</h3>

				<label className="sign-in-label">Email</label>
				<input
					style={{ border: error ? "1px solid red" : "1px solid lightgrey" }}
					className="input-field"
					value={email}
					onChange={handleEmail}
					type="text"
					name="email"
					placeholder="Enter email"
					autoComplete="off"
				/>
				<p className="password-container">
					<label className="sign-in-label">Password</label>
					<input
						style={{ border: error ? "1px solid red" : "1px solid lightgrey" }}
						className="input-field"
						defaultValue={password}
						onChange={handlePassword}
						type="password"
						name="password"
						placeholder="Enter password"
						autoComplete="off"
					/>
					<i className="fa-solid fa-eye" id="eye" onClick={togglePassword}></i>
				</p>

				<input
					className="sign-in-btn"
					id="submitBtn"
					type="submit"
					value="Sign in"
					placeholder="Enter password"
				/>
				<div className="extra-form-text">
					<span id="no-account">
						Don't have an account? <a>Sign up</a>
					</span>
					<span id="no-password">
						<a>Forgot password?</a>
					</span>
				</div>
			</form>
		</div>
	);
};

export default Signin;
