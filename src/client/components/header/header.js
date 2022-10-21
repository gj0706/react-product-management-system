import { useState, useEffect } from "react";
import Modal from "../modal/modal";
import SignInModalContent from "../sign-in-modal-content/sign-in-modal-content";
import SignUpModalContent from "../sign-up-modal-content/sign-up-modal-content";
import UpdatePwModalContent from "../update-password-modal-content/update-password-modal-content";
import FORM from "../../constants/form";
import "./header.css";

const Header = () => {
	const width = window.innerWidth;
	const [users, setUsers] = useState([]);
	const [visible, setVisible] = useState(false);
	const [signInModalOn, setSignInModalOn] = useState(true);
	const [signUpModalOn, setSignUpModalOn] = useState(false);
	const [forgetPwModalOn, setForgetPwModalOn] = useState(false);

	const setTrue = (func) => func(true);

	const showModal = () => {
		setVisible(true);
	};
	const showSignUpModal = () => {
		setSignUpModalOn(true);
		setSignInModalOn(false);
		setForgetPwModalOn(false);
	};
	const showSignInModal = () => {
		setSignInModalOn(true);
		setSignUpModalOn(false);
		setForgetPwModalOn(false);
	};
	const showForgetPwModal = () => {
		setForgetPwModalOn(true);
		setSignInModalOn(false);
		setSignUpModalOn(false);
	};
	return (
		<>
			<nav className="nav-bar">
				<div className="nav-title">
					<span id="bigTitle">Management</span>
					<span id="bigTitle-shrink">M</span>
					<span id="smallTitle">Chuwa</span>
				</div>

				<div className="search-bar">
					<input className="nav-search" type="text" placeholder="search" />
					<button className="search-btn">
						<i className="fa-sharp fa-solid fa-magnifying-glass"></i>
					</button>
				</div>
				<div className="nav-right">
					<div className="nav-sign-in">
						<i
							id="user-icon"
							className="fa-solid fa-user"
							onClick={showModal}
						></i>
						<span id="sign-in-text" onClick={showModal}>
							{FORM.SIGNIN}
						</span>
					</div>
					<div className="shopping-cart">
						<i className="fa-solid fa-cart-shopping" id="cart-icon"></i>
						<span id="cart-text">$0.00</span>
					</div>
				</div>
			</nav>
			<Modal
				titleText={
					signUpModalOn
						? FORM.SIGNUP_TITLE
						: forgetPwModalOn
						? FORM.FORGET_PW_TITLE
						: FORM.SIGNIN_TITLE
				}
				visible={visible}
				setVisible={
					setVisible
					// signUpModalOn
					// 	? setSignUpModalOn
					// 	: forgetPwModalOn
					// 	? setForgetPwModalOn
					// 	: signInModalOn
					// 	? setSignInModalOn
					// 	: setVisible
				}
				setSignInModalOn={setSignInModalOn}
				setSignUpModalOn={setSignUpModalOn}
				setForgetPwModalOn={setForgetPwModalOn}
			>
				{signUpModalOn ? (
					<SignUpModalContent
						visible={visible}
						users={users}
						setUsers={setUsers}
						signInModalOn={signInModalOn}
						showSignInModal={showSignInModal}
					/>
				) : forgetPwModalOn ? (
					<UpdatePwModalContent visible={visible} />
				) : (
					<SignInModalContent
						visible={visible}
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

export default Header;