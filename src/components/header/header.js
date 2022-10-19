import SignIn from "../sign-in/sign-in";
import { ReactComponent as SearchIcon } from "../../assets/magnifier.svg";
import cartIcon from "../../assets/cart.png";
import FORM from "../../constants/form";
import "./header.css";

const Header = () => {
	return (
		<>
			<nav className="nav-bar">
				<div className="nav-title">
					<span id="bigTitle">Management</span>
					<span id="smallTitle">Chuwa</span>
				</div>

				<div className="search-bar">
					<input className="nav-search" type="text" placeholder="search" />
					<button className="search-btn">
						{/* <img id="search-icon" src={searchIcon} width="10px" height="10px" /> */}
						<SearchIcon className="search-icon" />
					</button>
				</div>
				<div className="nav-right">
					<SignIn />
					<div className="shopping-cart">
						<img id="cart-icon" src={cartIcon} width="20px" height="20px" />
						<span id="cart-text">$0.00</span>
					</div>
				</div>
			</nav>

			{/* {signInModalOn ? (
				<Modal title={FORM.SIGNIN} width={393} visible={openSignInModal}>
					<SignInModal />
				</Modal>
			) : sinUpModalOn ? (
				forgetPwModalOn ? (
					<Modal>
						<ForgetPwModal />
					</Modal>
				) : (
					<Modal>
						<SignInModal />
					</Modal>
				)
			) : (
				<Modal>
					<SignUpModal />
				</Modal>
			)} */}
		</>
	);
};

export default Header;
