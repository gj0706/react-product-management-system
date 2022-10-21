import { useState } from "react";
import { useForm, isRequired, isValidEmail } from "../../validator/validator";
import FormInput from "../form-input/form-input";
import SubmitButton from "../submit-button/submit-button";
import FORM from "../../constants/form";
import "./update-password-modal-content.css";

const UpdatePwModalContent = () => {
	const [emails, setEmails] = useState([]);
	const initialState = { email: "" };
	// const [email, setEmail] = useState(defaultFormField);
	// const resetFormField = setEmail(defaultFormField);
	const validations = [
		({ email }) => isRequired(email) || { email: "E-mail is required" },
		({ email }) => isValidEmail(email) || { email: "E-mail is not valid" },
	];
	const { formFields, resetFormFields, changeHandler, errors, touched } =
		useForm(initialState, validations);

	const handleSubmit = (event) => {
		event.preventDefault();
		alert("Email sent :" + JSON.stringify(formFields, null, 2));

		setEmails((prev) => {
			return [...prev, formFields];
		});
		console.log(emails);
		resetFormFields();
	};

	return (
		<div className="update-pw-container">
			<p id="update-pw-text">{FORM.PASSWORD.UPDATE_TEXT}</p>
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
			{touched.email && errors.email && <p className="error">{errors.email}</p>}
			<SubmitButton type="submit" onClick={handleSubmit}>
				<span>{FORM.UPDATE_PW}</span>
			</SubmitButton>
		</div>
	);
};

export default UpdatePwModalContent;
