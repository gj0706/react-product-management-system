import "./submit-button.css";

const SubmitButton = ({ children, ...otherProps }) => {
	return (
		<button className="submit-btn" {...otherProps}>
			{children}
		</button>
	);
};
export default SubmitButton;
