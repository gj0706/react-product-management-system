import { useState, useEffect } from "react";
import api from "../../api/api";
import SignOut from "../sign-out/sign-out";
import SignIn from "../sign-in/sign-in";
import Modal from "../modal/modal";
import SignInModalContent from "../sign-in-modal-content/sign-in-modal-content";
import SignUpModalContent from "../sign-up-modal-content/sign-up-modal-content";
import UpdatePwModalContent from "../update-password-modal-content/update-password-modal-content";
import FORM from "../../constants/form";
import "./header.css";

const Header = ({ isSignedIn, setSignedIn, handleSignIn, handleSignOut }) => {
	const [user, setUser] = useState({});
	const [visible, setVisible] = useState(false);
	const [signInModalOn, setSignInModalOn] = useState(true);
	const [signUpModalOn, setSignUpModalOn] = useState(false);
	const [forgetPwModalOn, setForgetPwModalOn] = useState(false);

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

	// useEffect(() => {
	// 	const getUserData = async () => {
	// 		try {
	// 			const response = await fetch("/getUser", {
	// 				method: "POST",
	// 				mode: "cors",
	// 				cache: "no-cache",
	// 				credentials: "same-origin",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Accept: "application/json",
	// 				},
	// 				redirect: "follow",
	// 				referrerPolicy: "no-referrer",
	// 				body: JSON.stringify({
	// 					email: user.email,
	// 					password: user.password,
	// 				}),
	// 			});
	// 			if (response.status === 200) {
	// 				setSignedIn(true);
	// 			} else {
	// 				setSignedIn(false);
	// 				throw new Error(
	// 					`Get customer API response status error: ${response.status}`
	// 				);
	// 			}
	// 		} catch (error) {
	// 			// throw new Error(`Get customer API error: ${JSON.stringify(error)}`);
	// 		}
	// 	};
	// 	getUserData();
	// }, [isSignedIn]);
	const handleOnClick = () => {};

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
						{isSignedIn ? (
							<SignOut handleSignOut={handleSignOut} />
						) : (
							// <span
							// 	id="sign-out-text"
							// 	onClick={handleOnClick}
							// 	handleSignOut={() => setSignedIn(false)}
							// >
							// 	{FORM.SIGNOUT}
							// </span>
							<SignIn showModal={showModal} handleSignIn={handleSignIn} />
							// <span
							// 	id="sign-in-text"
							// 	onClick={showModal}
							// 	handleSignIn={() => {
							// 		setSignedIn(true);
							// 	}}
							// >
							// 	{FORM.SIGNIN}
							// </span>
						)}
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
				setVisible={setVisible}
				setSignInModalOn={setSignInModalOn}
				setSignUpModalOn={setSignUpModalOn}
				setForgetPwModalOn={setForgetPwModalOn}
			>
				{signUpModalOn ? (
					<SignUpModalContent
						visible={visible}
						user={user}
						setUser={setUser}
						signInModalOn={signInModalOn}
						showSignInModal={showSignInModal}
					/>
				) : forgetPwModalOn ? (
					<UpdatePwModalContent visible={visible} />
				) : (
					<SignInModalContent
						visible={visible}
						setVisible={setVisible}
						user={user}
						setUser={setUser}
						showForgetPwModal={showForgetPwModal}
						showSignUpModal={showSignUpModal}
						handleSignIn={handleSignIn}
						isSignedIn={isSignedIn}
						setSignedIn={setSignedIn}
					/>
				)}
			</Modal>
		</>
	);
};

export default Header;
