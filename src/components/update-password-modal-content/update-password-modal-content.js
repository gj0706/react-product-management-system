import { useState } from "react";
import FormInput from "../form-input/form-input";
import SubmitButton from "../submit-button/submit-button";
import FORM from "../../constants/form";
import "./update-password-modal-content.css";

const defaultFormField = {
	email: "",
};

const UpdatePwModalContent = () => {
	// const [email, setEmail] = useState(defaultFormField);
	// const resetFormField = setEmail(defaultFormField);
	return (
		<div className="sign-in-container">
			<p id="update-pw-text">{FORM.PASSWORD.UPDATE_TEXT}</p>
			<FormInput
				name="email"
				type="email"
				// value={email}
				label="Email"
				placeholder={FORM.EMAIL.PLACE_HOLDER}
				required
			/>

			<SubmitButton type="submit">
				<span>{FORM.UPDATE_PW}</span>
			</SubmitButton>
		</div>
	);
};

export default UpdatePwModalContent;
