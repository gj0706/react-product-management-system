import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectCurrentUser } from "../../stores/user.selector";
import ajaxConfigHelper from "../../api/api";
import {
	useForm,
	isRequired,
	isValidEmail,
	isValidPassword,
} from "../../validator/validator";
import FORM from "../../constants/form";
import FormInput from "../form-input/form-input";
import SubmitButton from "../submit-button/submit-button";
import "./sign-in-modal-content.css";
import { setCurrentUser } from "../../actions/user-action";

const SignInModalContent = ({
	showSignUpModal,
	showForgetPwModal,
	setVisible,
}) => {
	const dispatch = useDispatch();
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

	const { email, password } = formFields;

	const fetchData = async () => {
		try {
			let response = await fetch(
				"/signin",
				ajaxConfigHelper({ email: email, password: password })
			);
			let result = await response.json();
			console.log(result.data);
			if (response.status === 200) {
				// setUser(result.data);
				dispatch(setCurrentUser(result.data));
				localStorage.setItem("user", JSON.stringify(result.data));
				setVisible(false);
			} else if (response.status === 400) {
				console.log("Some error occured");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchData();
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
				/>
				{touched.email && errors.email && (
					<p className="error">{errors.email}</p>
				)}
				<FormInput
					style={{
						border: touched.password && errors.password && "1px solid red",
					}}
					name="password"
					type="password"
					value={formFields.password}
					label="Password"
					handleChange={changeHandler}
					placeholder={FORM.PASSWORD.PLACE_HOLDER}
				/>
				{touched.password && errors.password && (
					<p className="error">{errors.password}</p>
				)}
				<SubmitButton type="submit">
					<span>{FORM.SIGNIN}</span>
				</SubmitButton>
			</form>
			<div className="extra-form-text">
				<span id="no-account">
					Don't have an account? <a onClick={showSignUpModal}>Sign up</a>
				</span>
				<span id="no-password">
					<a onClick={showForgetPwModal}>Forgot password?</a>
				</span>
			</div>
		</div>
	);
};

export default SignInModalContent;
