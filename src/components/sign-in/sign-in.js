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
	const [signInModalOn, setSignInModalOn] = useState(false);
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

	const switchTitleTexts = () => {
		if (signInModalOn) {
			return FORM.SIGNIN_TITLE;
		} else if (signUpModalOn) {
			return FORM.SIGNUP_TITLE;
		} else if (forgetPwModalOn) {
			return FORM.FORGET_PW_TITLE;
		}
	};

	const switchVisible = () => {
		if (signUpModalOn) {
			return setSignInModalOn;
		} else if (forgetPwModalOn) {
			return setForgetPwModalOn;
		} else if (signInModalOn) {
			return setSignInModalOn;
		} else {
			return setVisible;
		}
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
						signInModalOn={signInModalOn}
						showSigInModal={showSignInModal}
						setSignInModalOn={setSignInModalOn}
					/>
				) : forgetPwModalOn ? (
					<UpdatePwModalContent />
				) : (
					<SignInModalContent
						users={users}
						setUsers={setUsers}
						signUpModalOn={signUpModalOn}
						showForgetPwModal={showForgetPwModal}
						showSignUpModal={showSignUpModal}
					/>
				)}
				{/* <div>
					{(() => {
						if (signUpModalOn) {
							return (
								<SignUpModalContent
									users={users}
									setUsers={setUsers}
									signInModalOn={signInModalOn}
									showSigInModal={showSignInModal}
									setSignInModalOn={setSignInModalOn}
								/>
							);
						} else if (forgetPwModalOn) {
							return <UpdatePwModalContent />;
						} else {
							return (
								<SignInModalContent
									users={users}
									setUsers={setUsers}
									signUpModalOn={signUpModalOn}
									showForgetPwModal={showForgetPwModal}
									showSignUpModal={showSignUpModal}
								/>
							);
						}
					})()}
				</div> */}

				{/* <SignInModalContent /> */}
			</Modal>
		</>
	);
};

export default SignIn;
