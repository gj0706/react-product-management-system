import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../stores/user-selector";
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
import { addItemToCart, emptyCart } from "../../actions/cart-action";
import { selectCartItems } from "../../stores/cart-selector";

const SignInModalContent = ({
	showSignUpModal,
	showForgetPwModal,
	setVisible,
	visible,
}) => {
	const [blur, setBlur] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cartItems = useSelector(selectCartItems);
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

	const goToErrorPage = () => {
		navigate("/*");
	};

	const fetchData = async () => {
		try {
			let response = await fetch(
				"/signin",
				ajaxConfigHelper({ email: email, password: password })
			);
			let result = await response.json();
			console.log(result.data);
			if (response.status === 200) {
				dispatch(setCurrentUser(result.data));
				// dispatch(emptyCart());
				localStorage.setItem("user", JSON.stringify({ id: result.data.id }));
				setVisible(false);
			} else if (response.status === 400) {
				// return redirect("/*");
				goToErrorPage();
			}
		} catch (error) {
			console.log(error);
			goToErrorPage();
			// return redirect("/*");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchData();
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
					value={formFields.email}
					label="Email"
					onBlur={handleBlur}
					handleChange={changeHandler}
					placeholder={FORM.EMAIL.PLACE_HOLDER}
				/>
				{(blur && errors.email) ||
					(blur && !email && <p className="error">{errors.email}</p>)}
				<FormInput
					style={{ border: blur && errors.password && "1px solid red" }}
					name="password"
					type="password"
					value={formFields.password}
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
