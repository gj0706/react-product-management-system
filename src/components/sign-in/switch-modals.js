import SignInModalContent from "../sign-in-modal-content/sign-in-modal-content";
import SignUpModalContent from "../sign-up-modal-content/sign-up-modal-content";
import UpdatePwModalContent from "../update-password-modal-content/update-password-modal-content";
import Modal from "../modal/modal";
import FORM from "../../constants/form";

const SwitchModals = ({
	signInModalOn,
	signUpModalOn,
	forgetPwModalOn,
	users,
	setUsers,
	setSignUpModalOn,
	setSignInModalOn,
}) => {
	if (signInModalOn) {
		return (
			<SignInModalContent
				users={users}
				setUsers={setUsers}
				signUpModalOn={signUpModalOn}
				setSignUpModalOn={setSignUpModalOn}
			/>
		);
	} else if (signUpModalOn) {
		return (
			<SignUpModalContent
				users={users}
				setUsers={setUsers}
				signInModalOn={signInModalOn}
				setSignInModalOn={setSignInModalOn}
			/>
		);
	} else if (forgetPwModalOn) {
		return <UpdatePwModalContent />;
	}
};

export default SwitchModals;
