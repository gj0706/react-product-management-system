import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../stores/user-selector";
import { setCurrentUserCart } from "../../actions/cart-action";
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
	const currentUser = useSelector(selectCurrentUser);
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

	const { formFields, errors, changeHandler, resetFormFields } = useForm(
		initialState,
		validations
	);

	const { email, password } = formFields;

	const goToErrorPage = (error) => {
		navigate("/*", { replace: true, state: { error } });
	};

	const fetchCurrentUserCart = async (id, token) => {
		try {
			const response = await fetch(`/getCart/${id}`, {
				method: "GET",
				headers: new Headers({
					token: `Bearer ${token}`,
					"content-type": "application/json",
				}),
			});
			const result = await response.json();
			dispatch(setCurrentUserCart(result));
			console.log("current user cart: ", result);
			return result;
		} catch (error) {
			console.log(error);
		}
	};

	const fetchData = async () => {
		try {
			let response = await fetch(
				"/auth/signIn",
				ajaxConfigHelper({ email: email, password: password })
			);
			let result = await response.json();
			console.log(result);
			if (response.status === 200) {
				dispatch(
					setCurrentUser({
						id: result.data.id,
						type: result.data.type,
						accessToken: result.token,
					})
				);
				localStorage.setItem(
					"user",
					JSON.stringify({
						id: result.data.id,
						type: result.data.type,
						accessToken: result.token,
					})
				);
				setVisible(false);
				fetchCurrentUserCart(result.data.id, result.token);
				navigate("/");
				// window.location.reload(false);
			} else if (response.status === 400 || 404) {
				// navigate("/*");
				console.log("Failed to sign in");
			}
		} catch (error) {
			console.log(error);
			navigate("/*");
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
