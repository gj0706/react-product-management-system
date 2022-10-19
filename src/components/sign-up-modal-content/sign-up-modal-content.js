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

const defaultFormFields = {
	email: "",
	password: "",
};
const SignUpModalContent = ({ users, setUsers, showSignInModal }) => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("submitted");
		resetFormFields();
	};

	// const showSignInModal = () => {
	// 	setSignInModalOn(true);
	// };
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
