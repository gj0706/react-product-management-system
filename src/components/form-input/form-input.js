import "./form-input.css";

const FormInput = ({
	name,
	value,
	handleChange,
	label,
	type,
	...otherProps
}) => {
	return (
		<div className="input-container">
			<label className="input-label">{label}</label>
			<input
				className="input-field"
				name={name}
				value={value}
				type={type}
				onChange={handleChange}
				{...otherProps}
			/>
		</div>
	);
};

export default FormInput;
