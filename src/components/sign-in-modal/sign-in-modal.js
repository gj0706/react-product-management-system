import { useState } from "react";
// import FormInput from "../form-input/form-input";
import SubmitButton from "../submit-button/submit-button";
import "./sign-in-modal.css";

const Signin = ({ users, setUsers, modalOn, setModalOn }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email.trim() || !password.trim()) {
			setEmail("");
			setPassword("");
			setError(true);
			return;
		}
		// setError(false);

		const newUser = {
			email: email,
			password: password,
			error: error,
		};
		setUsers((prev) => {
			return [...prev, newUser];
		});
		console.log(users);

		console.log({ email: email, password: password });
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
					className="input-field"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					name="email"
					placeholder="Enter email"
				/>
				<label className="sign-in-label">Password</label>
				<input
					className="input-field"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					name="password"
				/>
				<input
					className="sign-in-btn"
					id="submitBtn"
					type="submit"
					value="Sign in"
					placeholder="Enter password"
				/>
			</form>
		</div>
	);
};

export default Signin;
