import { useState } from "react";
import {
	useForm,
	isRequired,
	isValidEmail,
	isValidPassword,
} from "../../validator/validator";
import FormInput from "../form-input/form-input";
import SubmitButton from "../submit-button/submit-button";
import FORM from "../../constants/form";
import "./sign-up-modal-content.css";
import SignInModalContent from "../sign-in-modal-content/sign-in-modal-content";

const SignUpModalContent = ({ users, setUsers, showSignInModal }) => {
	const initialState = {
		email: "",
		password: "",
	};
	const validations = [
		({ email }) => isRequired(email) || { email: "E-mail is required" },
		({ email }) => isValidEmail(email) || { email: "E-mail is not valid" },
		({ password }) =>
			isRequired(password) || { password: "Password is required" },
		({ password }) =>
			isValidPassword(password) || {
				password: "Password is at least 6 alphanumeric characters",
			},
	];
	const {
		formFields,
		isValid,
		errors,
		changeHandler,
		resetFormFields,
		touched,
	} = useForm(initialState, validations);

	const handleSubmit = (event) => {
		event.preventDefault();
		alert(
			"You've signed up with the following information:" +
				JSON.stringify(formFields, null, 2)
		);

		setUsers((prev) => {
			return [...prev, formFields];
		});
		console.log(users);
		resetFormFields();
	};
	return (
		<div className="sign-in-container">
			<form className="sign-in-form" onSubmit={handleSubmit}>
				<FormInput
					style={{
						border: touched.email && errors.email && "1px solid red",
					}}
					name="email"
					type="text"
					value={formFields.email}
					label="Email"
					handleChange={changeHandler}
					placeholder={FORM.EMAIL.PLACE_HOLDER}
					required
				/>
				{touched.email && errors.email && (
					<p className="error">{errors.email}</p>
				)}
				<FormInput
					style={{
						border: touched.email && errors.email && "1px solid red",
					}}
					name="password"
					type="password"
					value={formFields.password}
					label="Password"
					handleChange={changeHandler}
					placeholder={FORM.PASSWORD.PLACE_HOLDER}
					required
				/>
				{touched.password && errors.password && (
					<p className="error">{errors.password}</p>
				)}
				<SubmitButton type="submit">
					<span>{FORM.SIGNUP}</span>
				</SubmitButton>

				<div className="extra-form-text">
					<span id="have-account">
						Already have an account ?{" "}
						<a onClick={showSignInModal}>{FORM.SIGNIN}</a>
					</span>
				</div>
			</form>
		</div>
	);
};

export default SignUpModalContent;
