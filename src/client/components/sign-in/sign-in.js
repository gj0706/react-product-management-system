// import FORM from "../../constants/form";
import { useState, useEffect } from "react";

import "./sign-in.css";
import Modal from "../modal/modal";
import SignInModalContent from "../sign-in-modal-content/sign-in-modal-content";
import SignUpModalContent from "../sign-up-modal-content/sign-up-modal-content";
import UpdatePwModalContent from "../update-password-modal-content/update-password-modal-content";
import FORM from "../../constants/form";

const SignIn = ({ showModal }) => {
	return (
		<>
			<span id="sign-in-text" onClick={showModal}>
				{FORM.SIGNIN}
			</span>
		</>
	);
};

export default SignIn;
