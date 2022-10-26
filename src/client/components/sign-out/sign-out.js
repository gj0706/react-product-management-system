import FORM from "../../constants/form";
import "./sign-out.css";

const SignOut = ({ handleSignOut, setAddClicked }) => {
	const handleOnClick = async () => {
		try {
			const response = await fetch("/signout");
			const data = await response.json();

			alert("User signed out.");
			handleSignOut();
		} catch (e) {
			console.error(e);
			alert("Request error!");
		}
	};
	return (
		<>
			<span id="sign-out-text" onClick={handleOnClick}>
				{FORM.SIGNOUT}
			</span>
		</>
	);
};

export default SignOut;
