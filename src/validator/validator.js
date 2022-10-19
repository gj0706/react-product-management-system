import { useState } from "react";

// const validEmailRegex = RegExp(
// 	/^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/i
// );
// const validateForm = (errors) => {
// 	let valid = true;
// 	Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
// 	return valid;
// };

const validate = (validations, values) => {
	const errors = validations
		.map((validation) => validation(values))
		.filter((validation) => typeof validation === "object");
	return {
		isValid: errors.length === 0,
		errors: errors.reduce((errors, error) => ({ ...errors, ...error }), {}),
	};
};

export const useForm = (
	initialState = {},
	validations = []
	// onSubmit = () => {}
) => {
	const { isValid: initialIsValid, errors: initialErrors } = validate(
		validations,
		initialState
	);
	const [formFields, setFormFields] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [isValid, setValid] = useState(true);
	const [touched, setTouched] = useState({});
	const changeHandler = (event) => {
		const newFields = {
			...formFields,
			[event.target.name]: event.target.value,
		};
		const { isValid, errors } = validate(validations, newFields);
		setFormFields(newFields);
		setValid(isValid);
		setErrors(errors);
		setTouched({ ...touched, [event.target.name]: true });
	};

	// const submitHandler = (event) => {
	// 	event.preventDefault();
	// 	onSubmit(formFields);
	// };
	return {
		formFields,
		changeHandler,
		isValid,
		errors,
		touched,
		// , submitHandler
	};
};

export const isRequired = (value) => {
	return value != null && value.trim().length > 0;
};

export const isValidEmail = (value) => {
	const re =
		/^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/i;
	return re.test(value);
};

export const isValidPassword = (value) => {
	return value.length > 6;
};
