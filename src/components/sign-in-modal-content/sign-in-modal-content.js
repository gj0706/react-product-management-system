import { useState } from "react";
import FORM from "../../constants/form";
import FormInput from "../form-input/form-input";
import SubmitButton from "../submit-button/submit-button";
import "./sign-in-modal-content.css";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInModalContent = ({
	users,
	setUsers,
	showSignUpModal,
	showForgetPwModal,
}) => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	// const [errorMessage, setErrorMessage] = useState("");
	// const ERROR_MESSAGE = {
	// 	emailError: "Invalid email format.",
	// 	emptyFieldError: "Field cannot be empty.",
	// };

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!email.includes("@")) {
			resetFormFields();
			// setError(true);
			// setErrorMessage(ERROR_MESSAGE.emailError);
			// alert(ERROR_MESSAGE.emailError);
			return;
		}
		if (!email.trim() || !password.trim()) {
			resetFormFields();
			// setError(true);
			// setErrorMessage(ERROR_MESSAGE.emptyFieldError);
			// alert(ERROR_MESSAGE.emptyFieldError);
			return;
		}
		// setError(false);
		// setErrorMessage("");
		const newUser = {
			email: email,
			password: password,
			// errorMessage: "",
			// error: !error,
		};
		setUsers((prev) => {
			return [...prev, newUser];
		});
		console.log(users);

		console.log({
			email: email,
			password: password,
			// error: error,
			// errorMessage: errorMessage,
		});
		resetFormFields();
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-in-container">
			<form className="sign-in-form" onSubmit={handleSubmit}>
				<FormInput
					name="email"
					type="email"
					value={email}
					label="Email"
					handleChange={handleChange}
					placeholder={FORM.EMAIL.PLACE_HOLDER}
					required
				/>
				<FormInput
					name="password"
					type="password"
					value={password}
					label="Password"
					handleChange={handleChange}
					placeholder={FORM.PASSWORD.PLACE_HOLDER}
					required
				/>

				<SubmitButton type="submit">
					<span>{FORM.SIGNIN}</span>
				</SubmitButton>

				<div className="extra-form-text">
					<span id="no-account">
						Don't have an account? <a onClick={showSignUpModal}>Sign up</a>
					</span>
					<span id="no-password">
						<a onClick={showForgetPwModal}>Forgot password?</a>
					</span>
				</div>
			</form>
		</div>
	);
};

export default SignInModalContent;
