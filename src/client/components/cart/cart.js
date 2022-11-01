import { useState } from "react";
import CartModal from "../cart-modal/cart-modal";
import "./cart.css";
const Cart = () => {
	const [cartModalOn, setCartModalOn] = useState(false);
	const openModal = () => {
		setCartModalOn(true);
	};

	return (
		<>
			<div className="shopping-cart">
				<i
					className="fa-solid fa-cart-shopping"
					id="cart-icon"
					onClick={openModal}
				></i>
				<span id="cart-text">$0.00</span>
			</div>
			{cartModalOn && (
				<CartModal cartModalOn={cartModalOn} setCartModalOn={setCartModalOn} />
			)}
		</>
	);
};

export default Cart;
