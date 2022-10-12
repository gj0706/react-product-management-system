import Signin from "../sign-in-modal/sign-in-modal";
import searchIcon from "../../assets/magnifier.svg";
import userIcon from "../../assets/user.png";
import cartIcon from "../../assets/cart.png";

import "./header.css";
const Header = ({ modalOn, setModalOn }) => {
	const openModal = () => {
		setModalOn((modalOn) => !modalOn);
	};

	return (
		<nav className="nav-bar">
			<div className="nav-title">
				<span id="bigTitle">Management</span>
				<span id="smallTitle">Chuwa</span>
			</div>

			<div className="search-bar">
				<input className="nav-search" type="text" />
				<button className="search-btn">
					<img id="search-icon" src={searchIcon} width="10px" height="10px" />
				</button>
			</div>

			<div className="sign-in-icon">
				<img
					id="user-icon"
					src={userIcon}
					width="20px"
					height="20px"
					onClick={openModal}
				/>
				<span id="sign-in-text" onClick={openModal}>
					Sign in
				</span>
			</div>
			<div className="shopping-cart">
				<img id="cart-icon" src={cartIcon} width="20px" height="20px" />
				<span id="cart-text">$0.00</span>
			</div>
		</nav>
	);
};

export default Header;
