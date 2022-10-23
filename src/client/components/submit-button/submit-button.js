import "./submit-button.css";

const SubmitButton = ({ children, ...otherProps }) => {
	return (
		<button
			className="submit-btn"
			{...otherProps}
			//  disabled={isClickable}
		>
			{children}
		</button>
	);
};
export default SubmitButton;
