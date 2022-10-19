import { useEffect, useRef, useCallback } from "react";
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
	// const modal = useRef(null);

	const closeModal = () => {
		setVisible(false);
		setSignInModalOn(false);
		setSignUpModalOn(false);
		setForgetPwModalOn(false);
	};

	// const handleOutsideClick = useCallback(
	// 	(e) => {
	// 		if (visible) {
	// 			if (!modal.current.contains(e.target)) {
	// 				closeModal();
	// 				document.removeEventListener("click", handleOutsideClick, false);
	// 			}
	// 		}
	// 	},
	// 	[closeModal]
	// );
	// useEffect(() => {
	// 	document.addEventListener("click", handleOutsideClick, false);
	// 	return () =>
	// 		document.removeEventListener("click", handleOutsideClick, false);
	// }, [handleOutsideClick]);

	return (
		<div
			className="modal-container"
			// ref={modal}s
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
