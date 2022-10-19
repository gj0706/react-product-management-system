import { useState } from "react";
import SwitchModals from "./switch-modals";
import Modal from "../modal/modal";
import FORM from "../../constants/form";
import userIcon from "../../assets/user.png";
import "./sign-in.css";
import SignInModalContent from "../sign-in-modal-content/sign-in-modal-content";
import SignUpModalContent from "../sign-up-modal-content/sign-up-modal-content";
import UpdatePwModalContent from "../update-password-modal-content/update-password-modal-content";

const SignIn = () => {
	const [users, setUsers] = useState([]);
	const [visible, setVisible] = useState(false);
	const [signInModalOn, setSignInModalOn] = useState(true);
	const [signUpModalOn, setSignUpModalOn] = useState(false);
	const [forgetPwModalOn, setForgetPwModalOn] = useState(false);
	const [error, setError] = useState(false);

	const showModal = () => {
		setVisible(true);
	};
	const showSignUpModal = () => {
		setSignUpModalOn(true);
	};
	const showSignInModal = () => {
		setSignInModalOn(true);
	};
	const showForgetPwModal = () => {
		setForgetPwModalOn(true);
	};

	return (
		<>
			<div className="nav-sign-in">
				<img id="user-icon" src={userIcon} onClick={showModal} />
				<span id="sign-in-text" onClick={showModal}>
					{FORM.SIGNIN}
				</span>
			</div>
			<Modal
				titleText={
					signUpModalOn
						? FORM.SIGNUP_TITLE
						: forgetPwModalOn
						? FORM.FORGET_PW_TITLE
						: FORM.SIGNIN_TITLE
				}
				visible={visible}
				setVisible={setVisible}
				setSignInModalOn={setSignInModalOn}
				setSignUpModalOn={setSignUpModalOn}
				setForgetPwModalOn={setForgetPwModalOn}
			>
				{signUpModalOn ? (
					<SignUpModalContent
						users={users}
						setUsers={setUsers}
						showSignInModal={showSignInModal}
					/>
				) : forgetPwModalOn ? (
					<UpdatePwModalContent />
				) : (
					<SignInModalContent
						users={users}
						setUsers={setUsers}
						showForgetPwModal={showForgetPwModal}
						showSignUpModal={showSignUpModal}
					/>
				)}
			</Modal>
		</>
	);
};

export default SignIn;
