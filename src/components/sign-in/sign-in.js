import FORM from "../../constants/form";
import "./sign-in.css";

const SignIn = (setVisible) => {
	return (
		<>
			<div className="nav-sign-in">
				<i id="user-icon" className="fa-solid fa-user" onClick={showModal}></i>
				<span id="sign-in-text" onClick={showModal}>
					{FORM.SIGNIN}
				</span>
			</div>
		</>
	);
};

export default SignIn;
