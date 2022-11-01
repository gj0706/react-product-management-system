import { redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/user-action";
import FORM from "../../constants/form";
import "./sign-out.css";

const SignOut = ({ handleSignOut, setUser }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const handleSignOut = () => {
	// 	setUser({});
	// 	localStorage.clear();
	// 	// navigate("/");
	// };
	const handleOnClick = async () => {
		try {
			const response = await fetch("/signout");
			const result = await response.json();

			// alert("User signed out.");
			// handleSignOut();
			dispatch(setCurrentUser(null));
			localStorage.clear();
			navigate("/");
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
