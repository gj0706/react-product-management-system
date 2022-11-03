import "./submit-button.css";

const SubmitButton = ({ children, disabled, ...otherProps }) => {
	return (
		<button
			className="submit-btn"
			disabled={disabled}
			{...otherProps}
			//  disabled={isClickable}
		>
			{children}
		</button>
	);
};
export default SubmitButton;
