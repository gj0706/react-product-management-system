import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../../api/api";
import { v4 as uuidv4 } from "uuid";
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
import ajaxConfigHelper from "../../api/api";

const SignUpModalContent = ({ showSignInModal, setVisible }) => {
	const [blur, setBlur] = useState(false);
	const initialState = {
		email: "",
		password: "",
	};
	const navigate = useNavigate();
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
	const newId = uuidv4();
	const goToErrorPage = (error) => {
		navigate("/*", { replace: true, state: { error } });
		// navigate("/*");
	};

	const creatNewCart = async () => {
		try {
			const response = await fetch(
				`/newCart/${newId}`,
				ajaxConfigHelper({ id: newId })
			);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchData = async (type = FORM.USER_TYPE.USER) => {
		try {
			let response = await fetch(
				"/auth/signUp",
				ajaxConfigHelper({
					id: newId,
					email: email,
					password: password,
					type: type,
				})
			);
			// console.log(response.status);
			let result = await response.json();
			// console.log(result.errors[0]);
			if (response.status === 200) {
				setVisible(false);
				console.log("Signed up successfully");
				creatNewCart();
			} else if (response.status === 400 || 422) {
				// goToErrorPage(result.errors[0].msg);
				// navigate("/*");
				console.log("Error occurred");
			}
		} catch (err) {
			navigate("/*");
			console.log(err);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchData();
		// creatNewCart();
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
