import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../actions/cart-action";
import { setCurrentUser } from "../../actions/user-action";
import { selectCartItems } from "../../stores/cart-selector";
import FORM from "../../constants/form";
import "./sign-out.css";

const SignOut = ({ handleSignOut, setUser }) => {
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleOnClick = async () => {
		try {
			const response = await fetch("/signout");
			const result = await response.json();

			// alert("User signed out.");
			// handleSignOut();
			dispatch(setCurrentUser(null));
			dispatch(emptyCart());
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
