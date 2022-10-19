import "./modal.css";
const Modal = ({
	visible,
	setVisible,
	children,
	titleText,
	setSignInModalOn,
	setSignUpModalOn,
	setForgetPwModalOn,
}) => {
	const closeModal = () => {
		setVisible(false);
		setSignInModalOn(false);
		setSignUpModalOn(false);
		setForgetPwModalOn(false);
	};
	return (
		<div
			className="modal-container"
			style={{ display: visible ? "block" : "none" }}
		>
			<h3 id="title-text">{titleText}</h3>
			<span className="close" onClick={closeModal}>
				&times;
			</span>

			{children}
		</div>
	);
};

export default Modal;
