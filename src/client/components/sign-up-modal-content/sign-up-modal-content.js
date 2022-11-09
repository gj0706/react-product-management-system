import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import { v4 as uuidv4 } from "uuid";

import {
	useForm,
	isRequired,
	isValidEmail,
	isValidPassword,
	areValidBoth,
	areRequiredBoth,
} from "../../validator/validator";
import FormInput from "../form-input/form-input";
import SubmitButton from "../submit-button/submit-button";
import FORM from "../../constants/form";
import "./sign-up-modal-content.css";
import ajaxConfigHelper from "../../api/api";

const SignUpModalContent = ({ showSignInModal, setVisible }) => {
	const [blur, setBlur] = useState(false);
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
				"/signup",
				ajaxConfigHelper({
					id: email,
					email: email,
					password: password,
					type: "USER",
				})
			);
			let result = await response.json();
			console.log(result);
			if (response.status === 200) {
				setVisible(false);
				console.log("Signed up successfully");
			} else if (response.status === 400) {
				console.log("Some error occured");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const creatNewCart = async () => {
		try {
			const response = await fetch(
				`/newCart/${email}`,
				ajaxConfigHelper({ id: email })
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchData();
		creatNewCart();
		resetFormFields();
	};

	const handleBlur = (e) => {
		setBlur(true);
	};

	return (
		<div className="sign-in-container">
			<form className="sign-in-form" onSubmit={handleSubmit}>
				<FormInput
					style={{
						border: blur && errors.email && "1px solid red",
					}}
					name="email"
					type="text"
					value={email}
					label="Email"
					onBlur={handleBlur}
					handleChange={changeHandler}
					placeholder={FORM.EMAIL.PLACE_HOLDER}
				/>
				{(blur && errors.email) ||
					(blur && !email && <p className="error">{errors.email}</p>)}
				<FormInput
					style={{
						border: blur && errors.password && "1px solid red",
					}}
					name="password"
					type="password"
					value={password}
					label="Password"
					handleChange={changeHandler}
					onBlur={handleBlur}
					placeholder={FORM.PASSWORD.PLACE_HOLDER}
				/>
				{(blur && errors.password) ||
					(blur && !password && <p className="error">{errors.password}</p>)}
				<SubmitButton
					type="submit"
					disabled={
						email === "" || password === "" || errors.email || errors.password
					}
				>
					<span>{FORM.SIGNUP}</span>
				</SubmitButton>
			</form>
			<div className="extra-form-text">
				<span id="have-account">
					Already have an account ?{" "}
					<a onClick={showSignInModal}>{FORM.SIGNIN}</a>
				</span>
			</div>
		</div>
	);
};

export default SignUpModalContent;
